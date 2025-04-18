import { thumbnailRender } from '../renders/thumbnail.render';
import { Settings } from '../utils/settings';
import { BaseUpdater } from './BaseUpdater';

export class BaseVideoThumbnailUpdater extends BaseUpdater {
  protected thumbnail: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.thumbnail = this.getThumbnail();
  }

  protected debugPrintMembers() {
    super.debugPrintMembers();
    console.log('thumbnail: ', this.thumbnail);
  }

  protected async spoilerBlockVideo(): Promise<void> {
    this.blockSpoilerText();
    this.hideThumbnail();
    await this.addThumbnailElements();
  }

  protected blockSpoilerText() {
    throw new Error('blockSpoilerText method not implemented');
  }

  protected hideThumbnail(): void {
    if (this.thumbnail === undefined) {
      return;
    }
  
    this.thumbnail.style.backgroundImage = "";
  }

  protected async addThumbnailElements(): Promise<void> {
    if (!this.thumbnail) return;
    const settings: Settings = await this.loadSettings();

    thumbnailRender(
      this.thumbnail,
      this.team_a,
      this.team_b,
      this.match_date,
      settings.display_total_score ? this.total_score : null,
    );
  }

  protected addThumbnailHoverActions(wrapper: HTMLElement){
    this.thumbnail.addEventListener('mouseenter', () => {
      wrapper.style.opacity = '0';
    });

    this.thumbnail.addEventListener('mouseleave', () => {
      wrapper.style.opacity = '100%';
    });
  }

  protected getThumbnail(): HTMLElement {
    throw new Error('getThumbnail method not implemented');
  }
}
