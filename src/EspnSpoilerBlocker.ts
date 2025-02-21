import { BaseUpdater } from './DOMUpdaters/BaseUpdater';
import { TitleUpdater } from './DOMUpdaters/TitleUpdater';
import { VideoThumbnailUpdater } from './DOMUpdaters/VideoThumbnailUpdater';

export class EspnSpoilerBlocker {
  public static ADDED_CLASS_TO_MARK_AS_WATCHED = 'ESPN_SPOILER_BLOCKER_MARK_AS_WATCHED';

  private observers: Array<MutationObserver> = [];
  private updaters: Array<BaseUpdater> = [];

  /** check if we're watching videos on Youtube main page. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnMainPage = undefined;
  private watchingThumbnailsOnVideoPage = undefined;

  /** Start the Chrome extension */
  public start() {
    this.reactToTitleChanges();
    this.reactToVideoChanges();
  }

  /** Stop the Chrome extension */
  public stop() {
    // probable this is the method to discard the DOM changes we made.
    this.cleanup();
    this.updaters.forEach((updater) => updater.removeChanges());
  }

  private cleanup() {
    this.observers.forEach((observer) => observer.disconnect());
    this.updaters.forEach((updater) => updater.removeChanges());
  }

  private reactToVideoChanges() {
    // these methods are async, but can be invoked like this to improve performance.
    this.reactToThumbnailsOnMainPage();
    this.reactToThumnailsOnVideoPage();
  }

  private reactToTitleChanges() {
    const title = document.querySelector('title');

    const titleUpdater = new TitleUpdater(title);

    const observer = new MutationObserver(() => {
      titleUpdater.update();
      this.afterTitleUpdate();
    });
    titleUpdater.update();
    this.afterTitleUpdate();

    this.observers.push(observer);
    observer.observe(title, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }

  private get youtubeMediaSelectors(): string[] {
    return ['ytd-rich-item-renderer', 'ytd-compact-video-renderer'];
  }

  private isNodeAYoutubeVideo(node: Element) {
    return this.youtubeMediaSelectors.some((value) => node.matches(value));
  }

  /** Tries to find an element in the DOM. If there's no result, retry in N milliseconds with a limit of times */
  private async getElementOrRetry(elementSelector: string, retryMs: number, limit = 20): Promise<Element> {
    return new Promise((resolve, reject) => {
      const checkElement = () => {
        limit--;
        const element = document.querySelector(elementSelector);
        if (element) {
          resolve(element);
        } else if (limit - 1 > 0) {
          setTimeout(() => checkElement(), retryMs);
        } else {
          reject(new Error('Element not found after max retries'));
        }
      };
      checkElement();
    });
  }

  /** Creates a new video updater for the youtube thumnail element */
  private createNewVideoUpdater(node: Element) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;

    const updater = new VideoThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private async reactToThumbnailsOnMainPage() {
    // do not observe element twice
    if (this.watchingThumbnailsOnMainPage) return;

    let container: Element = undefined;
    try {
      container = await this.getElementOrRetry('#contents.ytd-rich-grid-renderer', 400);
    } catch (error) {
      this.watchingThumbnailsOnMainPage = false;
      return;
    }

    // create a VideoThumnailUpdater for each video in the dom
    container
      .querySelectorAll(this.youtubeMediaSelectors.join(','))
      .forEach((video) => this.createNewVideoUpdater(video));

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element && this.isNodeAYoutubeVideo(node)) {
            this.createNewVideoUpdater(node);
          }
        });
      });
    });

    this.observers.push(observer);
    observer.observe(container, {
      childList: true,
      subtree: true,
    });
  }

  // naming functions is my passion (?)
  private async reactToThumnailsOnVideoPage() {
    // do not observe element twice
    if (this.watchingThumbnailsOnVideoPage) return;

    let container = undefined;
    try {
      container = await this.getElementOrRetry('#related>ytd-watch-next-secondary-results-renderer>#items', 400);
    } catch (error) {
      this.watchingThumbnailsOnVideoPage = false;
      return;
    }

    // create a VideoThumnailUpdater for each video in the dom
    container
      .querySelectorAll(this.youtubeMediaSelectors.join(','))
      .forEach((video) => this.createNewVideoUpdater(video));

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element && this.isNodeAYoutubeVideo(node)) {
            this.createNewVideoUpdater(node);
          }
        });
      });
    });

    this.observers.push(observer);
    observer.observe(container, {
      childList: true,
      subtree: true,
    });
  }

  /** Method executed after a title was updated */
  private afterTitleUpdate() {
    console.log('TITLE CHANGED!');

    // Retry to observe the video thumbnails if the parent target was not found
    if (this.watchingThumbnailsOnMainPage === false) {
      this.reactToThumbnailsOnMainPage();
    }

    if (this.watchingThumbnailsOnMainPage === false) {
      this.reactToThumnailsOnVideoPage();
    }
  }
}
