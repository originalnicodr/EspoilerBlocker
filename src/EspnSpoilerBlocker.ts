import { BaseUpdater } from './DOMUpdaters/BaseUpdater';
import { EndscreenThumbnailUpdater } from './DOMUpdaters/EndscreenThumbnailUpdater';
import { InnerVideoTitleUpdater } from './DOMUpdaters/innerVideoTitleUpdater';
import { TitleUpdater } from './DOMUpdaters/TitleUpdater';
import { VideoThumbnailUpdater } from './DOMUpdaters/VideoThumbnailUpdater';
import { VideoTitleUpdater } from './DOMUpdaters/VideoTitleUpdater';

export class EspnSpoilerBlocker {
  public static ADDED_CLASS_TO_MARK_AS_WATCHED = 'ESPN_SPOILER_BLOCKER_MARK_AS_WATCHED';

  private observers: Array<MutationObserver> = [];
  private updaters: Array<BaseUpdater> = [];

  /** check if we're watching video thumbnails on Youtube main page. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnMainPage = undefined;
  /** check if we're watching video thumbnails while playing a video. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnVideoPage = undefined;
  /** check if we're watching video thumbnails at the end of a video. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnEndscreenPage = undefined;
  /** check if we're watching the video title while playing a video. If this is false, container not found. Will retry after next title change */
  private watchingVideoTitle = undefined;

  /** Start the Chrome extension */
  public start() {
    this.reactToTitleChanges();
    this.reactToVideoThumbnailsChanges();
    this.reactToVideoTitle();
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

  private reactToVideoThumbnailsChanges() {
    // these methods are async, but can be invoked like this to improve performance.
    this.reactToThumbnailsOnMainPage();
    this.reactToThumnailsOnVideoPage();
    this.reactToThumbnailsOnEndscreen();
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
    return ['ytd-rich-item-renderer', 'ytd-compact-video-renderer', 'ytd-grid-video-renderer'];
  }

  private isNodeAYoutubeVideo(node: Element) {
    return this.youtubeMediaSelectors.some((value) => node.matches(value));
  }

  /** Tries to find an element in the DOM. If there's no result, retry in N milliseconds with a limit of times */
  private async getElementOrRetry(elementSelector: string, retryMs: number, limit = 20): Promise<Element> {
    return new Promise((resolve, reject) => {
      const checkElement = () => {
        const element = document.querySelector(elementSelector);
        if (element) {
          resolve(element);
        } else if (--limit > 0) {
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

  private createNewEndscreenVideoUpdater(node: Element) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new EndscreenThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private async reactToThumbnailsOnMainPage() {
    // do not observe element twice
    if (this.watchingThumbnailsOnMainPage) return;

    let container: Element = undefined;
    try {
      container = await this.getElementOrRetry('ytd-app', 400);
    } catch (error) {
      this.watchingThumbnailsOnMainPage = false;
      return;
    }

    this.watchingThumbnailsOnMainPage = true;

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

    this.watchingThumbnailsOnVideoPage = true;

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

  private async reactToThumbnailsOnEndscreen() {
    // do not observe element twice
    if (this.watchingThumbnailsOnEndscreenPage) return;

    let container = undefined;
    try {
      // Might need to increase this to cover ads
      container = await this.getElementOrRetry('.ytp-endscreen-content', 400);
    } catch (error) {
      this.watchingThumbnailsOnEndscreenPage = false;
      return;
    }

    this.watchingThumbnailsOnEndscreenPage = true;

    // create a EndscreenVideoUpdater for each video in the dom
    container
      .querySelectorAll(this.youtubeMediaSelectors.join(','))
      .forEach((video: Element) => this.createNewEndscreenVideoUpdater(video));

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element && node.matches('.ytp-videowall-still')) {
            this.createNewEndscreenVideoUpdater(node);
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
    // Retry to observe elements if container elements were not found. We'd probably want to do this on route changes, not on title changes.
    if (this.watchingThumbnailsOnMainPage === false) {
      this.reactToThumbnailsOnMainPage();
    }

    if (this.watchingThumbnailsOnVideoPage === false) {
      this.reactToThumnailsOnVideoPage();
    }

    if (this.watchingVideoTitle === false) {
      this.reactToVideoTitle();
    }
  }

  private async reactToVideoTitle() {
    // do not watch video titles twice
    if (this.watchingVideoTitle === true) return;

    let visibleVideoTitle = undefined;
    let innerHTMLvideoTitle = undefined;
    try {
      // these two elements are on the same page. Fire the two promises at the same time

      const promises = [
        this.getElementOrRetry('h1.style-scope.ytd-watch-metadata', 400),
        this.getElementOrRetry('a.ytp-title-fullerscreen-link', 400),
      ];
      try {
        const results = await Promise.all(promises);
        visibleVideoTitle = results[0];
        innerHTMLvideoTitle = results[1];
      } catch (error) {
        return;
      }
    } catch (error) {
      this.watchingVideoTitle = false;
      return;
    }

    this.watchingVideoTitle = true;

    // create both updaters
    const titleUpdater = new VideoTitleUpdater(visibleVideoTitle);
    const innerTitleUpdater = new InnerVideoTitleUpdater(innerHTMLvideoTitle);
    this.updaters.push(titleUpdater, innerTitleUpdater);

    const observer = new MutationObserver(() => {
      titleUpdater.update();
      innerTitleUpdater.update();
    });
    titleUpdater.update();
    innerTitleUpdater.update();

    this.observers.push(observer);
    observer.observe(visibleVideoTitle, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }
}
