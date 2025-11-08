import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class HomeVideoThumbnailUpdater extends BaseVideoThumbnailUpdater {
  protected title_link: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
  }

  public async update() {
    //const element = this.container.querySelector('.yt-lockup-view-model__content-image') as HTMLAnchorElement;
    //if (element.href != 'https://www.youtube.com/watch?v=fH2uk0g-8Rc')
    //{
    //  return;
    //}

    //this.debugPrintMembers();
    if (this.is_active !== undefined && !this.is_active) {
      return;
    }

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = await this.shouldBlockSpoiler();
    //console.log('Should block spoiler:', should_block_spoiler);
    if (!should_block_spoiler) {
      return;
    }

    this.backupOriginal();
    try {
      await this.spoilerBlockVideo();

      // Render the new thumbnail above the original one to avoid the automatic thumbnail
      // player from spoiling the match.
      this.added_thumbnail_element.style.zIndex = '2';
    } catch (error) {
      console.error('Error blocking spoiler from video:', { container: this.container, error });
      return;
    }

    this.is_active = true;
  }

  protected getIsESPNVideo(): boolean {
    return this.getChannel() === 'ESPN Fans';
  }

  protected shouldDisableWrapperPointerEvents(): boolean {
    return false;
  }

  protected getChannel(): string {
    let channel_element = this.container.querySelector<HTMLElement>('ytd-channel-name a');
    if (!channel_element) {
      channel_element = this.container.querySelector(
        'ytd-compact-video-renderer ytd-channel-name yt-formatted-string#text',
      );
    }

    if (channel_element) {
      return channel_element.innerText.trim();
    }

    // Fallback, if we can't detect the channel then we say its ESPN Fans and wait for other checks to block it
    return 'ESPN Fans';
  }

  // Since videos in the search page seem to lazyload their progress bar, the updater wont be able to find it
  protected getIfAlreadyWatched(): boolean {
    const progress_bar = this.container.querySelector<HTMLDivElement>('#progress');
    return progress_bar?.style.width === '100%' || false;
  }

  protected getAriaText(): string {
    this.title_link = this.container.querySelector('#video-title-link');

    if (this.title_link) {
      return this.title_link.getAttribute('aria-label');
    }

    if (this.title) {
      return this.title.getAttribute('aria-label');
    }

    return '';
  }

  protected getTitle(): HTMLElement {
    var potential_container: HTMLElement = this.container.querySelector('#video-title');
    if (!potential_container) {
      // homepage videos have a different div
      potential_container = this.container.querySelector('.yt-core-attributed-string');
    }

    return potential_container;
  }

  protected getThumbnail(): HTMLElement {
    let thumbnail_element: HTMLInputElement = this.container.querySelector('#thumbnail');
    if (!thumbnail_element) {
      thumbnail_element = this.container.querySelector('ytd-compact-video-renderer ytd-thumbnail img');
    }

    if (!thumbnail_element) {
      // homepage videos have a different div
      thumbnail_element = this.container.querySelector('.ytThumbnailViewModelHost');
    }

    return thumbnail_element;
  }

  protected blockSpoilerText() {
    if (this.title) {
      if (!this.spoiler_blocked_title_text) {
        this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
      }

      this.title.textContent = this.spoiler_blocked_title_text;
      this.title.innerText = this.spoiler_blocked_title_text;

      this.title_link = this.container.querySelector('#video-title-link');
      if (this.title_link) {
        this.title_link.title = this.spoiler_blocked_title_text;
      }
    }
  }

  protected hideThumbnail(): void {
    if (this.thumbnail === undefined) {
      return;
    }

    let thumbnail_image: HTMLElement = this.thumbnail.querySelector('#thumbnail');
    if (thumbnail_image) {
      thumbnail_image.style.opacity = '0';
      return;
    }

    thumbnail_image = this.thumbnail.querySelector('#image');
    if (thumbnail_image) {
      thumbnail_image.style.opacity = '0';
      return;
    }

    thumbnail_image = this.thumbnail.querySelector('yt-image');
    if (thumbnail_image) {
      thumbnail_image.style.opacity = '0';
      return;
    }
  }

  public restoreSpoilers() {
    super.restoreSpoilers();

    if (!this.is_active) {
      return;
    }

    let thumbnail_image: HTMLElement = this.thumbnail.querySelector('#thumbnail');

    if (thumbnail_image) {
      thumbnail_image.style.opacity = '100%';
      thumbnail_image.style.background = 'none';
    }

    thumbnail_image = this.thumbnail.querySelector('#image');
    if (thumbnail_image) {
      thumbnail_image.style.opacity = '100%';
    }

    thumbnail_image = this.thumbnail.querySelector('yt-image');
    if (thumbnail_image) {
      thumbnail_image.style.opacity = '100%';
    }

    // Restore title
    if (this.title) {
      this.title.textContent = this.originalState.titleTextContent;
      this.title.innerText = this.originalState.titleTextContent;
    }

    this.title_link = this.container.querySelector('#video-title-link');
    if (this.title_link) {
      this.title_link.title = this.originalState.titleTextContent;
    }
  }
}
