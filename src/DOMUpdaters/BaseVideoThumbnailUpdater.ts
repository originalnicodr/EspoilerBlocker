import { getTeamBadge } from '../utils/getTeamBadge';
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

    // Parent container for all overlay elements
    const wrapper = document.createElement('div');
    wrapper.className = 'thumbnail-overlay-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.top = '0';
    wrapper.style.left = '0';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.pointerEvents = 'none';
  
    const badge_a: string = getTeamBadge(this.team_a);
    const badge_b: string = getTeamBadge(this.team_b);

    if (badge_a) {
      const img_a: HTMLImageElement = document.createElement('img');
      img_a.alt = this.team_a + ' Badge';
      img_a.src = badge_a;
      img_a.width = Math.max(this.thumbnail.clientWidth * 0.2, 50);
      Object.assign(img_a.style, {
        height: 'auto',
        position: 'absolute',
        top: '35%',
        left: '20%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
      });
      wrapper.appendChild(img_a);
    }

    if (badge_b) {
      const img_b: HTMLImageElement = document.createElement('img');
      img_b.alt = this.team_b + ' Badge';
      img_b.src = badge_b;
      img_b.width = Math.max(this.thumbnail.clientWidth * 0.2, 50);
      Object.assign(img_b.style, {
        height: 'auto',
        position: 'absolute',
        top: '35%',
        left: '80%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
      });
      wrapper.appendChild(img_b);
    }

    const between_badges = document.createElement('p');
    between_badges.innerText = '-';
    Object.assign(between_badges.style, {
      position: 'absolute',
      top: '25%',
      left: '47%',
      fontSize: '50px',
      color: 'white',
      pointerEvents: 'none',
      transition: 'opacity 0.3s',
    });
    wrapper.appendChild(between_badges);
  
    if (this.match_date) {
      const day = this.match_date.getDate();
      // Months are 0-indexed (0 = January, 1 = February, etc.)
      const month = this.match_date.getMonth() + 1;
      const match_date_element: HTMLElement = document.createElement('p');
      match_date_element.innerText = `${day}/${month}`;
      Object.assign(match_date_element.style, {
        position: 'absolute',
        top: '5%',
        left: '41%',
        textAlign: 'center',
        fontSize: '35px',
        color: 'white',
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
      });
      wrapper.appendChild(match_date_element);
    }

    const display_scores_checkbox: boolean = (await this.loadSettings()).display_total_score;

    if (display_scores_checkbox) {
      const total_goals_element: HTMLElement = document.createElement('p');
      total_goals_element.innerText = `(${this.total_score})`;
      Object.assign(total_goals_element.style, {
        position: 'absolute',
        top: '45%',
        left: '41%',
        textAlign: 'center',
        fontSize: '35px',
        color: 'white',
        pointerEvents: 'none',
        transition: 'opacity 0.3s',
      });
      wrapper.appendChild(total_goals_element);
    }

    this.thumbnail.appendChild(wrapper);

    this.addThumbnailHoverActions(wrapper);
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
