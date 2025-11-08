import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class PlaylistVideoThumbnailUpdater extends BaseVideoThumbnailUpdater {
  protected background_image_url: string;
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
    if (!current_url.includes('playlist?list=')) {
      return;
    }

    this.retrieveUpdaterData();
    const should_block_spoiler: boolean = await this.shouldBlockSpoiler();
    if (!should_block_spoiler) {
      return;
    }

    try {
      await this.spoilerBlockVideo();
    } catch (error) {
      console.error('Error blocking spoiler from video:', { container: this.container, error });
      return;
    }

    this.is_active = true;
  }

  protected getIsESPNVideo(): boolean {
    return this.getChannel().includes('ESPN Fans');
  }

  protected getChannel(): string {
    return 'ESPN Fans';
  }

  protected getIfAlreadyWatched(): boolean {
    const progress_bar = this.container.querySelector<HTMLDivElement>('#progress');
    return progress_bar?.style.width === '100%' || false;
  }

  protected getAriaText(): string {
    return this.container.getAttribute('aria-label');
  }

  protected getTitle(): HTMLElement {
    return this.container.querySelector('.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer');
  }

  protected getThumbnail(): HTMLElement {
    return this.container.querySelector('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail');
  }

  protected blockSpoilerText() {
    if (this.title) {
      if (!this.spoiler_blocked_title_text) {
        this.spoiler_blocked_title_text = this.blockTitleSpoiler(this.getTitleText());
      }

      this.title.textContent = this.spoiler_blocked_title_text;
      this.title.innerText = this.spoiler_blocked_title_text;
    }
  }

  public backupOriginal() {
    if (!this.container) return;

    this.originalState.titleTextContent = this.title?.innerText || '';
    this.originalState.thumbnailDisplayStyle = (this.thumbnail as HTMLElement).style.display;
  }

  public restoreSpoilers() {
    super.restoreSpoilers();

    this.thumbnail.style.backgroundImage = this.background_image_url;

    if (this.title) {
      this.title.textContent = this.originalState.titleTextContent;
      this.title.innerText = this.originalState.titleTextContent;
    }
  }

  protected hideThumbnail(): void {
    if (this.thumbnail === undefined) {
      return;
    }

    this.thumbnail.style.backgroundImage = '';
  }
}
