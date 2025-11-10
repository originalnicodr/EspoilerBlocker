import { BaseUpdater } from './DOMUpdaters/BaseUpdater';
import { EndscreenAutoplayThumbnailUpdater } from './DOMUpdaters/EndscreenAutoplayThumbnailUpdater';
import { EndscreenThumbnailUpdater } from './DOMUpdaters/EndscreenThumbnailUpdater';
import { HomeVideoThumbnailUpdater } from './DOMUpdaters/HomeVideoThumbnailUpdater';
import { InnerVideoTitleUpdater } from './DOMUpdaters/innerVideoTitleUpdater';
import { SidePanelVideoThumbnailUpdater } from './DOMUpdaters/SidePanelVideoThumbnailUpdater';
import { SkipVideoThumbnailUpdater } from './DOMUpdaters/SkipVideoThumbnailUpdater';
import { TitleUpdater } from './DOMUpdaters/TitleUpdater';
import { VideoThumbnailUpdater } from './DOMUpdaters/VideoThumbnailUpdater';
import { VideoTitleUpdater } from './DOMUpdaters/VideoTitleUpdater';
import { BeforeVideoThumbnailUpdater } from './DOMUpdaters/BeforeVideoThumbnailUpdater';
import { EndscreenMainSuggestionUpdater } from './DOMUpdaters/EndscreenMainSuggestionUpdater';
import { PlaylistVideoThumbnailUpdater } from './DOMUpdaters/PlaylistVideoThumbnailUpdater';

export class EspnSpoilerBlocker {
  public static ADDED_CLASS_TO_MARK_AS_WATCHED = 'ESPN_SPOILER_BLOCKER_MARK_AS_WATCHED';

  private observers: Array<MutationObserver> = [];
  private updaters: Array<BaseUpdater> = [];

  /** check if we're watching video thumbnails on Youtube main page. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnMainPage = undefined;
  /** check if we're watching YouTube video player thumbnail. If this is false, container not found. Will retry after next title change */
  private watchingPlayerThumbnail = undefined;
  /** check if we're watching video thumbnails while playing a video. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnVideoPage = undefined;
  /** check if we're watching video thumbnails on Youtube search page. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnSearchPage = undefined;
  /** check if we're watching video thumbnails at the end of a video. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnEndscreenPage = undefined;
  /** check if we're watching the suggested autoplay video thumbnail at the end of a video. If this is false, such video wasn't found. Will retry after next title change */
  private watchingThumbnailOnEndscreenAutoplayPage = undefined;
  /** check if we're watching the main suggested video thumbnail just before the end of a video. If this is false, such video wasn't found. Will retry after next title change */
  private watchingMainSuggestionThumbnailOnEndscreen = undefined;
  /** check if we're watching video thumbnails on a Youtube playlist. If this is false, the container wasn't found. Will retry after next title change */
  private watchingThumbnailsOnPlaylistPage = undefined;
  /** check if we're watching the suggested video to skip to thumbnail. If this is false, we couldn't find the skip button. Will retry after next title change */
  private watchingSkipVideoThumbnailOnVideoPage = undefined;
  /** check if we're watching the video title while playing a video. If this is false, container not found. Will retry after next title change */
  private watchingVideoTitle = undefined;
  /** check if we're watching video thumbnails on Youtube side panel. If this is false, container not found. Will retry after next title change */
  private watchingThumbnailsOnSidePanel = undefined;

  /** Start the Chrome extension */
  public start() {
    this.reactToTitleChanges();
    this.reactToVideoThumbnailsChanges();
    this.reactToVideoTitle();
    this.reactToPlayerThumbnail();
  }

  /** Stop the Chrome extension */
  public stop() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];

    this.watchingThumbnailsOnMainPage = false;
    this.watchingPlayerThumbnail = false;
    this.watchingThumbnailsOnVideoPage = false;
    this.watchingThumbnailsOnSearchPage = false;
    this.watchingThumbnailsOnEndscreenPage = false;
    this.watchingThumbnailOnEndscreenAutoplayPage = false;
    this.watchingMainSuggestionThumbnailOnEndscreen = false;
    this.watchingThumbnailsOnPlaylistPage = false;
    this.watchingSkipVideoThumbnailOnVideoPage = false;
    this.watchingVideoTitle = false;
    this.watchingThumbnailsOnSidePanel = false;
  }

  public trackYoutubeNavigation() {
    // On navigation start, stop observers but keep DOM modifications
    document.addEventListener('yt-navigate-start', () => {
      this.stop();

      // If navigating to a video or playlist page, force a page reload
      // We would want to avoid doing this, but unfortunately, we couldn't find a reliable way
      // of handling extension DOM changes alongside allowing YouTube ones when navigating.
      if (window.location.href.includes('watch?v=') || window.location.href.includes('playlist?list=')) {
        console.log('Navigating to video page, forcing page reload');
        window.location.reload();
        return;
      }
    });

    // On navigation finish, cleanup old modifications and start new observers
    document.addEventListener('yt-navigate-finish', () => {
      this.updaters.forEach((updater) => updater.restoreSpoilers());
      this.updaters = [];

      this.start();
    });
  }

  private reactToVideoThumbnailsChanges() {
    // these methods are async, but can be invoked like this to improve performance.
    this.reactToThumbnailsOnSidePanel();
    this.reactToThumbnailsOnMainPage();
    this.reactToThumbnailsOnVideoPage();
    this.reactToThumbnailsOnSearchPage();
    this.reactToThumbnailsOnEndscreen();
    this.reactToThumbnailsOnEndscreenAutoplay();
    this.reactToEndscreenMainVideoSuggestion();
    this.reactToThumbnailsOnPlaylist();
    this.reactToSkipVideoThumbnail();
  }

  private reactToTitleChanges() {
    const title = document.querySelector('title');

    if (!title) {
      return;
    }
    if (BaseUpdater.isElementAlreadyBeingWatched(title)) return;

    const title_updater = new TitleUpdater(title);

    const observer = new MutationObserver(() => {
      title_updater.update();
      this.afterTitleUpdate();
    });
    title_updater.update();
    this.afterTitleUpdate();

    this.observers.push(observer);
    observer.observe(title, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }

  // Might want to deprecate this eventually to be more specific about the classes each observer should target (and avoid false positives)
  private get youtubeMediaSelectors(): string[] {
    return [
      'ytd-rich-item-renderer',
      'ytd-compact-video-renderer',
      'ytd-grid-video-renderer',
      'ytd-video-renderer',
      'ytd-video-renderer',
    ];
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

  /**
   * Creates a new video updater for the youtube thumbnail element
   * 
   * Covers some default video thumbnails on various pages.
  */
  private createNewVideoUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;

    const updater = new VideoThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createNewHomeVideoUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;

    const updater = new HomeVideoThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createNewEndscreenVideoUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new EndscreenThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createNewEndscreenAutoplayVideoUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new EndscreenAutoplayThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createEndscreenMainSuggestionUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new EndscreenMainSuggestionUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createPlaylistVideoThumbnailUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new PlaylistVideoThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createNewSkipVideoThumbnailUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new SkipVideoThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createNewSidePanelVideoUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;

    const updater = new SidePanelVideoThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createVideoTitleUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new VideoTitleUpdater(node);
    this.updaters.push(updater);
    updater.update();

    const title_observer = new MutationObserver(() => {
      updater.update();
    });

    this.observers.push(title_observer);
    title_observer.observe(node, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }

  private createInnerVideoTitleUpdater(node: HTMLAnchorElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new InnerVideoTitleUpdater(node);
    this.updaters.push(updater);
    updater.update();
  }

  private createNewBeforeVideoThumbnailUpdater(node: HTMLElement) {
    if (BaseUpdater.isElementAlreadyBeingWatched(node)) return;
    const updater = new BeforeVideoThumbnailUpdater(node);
    this.updaters.push(updater);
    updater.update();

    const inner_title_observer = new MutationObserver(() => {
      updater.update();
    });

    this.observers.push(inner_title_observer);
    inner_title_observer.observe(node, {
      subtree: true,
      characterData: true,
      childList: true,
    });
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

    // create a VideoThumbnailUpdater for each video in the dom
    container.querySelectorAll(this.youtubeMediaSelectors.join(',')).forEach((video) => {
      if (video instanceof HTMLElement) {
        if (window.location.href == 'https://www.youtube.com/') this.createNewHomeVideoUpdater(video);
        else this.createNewVideoUpdater(video);
      }
    });

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && this.isNodeAYoutubeVideo(node)) {
            if (window.location.href == 'https://www.youtube.com/') this.createNewHomeVideoUpdater(node);
            else this.createNewVideoUpdater(node);
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

  private async reactToPlayerThumbnail() {
    // do not observe element twice
    if (this.watchingPlayerThumbnail) return;

    const current_url: string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    let container: Element = undefined;
    try {
      container = await this.getElementOrRetry('.ytp-cued-thumbnail-overlay-image', 400);
      if (container instanceof HTMLElement && container.matches('.ytp-cued-thumbnail-overlay-image')) {
        this.createNewBeforeVideoThumbnailUpdater(container);
      }
    } catch (error) {
      this.watchingPlayerThumbnail = false;
      return;
    }

    this.watchingPlayerThumbnail = true;
  }

  private async reactToThumbnailsOnVideoPage() {
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

    // create a VideoThumbnailUpdater for each video in the dom
    container
      .querySelectorAll(this.youtubeMediaSelectors.join(','))
      .forEach((video) => this.createNewVideoUpdater(video));

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && this.isNodeAYoutubeVideo(node)) {
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

  private async reactToThumbnailsOnSearchPage() {
    // do not observe element twice
    if (this.watchingThumbnailsOnSearchPage) return;

    let container = undefined;
    try {
      container = await this.getElementOrRetry('.style-scope ytd-two-column-search-results-renderer', 400);
    } catch (error) {
      this.watchingThumbnailsOnSearchPage = false;
      return;
    }

    this.watchingThumbnailsOnSearchPage = true;

    // create a VideoThumbnailUpdater for each video in the dom
    container.querySelector(this.youtubeMediaSelectors.join(',')).forEach((video) => this.createNewVideoUpdater(video));

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && this.isNodeAYoutubeVideo(node)) {
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
      // legacy youtube style
      //container = await this.getElementOrRetry('.ytp-endscreen-content', 400);
      container = await this.getElementOrRetry('.ytp-fullscreen-grid-stills-container', 400);
    } catch (error) {
      this.watchingThumbnailsOnEndscreenPage = false;
      return;
    }

    this.watchingThumbnailsOnEndscreenPage = true;

    // create a EndscreenVideoUpdater for each video in the dom
    container
      // legacy youtube style
      //.querySelectorAll(this.youtubeMediaSelectors.join(','))
      .querySelectorAll('.ytp-modern-videowall-still.ytp-suggestion-set')
      .forEach((video: HTMLElement) => this.createNewEndscreenVideoUpdater(video));

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          // legacy youtube style
          //if (node instanceof HTMLElement && node.matches('.ytp-videowall-still')) {
          if (node instanceof HTMLElement && node.matches(".ytp-modern-videowall-still.ytp-suggestion-set")) {
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

  private async reactToThumbnailsOnEndscreenAutoplay() {
    // do not observe element twice
    if (this.watchingThumbnailOnEndscreenAutoplayPage) return;

    let autoplay_suggestion = undefined;
    try {
      autoplay_suggestion = await this.getElementOrRetry('.ytp-autonav-endscreen-upnext-container', 400);
    } catch (error) {
      this.watchingThumbnailOnEndscreenAutoplayPage = false;
      return;
    }

    this.watchingThumbnailOnEndscreenAutoplayPage = true;

    // autoplay_suggestion starts empty and gets its info when the video is about to end.
    // When it gets new child nodes it means that the info is now there and we can spawn an EndscreenAutoplayThumbnailUpdater.
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          const potential_parent: HTMLElement =
            node instanceof Element && node.closest('.ytp-autonav-endscreen-upnext-container');
          if (potential_parent) {
            this.createNewEndscreenAutoplayVideoUpdater(potential_parent);
          }
        });
      });
    });

    this.observers.push(observer);
    observer.observe(autoplay_suggestion, {
      childList: true,
      subtree: true,
    });
  }

  private async reactToEndscreenMainVideoSuggestion() {
    if (this.watchingMainSuggestionThumbnailOnEndscreen) return;

    let video_player = undefined;
    try {
      video_player = await this.getElementOrRetry('.style-scope.ytd-player', 400);
    } catch (error) {
      this.watchingMainSuggestionThumbnailOnEndscreen = false;
      return;
    }

    this.watchingMainSuggestionThumbnailOnEndscreen = true;

    let container = video_player.querySelector('.ytp-ce-element.ytp-ce-video.ytp-ce-large-round.ytp-ce-bottom-left-quad');
    if (container) {
      this.createEndscreenMainSuggestionUpdater(container);
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.matches('.ytp-ce-element.ytp-ce-video.ytp-ce-large-round.ytp-ce-bottom-left-quad')) {
            this.createEndscreenMainSuggestionUpdater(node);
            return;
          }
          const potential_parent: HTMLElement =
            node instanceof Element && node.closest('.ytp-ce-element.ytp-ce-video.ytp-ce-large-round.ytp-ce-bottom-left-quad');
            if (potential_parent) {
            this.createEndscreenMainSuggestionUpdater(potential_parent);
          }
        });
      });
    });

    this.observers.push(observer);
    observer.observe(video_player, {
      childList: true,
      subtree: true,
    });
  }

  private async reactToThumbnailsOnPlaylist() {
    if (this.watchingThumbnailsOnPlaylistPage) return;

    const current_url: string = window.location.href;
    if (!current_url.includes('playlist?list=')) {
      return;
    }

    let container;
    try {
      container = await this.getElementOrRetry('ytd-two-column-browse-results-renderer', 400);
    } catch {
      this.watchingThumbnailsOnPlaylistPage = false;
      return;
    }

    this.watchingThumbnailsOnPlaylistPage = true;

    container.querySelectorAll('ytd-playlist-video-renderer').forEach((video) => {
      this.createPlaylistVideoThumbnailUpdater(video);
    });

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.tagName.toLowerCase() === 'ytd-playlist-video-renderer') {
            this.createPlaylistVideoThumbnailUpdater(node);
          } else {
            node.querySelectorAll('ytd-playlist-video-renderer').forEach((renderer) => {
              if (renderer instanceof HTMLElement) this.createPlaylistVideoThumbnailUpdater(renderer);
            }
            );
          }
        });
      }
    });

    this.observers.push(observer);
    observer.observe(container, { childList: true, subtree: true });
  }

  private async reactToSkipVideoThumbnail() {
    // do not observe element twice
    if (this.watchingSkipVideoThumbnailOnVideoPage) return;

    let skip_video_suggestion = undefined;
    try {
      skip_video_suggestion = await this.getElementOrRetry('.ytp-next-button.ytp-button', 400);
    } catch (error) {
      this.watchingSkipVideoThumbnailOnVideoPage = false;
      return;
    }

    this.watchingSkipVideoThumbnailOnVideoPage = true;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName == 'data-tooltip-text') {
          this.createNewSkipVideoThumbnailUpdater(skip_video_suggestion);
        }
      });
    });

    this.observers.push(observer);
    observer.observe(skip_video_suggestion, {
      attributes: true,
      childList: false,
      subtree: false,
    });
  }

  private async reactToVideoTitle() {
    // do not watch video titles twice
    if (this.watchingVideoTitle === true) return;

    let visible_video_title = undefined;
    let inner_HTML_video_title = undefined;
    try {
      // these two elements are on the same page. Fire the two promises at the same time

      const promises = [
        this.getElementOrRetry('h1.style-scope.ytd-watch-metadata', 400),
        // legacy youtube style
        // this.getElementOrRetry('a.ytp-title-fullerscreen-link', 400),
        this.getElementOrRetry('.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap', 400),
      ];
      try {
        const results = await Promise.all(promises);
        visible_video_title = results[0];
        inner_HTML_video_title = results[1];
      } catch (error) {
        return;
      }
    } catch (error) {
      this.watchingVideoTitle = false;
      return;
    }

    this.watchingVideoTitle = true;

    // create both updaters
    this.createVideoTitleUpdater(visible_video_title);
    this.createInnerVideoTitleUpdater(inner_HTML_video_title);
  }

  private async reactToThumbnailsOnSidePanel() {
    // do not observe element twice
    if (this.watchingThumbnailsOnSidePanel) return;

    let container: Element = undefined;
    try {
      container = await this.getElementOrRetry('ytd-watch-next-secondary-results-renderer', 400);
    } catch (error) {
      this.watchingThumbnailsOnSidePanel = false;
      return;
    }

    this.watchingThumbnailsOnSidePanel = true;

    // create a VideoThumbnailUpdater for each video in the dom
    container.querySelectorAll('yt-lockup-view-model').forEach((video) => {
      if (video instanceof HTMLElement) {
        this.createNewSidePanelVideoUpdater(video);
      }
    });

    // observe new added elements and do the same
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Get any newly added video elements
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLElement &&
            node.matches('yt-lockup-view-model')
          ) {
            this.createNewSidePanelVideoUpdater(node);
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

    if (this.watchingPlayerThumbnail === false) {
      this.reactToPlayerThumbnail();
    }

    if (this.watchingThumbnailsOnVideoPage === false) {
      this.reactToThumbnailsOnVideoPage();
    }

    if (this.watchingThumbnailsOnSearchPage === false) {
      this.reactToThumbnailsOnSearchPage();
    }

    if (this.watchingThumbnailsOnEndscreenPage === false) {
      this.reactToThumbnailsOnEndscreen();
    }

    if (this.watchingThumbnailOnEndscreenAutoplayPage === false) {
      this.reactToThumbnailsOnEndscreenAutoplay();
    }

    if (this.watchingMainSuggestionThumbnailOnEndscreen == false) {
      this.reactToEndscreenMainVideoSuggestion();
    }

    if (this.watchingThumbnailsOnPlaylistPage == false) {
      this.reactToThumbnailsOnPlaylist();
    }

    if (this.watchingSkipVideoThumbnailOnVideoPage == false) {
      this.reactToSkipVideoThumbnail();
    }

    if (this.watchingVideoTitle === false) {
      this.reactToVideoTitle();
    }

    if (this.watchingThumbnailsOnSidePanel === false) {
      this.reactToThumbnailsOnSidePanel();
    }
  }
}
