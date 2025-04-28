import { thumbnailRender } from '../renders/thumbnail.render';
import { Settings } from '../utils/settings';
import { BaseUpdater } from './BaseUpdater';

export class BaseVideoThumbnailUpdater extends BaseUpdater {
  protected originalState: {
    thumbnailDisplayStyle?: string;
    titleTextContent?: string;
    containerDisplayStyle?: string;
  } = {};

  protected thumbnail: HTMLElement;
  protected added_thumbnail_element: HTMLElement | null = null;

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

    this.added_thumbnail_element = thumbnailRender(
      this.thumbnail,
      this.team_a,
      this.team_b,
      this.match_date,
      settings.display_total_score ? this.total_score : null,
    );
  }

  public backupOriginal() {
    if (!this.container) return;
    super.backupOriginal();
    this.originalState.thumbnailDisplayStyle = (this.thumbnail as HTMLElement).style.display;
  }

  public restoreSpoilers() {
    super.restoreSpoilers();

    if (this.originalState.thumbnailDisplayStyle !== undefined) {
      (this.thumbnail as HTMLElement).style.display = this.originalState.thumbnailDisplayStyle;
    }

    this.added_thumbnail_element?.remove();
    this.added_thumbnail_element = null;
  }

  protected getThumbnail(): HTMLElement {
    throw new Error('getThumbnail method not implemented');
  }
}
