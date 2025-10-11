import { VideoHighlightType } from '../utils/getHighlightType';
import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class BeforeVideoThumbnailUpdater extends BaseVideoThumbnailUpdater {
  constructor(container: HTMLElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();
    if (this.is_active !== undefined && !this.is_active) {
      return;
    }

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = this.getIsESPNVideo();
    if (!should_block_spoiler) {
      return;
    }

    try {
      this.hideThumbnail();
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
      return;
    }

    this.is_active = true;
  }

  protected getIsESPNVideo(): boolean {
    return this.getChannel() === 'ESPN Fans';
  }

  protected getChannel(): string {
    const channels_name_element: HTMLElement = document.querySelector('yt-formatted-string.style-scope.ytd-channel-name.complex-string');
    if (channels_name_element) {
      return channels_name_element ? channels_name_element.innerText.trim() : '';
    }
    return 'ESPN Fans';
  }

  protected getIfAlreadyWatched(): boolean {
    return false;  // No watched state in this context
  }

  protected getAriaText(): string {
    return '';  // No aria text in this context
  }

  protected getTitle(): HTMLElement {
    return this.container;
  }

  protected getThumbnail(): HTMLElement {
    return this.container;
  }

  protected blockSpoilerText(): void {
    // No text to block in this context
  }

  protected hideThumbnail(): void {
    if (this.thumbnail === undefined) {
      return;
    }

    this.thumbnail.style.backgroundImage = '';
    this.container.style.opacity = '0';
  }
}