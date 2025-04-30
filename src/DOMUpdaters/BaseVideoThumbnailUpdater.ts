import { thumbnailRender, createScoreElement } from '../renders/thumbnail.render';
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

    this.subscribeToScoreSettingsChange();
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

  protected addScoreToThumbnail(): void {
    const middle = this.added_thumbnail_element.querySelector('.espn-spoilerblocker-middle-elements');
    if (!middle || this.added_thumbnail_element.querySelector('.espn-spoilerblocker-total-score')) return;
  
    const score_element = createScoreElement(this.total_score);
    middle.appendChild(score_element);
  }
  
  protected removeScoreFromThumbnail(): void {
    const score_element = this.added_thumbnail_element.querySelector('.espn-spoilerblocker-total-score');
    if (score_element) {
      score_element.remove();
    }
  }

  private subscribeToScoreSettingsChange() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.updateScoreSeettingsChangeMessage(message, sender, sendResponse);
    });
  }

  protected updateScoreSeettingsChangeMessage(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) {
    if (message.action === 'updatedScoresSetting' && this.added_thumbnail_element) {
      if (this.added_thumbnail_element) {
        if (message.value) {
          this.addScoreToThumbnail();
        } else {
          this.removeScoreFromThumbnail();
        }
      }
    }
  }

  protected getThumbnail(): HTMLElement {
    throw new Error('getThumbnail method not implemented');
  }
}
