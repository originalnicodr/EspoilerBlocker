import { BaseUpdater } from './BaseUpdater';

export class VideoTitleUpdater extends BaseUpdater {
  constructor(container: HTMLElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();

    const current_url: string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }    

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = await this.shouldBlockSpoiler();
    if (!should_block_spoiler) {
      return;
    }

    if (!this.spoiler_blocked_title_text)
    {
      this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
    }

    if (this.getTitleText() !== this.spoiler_blocked_title_text)
    {
      this.title.textContent = this.spoiler_blocked_title_text;
    }

    this.is_being_spoiler_blocked = true;
  }

  public removeChanges() {
    super.removeChanges();
  }

  protected getIsESPNVideo(): boolean {
    // If we can properly block the spoiler from the title then it means we should do so
    return this.blockTitleSpoiler(this.getTitleText()) !== '';
  }

  // Dummy implementations
  protected getChannel(): string {
    // TODO: We should check the channel before changing the title to ensure we're not editing other channel's videos
    return '';
  }

  protected getIfAlreadyWatched(): boolean {
    return false;
  }

  protected getAriaText(): string {
    return '';
  }

  protected getTitle(): HTMLElement {
    return this.container.querySelector<HTMLElement>('yt-formatted-string');
  }

  protected getThumbnail(): HTMLElement {
    return null;
  }
}
