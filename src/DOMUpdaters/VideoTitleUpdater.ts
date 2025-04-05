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
    return this.getChannel() === 'ESPN Fans';
  }

  protected getChannel(): string {
    const channels_name_element: HTMLElement = document.querySelector('yt-formatted-string.style-scope.ytd-channel-name.complex-string');
    return channels_name_element.innerText;
  }

  // Dummy implementations, can't get this info from the video being watched
  protected getIfAlreadyWatched(): boolean {
    return false;
  }

  protected getAriaText(): string {
    return '';
  }

  protected getTitle(): HTMLElement {
    return this.container.querySelector<HTMLElement>('yt-formatted-string');
  }

}
