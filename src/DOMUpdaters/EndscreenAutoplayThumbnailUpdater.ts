import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class EndscreenAutoplayThumbnailUpdater extends BaseVideoThumbnailUpdater {
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

  protected getIsESPNVideo(): boolean {
    return this.getChannel() === 'ESPN Fans';
  }
  
  protected getChannel(): string {
    const channels_name_element = this.container.querySelector<HTMLElement>('.ytp-autonav-endscreen-upnext-author');
    return channels_name_element ? channels_name_element.innerText.trim() : '';
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

  private async spoilerBlockVideo(): Promise<void> {
    this.blockSpoilerText();
    this.hideThumbnail(this.thumbnail);
    await this.addThumbnailElements();
  }

  private blockSpoilerText() {
    if (this.title) {
      if (!this.spoiler_blocked_title_text) {
        this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
      }

      this.title.textContent = this.spoiler_blocked_title_text;
      this.title.innerText = this.spoiler_blocked_title_text;
    }
  }

  private hideThumbnail(thumbnail_element: HTMLElement): void {
    if (thumbnail_element === undefined) {
      return;
    }
  
    thumbnail_element.style.backgroundImage = "";
  }

}
