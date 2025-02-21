import { BaseUpdater } from './DOMUpdaters/BaseUpdater';
import { VideoThumbnailUpdater } from './DOMUpdaters/VideoThumbnailUpdater';

export class EspnSpoilerBlocker {
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
    const observer = new MutationObserver(() => {
      this.onTitleChange();
    });

    this.observers.push(observer);
    observer.observe(title, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }

  /** Tries to find an element in the DOM. If there's no result, retry in N milliseconds with a limit of times */
  private async getElementOrRetry(elementSelector: string, retryMs: number, limit = 20): Promise<Element> {
    return new Promise((resolve, reject) => {
      const checkElement = () => {
        limit--;
        const element = document.querySelector(elementSelector);
        if (element) {
          console.log('FOUND ELEMENT AT TRY NUMBER', limit);
          resolve(element);
        } else if (limit - 1 > 0) {
          console.log('RETRYING TO FIND ELEMENT. Remaining retries:', limit);
          setTimeout(() => checkElement(), retryMs);
        } else {
          console.log('ELEMENT NOT FOUND AFTER MAX RETRIES');
          reject(new Error('Element not found after max retries'));
        }
      };

      checkElement();
    });
  }

  private async reactToThumbnailsOnMainPage() {
    // do not observe element twice
    if (this.watchingThumbnailsOnMainPage) return;

    let container = undefined;
    try {
      container = await this.getElementOrRetry('#contents.ytd-rich-grid-renderer', 400);
    } catch (error) {
      this.watchingThumbnailsOnMainPage = false;
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof Element &&
            (node.matches('ytd-rich-item-renderer') || node.matches('ytd-compact-video-renderer'))
          ) {
            const updater = new VideoThumbnailUpdater(node);
            this.updaters.push(updater);
            updater.update();
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

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof Element &&
            (node.matches('ytd-rich-item-renderer') || node.matches('ytd-compact-video-renderer'))
          ) {
            const updater = new VideoThumbnailUpdater(node);
            this.updaters.push(updater);
            updater.update();
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

  private onTitleChange() {
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
