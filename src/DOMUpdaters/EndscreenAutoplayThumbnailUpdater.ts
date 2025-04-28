import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class EndscreenAutoplayThumbnailUpdater extends BaseVideoThumbnailUpdater {
  protected background_image_url: string;
  constructor(container: HTMLElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();
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

      // Make sure the container is positioned relative to the animated background.
      // Otherwise the rotating background rectangle would be rendered in its entirety.
      this.thumbnail.style.position = 'relative';
      this.thumbnail.style.overflow = 'hidden';
      this.thumbnail.style.borderRadius = '0.5rem'
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
    }
  }

  protected getIsESPNVideo(): boolean {
    return this.getChannel() === 'ESPN Fans';
  }
  
  protected getChannel(): string {
    const channels_name_element = this.container.querySelector<HTMLElement>('.ytp-autonav-endscreen-upnext-author');
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
    return this.container.querySelector('.ytp-autonav-endscreen-upnext-title');
  }

  protected getThumbnail(): HTMLElement {
    return this.container.querySelector('.ytp-autonav-endscreen-upnext-thumbnail');
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
  }
}
