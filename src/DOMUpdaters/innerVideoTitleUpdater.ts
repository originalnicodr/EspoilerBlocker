import { BaseUpdater } from './BaseUpdater';

export class InnerVideoTitleUpdater extends BaseUpdater {
  constructor(container: HTMLAnchorElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = await this.shouldBlockSpoiler();
    if (!should_block_spoiler) {
      return;
    }

    if (!this.spoiler_blocked_title_text) {
      this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
    }

    if (this.getTitleText() !== this.spoiler_blocked_title_text) {
      this.title.textContent = this.spoiler_blocked_title_text;
    }

    this.is_being_spoiler_blocked = true;
  }

  public removeChanges() {
    super.removeChanges();
  }

  protected getIsESPNVideo(): boolean {
    // If we can properly block the spoiler from the title then it means we should do so
    return this.canBlockTitleSpoiler(this.getTitleText());
  }

  protected getTitle(): HTMLElement {
    return this.container;
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
}
