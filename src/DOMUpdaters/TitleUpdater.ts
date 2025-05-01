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
      this.backupOriginal();
      document.title = this.spoiler_blocked_title_text;
    }

    this.is_being_spoiler_blocked = true;
  }

  protected getTitleText(): string {
    // Remove " - YouTube" at the end of the title if it exists so we only pass the og video title to blockTitleSpoiler
    const suffix = ' - YouTube';
    return document.title.endsWith(suffix) ? document.title.slice(0, -suffix.length) : document.title;
  }

  protected getIsESPNVideo(): boolean {
    // If the title contains spoilers then we should block them, so we consider it an ESPN video
    return this.videoTitleContainsSpoilers();
  }

  // Dummy implementations, can't get this info from the video being watched
  protected getChannel(): string {
    // Since the TitleUpdater is applied as soon as the website gives a document title (aka the website name we see in the tab) the page itself won't 
    // have been loaded at that point, making it so that we can't check the channel before trying to block spoilers in the title
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

  public backupOriginal() {
    this.originalState.titleTextContent = document.title;
  }

  public restoreSpoilers() {
    // We don't want to restore the title if we are not on a video page, as we didn't change it.
    const current_url: string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    document.title = this.originalState.titleTextContent;
  }
}
