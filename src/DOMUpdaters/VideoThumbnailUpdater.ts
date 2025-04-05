import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class VideoThumbnailUpdater extends BaseVideoThumbnailUpdater {
  protected title_link: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = await this.shouldBlockSpoiler();
    if (!should_block_spoiler) {
      return;
    }

    try {
      await this.spoilerBlockVideo();
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
    }

    this.is_being_spoiler_blocked = true;
  }

  public removeChanges() {
    super.removeChanges();
  }

  private async spoilerBlockVideo(): Promise<void> {
    this.blockSpoilerText();
    this.hideThumbnail();
    await this.addThumbnailElements();
  }

  protected getIsESPNVideo(): boolean {
    return this.getChannel() === 'ESPN Fans';
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
    return this.title.getAttribute('aria-label');
  }

  protected getTitle(): HTMLElement {
    return this.container.querySelector('#video-title');
  }

  protected getThumbnail(): HTMLElement {
    let thumbnail_element: HTMLInputElement = this.container.querySelector('#thumbnail');
    if (!thumbnail_element) {
      thumbnail_element = this.container.querySelector('ytd-compact-video-renderer ytd-thumbnail img');
    }

    return thumbnail_element;
  }

  private blockSpoilerText() {
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

  private hideThumbnail(): void {
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
}
