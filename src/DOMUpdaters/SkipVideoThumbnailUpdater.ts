import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class SkipVideoThumbnailUpdater extends BaseVideoThumbnailUpdater {
  protected originalState: {
    thumbnailDisplayStyle?: string;
    titleTextContent?: string;
    containerDisplayStyle?: string;
    dataPreview?: string;
  } = {};

  constructor(container: HTMLElement) {
    super(container);
  }

  public async update() {
    //this.debugPrintMembers();
    if (this.is_active !== undefined && !this.is_active) {
      return;
    }

    this.backupOriginal();

    const current_url: string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = await this.shouldBlockSpoiler();
    if (!should_block_spoiler) {
      return;
    }

    try {
      await this.spoilerBlockVideo();

      this.added_thumbnail_element.style.opacity = '0'; 
      this.container.addEventListener('mouseenter', () => {
        if (this.added_thumbnail_element) {
          this.added_thumbnail_element.style.opacity = '100%';
        }
      });

      this.container.addEventListener('mouseleave', () => {
        if (this.added_thumbnail_element) {
          this.added_thumbnail_element.style.opacity = '0';
        }
      });

      // Make sure the container is positioned relative to the animated background.
      // Other the rotating background rectangle would be rendered in its entirety.
      this.thumbnail.style.position = 'relative';
      this.thumbnail.style.overflow = 'hidden';
      this.thumbnail.style.borderRadius = '0.5rem'
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
      return;
    }

    this.is_active = true;
  }

  protected getTitle(): HTMLElement {
    return this.container;
  }

  protected getTitleText(): string {
    return this.title.getAttribute('data-tooltip-text');
  }

  protected getThumbnail(): HTMLElement {
    // The thumbnail is outside of the element that holds this title
    return document.querySelector(".ytp-tooltip-bg");
  }

  protected getIsESPNVideo(): boolean {
    // If the title contains spoilers then we should block them, so we consider it an ESPN video
    return this.videoTitleContainsSpoilers();
  }

  protected getChannel(): string {
    return '';
  }

  // YouTube won't recommend videos the user already watched
  protected getIfAlreadyWatched(): boolean {
    return false;
  }

  protected getAriaText(): string {
    return '';
  }

  protected blockSpoilerText() {
    if (this.title) {
      if (!this.spoiler_blocked_title_text) {
        this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
      }

      this.title.setAttribute('data-tooltip-text', this.spoiler_blocked_title_text);
    }
  }

  protected hideThumbnail(): void {
    this.container.removeAttribute('data-preview');
  }

  public backupOriginal() {
    if (!this.container) return;
    //super.backupOriginal();
    this.originalState.dataPreview = this.container.getAttribute('data-preview');
    this.originalState.titleTextContent = this.title.getAttribute('data-tooltip-text');
  }

  public restoreSpoilers() {
    //super.restoreSpoilers();
    if (!this.is_active) {
      return;
    }

    if (this.originalState.dataPreview !== undefined) {
      this.container.setAttribute('data-preview', this.originalState.dataPreview);
    }

    if (this.originalState.titleTextContent !== undefined) {
      this.container.setAttribute('data-tooltip-text', this.originalState.titleTextContent);
    }

    this.added_thumbnail_element?.remove();
    this.added_thumbnail_element = null;
  }
}
