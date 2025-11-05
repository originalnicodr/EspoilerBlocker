import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class EndscreenThumbnailUpdater extends BaseVideoThumbnailUpdater {
  protected background_image_url: string;
  constructor(container: HTMLElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();
    if (this.is_active !== undefined && !this.is_active) {
      return;
    }

    this.backupOriginal();

    const current_url: string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = await this.shouldBlockSpoiler();
    if (!should_block_spoiler) {
      return;
    }

    try {
      await this.spoilerBlockVideo();

      const info_content: HTMLElement = this.container.querySelector('.ytp-videowall-still-info-content');
      info_content.style.pointerEvents = 'none';
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
      return;
    }

    this.is_active = true;
  }

  protected getIsESPNVideo(): boolean {
    return this.getChannel().includes('ESPN Fans');
  }

  protected getChannel(): string {
    const channels_name_element = this.container.querySelector<HTMLElement>('.ytp-videowall-still-info-author');
    if (channels_name_element) {
      return channels_name_element ? channels_name_element.innerText.trim() : '';
    }
    return 'ESPN Fans';
  }

  // YouTube won't recommend videos the user already watched
  protected getIfAlreadyWatched(): boolean {
    return false;
  }

  protected getAriaText(): string {
    return this.container.getAttribute('aria-label');
  }

  protected getTitle(): HTMLElement {
    // legacy youtube style
    //return this.container.querySelector('.ytp-videowall-still-info-title');
    return this.container.querySelector('.ytp-modern-videowall-still-info-title');
  }

  protected getThumbnail(): HTMLElement {
    // legacy youtube style
    //return this.container.querySelector('.ytp-videowall-still-image');
    return this.container.querySelector('.ytp-modern-videowall-still-image');
  }

  protected blockSpoilerText() {
    if (this.title) {
      if (!this.spoiler_blocked_title_text) {
        this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
      }

      this.title.textContent = this.spoiler_blocked_title_text;
      this.title.innerText = this.spoiler_blocked_title_text;
    }
  }

  public backupOriginal() {
    if (!this.container) return;
    super.backupOriginal();

    this.background_image_url = this.thumbnail.style.backgroundImage;
  }

  public restoreSpoilers() {
    super.restoreSpoilers();

    this.thumbnail.style.backgroundImage = this.background_image_url;

    if (this.title) {
      this.title.textContent = this.originalState.titleTextContent;
      this.title.innerText = this.originalState.titleTextContent;
    }
  }
}
