import { thumbnailRender, createScoreElement, addHoverButtons } from '../renders/thumbnail.render';
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
  protected buttons: { spoiler_button: HTMLButtonElement; score_button: HTMLButtonElement; } = {
    spoiler_button: undefined,
    score_button: undefined
  };

  constructor(container: HTMLElement) {
    super(container);
    this.thumbnail = this.getThumbnail();

    this.subscribeToScoreSettingsChange();
  }

  public cleanUp() {
    super.cleanUp();

    this.buttons.score_button?.remove();
    this.buttons.score_button = null;
    this.buttons.spoiler_button?.remove();
    this.buttons.spoiler_button = null;
  }

  protected debugPrintMembers() {
    super.debugPrintMembers();
    console.log('thumbnail: ', this.thumbnail);
  }

  protected async spoilerBlockVideo(): Promise<void> {
    this.blockSpoilerText();
    this.hideThumbnail();

    const settings: Settings = await this.loadSettings();
    this.addThumbnailElements(settings);

    // We only add these buttons once on update(), so we dont want to add them again on a new update call
    if (this.buttons.spoiler_button === undefined && this.buttons.score_button === undefined) {
      this.addHoverButtons(settings);
    }
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

  protected addThumbnailElements(settings: Settings): Promise<void> {
    if (!this.thumbnail) return;
    this.added_thumbnail_element = thumbnailRender(
      this.thumbnail,
      this.team_a,
      this.team_b,
      this.highlight_type,
      this.match_date,
      settings.display_total_score ? this.total_score : null,
    );
  }

  public addHoverButtons(settings: Settings) {
    const showSpoilerButtonFunction = (show_spoiler) => {
      if (show_spoiler) {
        this.restoreSpoilers();
        this.is_active = false;
      } else {
        this.is_active = true;
        this.update();
      }
    }

    const showTotalScoreFunction = (show_total_score) => {
      const score_element = this.added_thumbnail_element.querySelector('.espn-spoilerblocker-total-score');
      console.log('score_element', score_element);
      if (score_element && !show_total_score) {
        this.removeScoreFromThumbnail();
      } else if (!score_element && show_total_score) {
        this.addScoreToThumbnail();
      }
    }

    this.buttons = addHoverButtons(
      this.thumbnail,
      false, // so far we will only add buttons to thumbnails we are blocking spoilers for
      settings.display_total_score,
      showSpoilerButtonFunction,
      showTotalScoreFunction,
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
