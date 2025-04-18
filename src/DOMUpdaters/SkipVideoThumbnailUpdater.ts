import { BaseVideoThumbnailUpdater } from './BaseVideoThumbnailUpdater';

export class SkipVideoThumbnailUpdater extends BaseVideoThumbnailUpdater {
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

    try {
      await this.spoilerBlockVideo();
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
    }

    this.is_being_spoiler_blocked = true;
  }

  public removeChanges() {
    super.removeChanges();
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
    // If we can properly block the spoiler from the title then it means we should do so
    return this.canBlockTitleSpoiler(this.getTitleText());
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

  // Redefine BaseVideoThumbnailUpdater.addThumbnailHoverActions since they need to be different here
  protected addThumbnailHoverActions(wrapper: HTMLElement){
    // Hide it by default
    wrapper.style.opacity = '0'; 

    this.container.addEventListener('mouseenter', () => {
      wrapper.style.opacity = '100%';
    });

    this.container.addEventListener('mouseleave', () => {
      wrapper.style.opacity = '0';
    });
  }
}
