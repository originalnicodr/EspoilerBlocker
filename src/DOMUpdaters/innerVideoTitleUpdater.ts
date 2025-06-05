import { BaseUpdater } from './BaseUpdater';

export class InnerVideoTitleUpdater extends BaseUpdater {
  constructor(container: HTMLAnchorElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();
    if (this.is_active !== undefined && !this.is_active) {
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

    if (this.getTitleText() !== this.spoiler_blocked_title_text) {
      this.backupOriginal();
      this.title.textContent = this.spoiler_blocked_title_text;
    }

    this.is_active = true;
  }

  protected getIsESPNVideo(): boolean {
    return this.getChannel() === 'ESPN Fans';
  }

  protected getTitle(): HTMLElement {
    return this.container;
  }

  protected getChannel(): string {
    const channels_name_element: HTMLElement = document.querySelector('yt-formatted-string.style-scope.ytd-channel-name.complex-string');
    if (channels_name_element) {
      return channels_name_element ? channels_name_element.innerText.trim() : '';
    }
    return 'ESPN Fans';
  }

  // Dummy implementations, can't get this info from the video being watched
  protected getIfAlreadyWatched(): boolean {
    return false;
  }

  protected getAriaText(): string {
    return '';
  }
}
