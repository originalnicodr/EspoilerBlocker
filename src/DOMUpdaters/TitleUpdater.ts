import { BaseUpdater } from './BaseUpdater';

export class TitleUpdater extends BaseUpdater {
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

    if (!this.spoiler_blocked_title_text) {
      this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
    }

    if (document.title !== this.spoiler_blocked_title_text) {
      document.title = this.spoiler_blocked_title_text;
    }

    this.is_being_spoiler_blocked = true;
  }

  public removeChanges() {
    super.removeChanges();
  }

  protected getTitleText(): string {
    // Remove " - YouTube" at the end of the title if it exists so we only pass the og video title to blockTitleSpoiler
    const suffix = ' - YouTube';
    return document.title.endsWith(suffix) ? document.title.slice(0, -suffix.length) : document.title;
  }

  protected getIsESPNVideo(): boolean {
    // If we can properly block the spoiler from the title then it means we should do so
    return this.canBlockTitleSpoiler(this.getTitleText());
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

  // We are not using the title because it is an HTMLElement, and this updater only focuses on the document title
  protected getTitle(): HTMLElement {
    return null;
  }

  protected getThumbnail(): HTMLElement {
    return null;
  }
}
