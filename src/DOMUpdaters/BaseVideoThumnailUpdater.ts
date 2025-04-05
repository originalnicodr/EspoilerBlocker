import { getTeamBadge } from '../utils/getTeamBadge';
import { BaseUpdater } from './BaseUpdater';

export class BaseVideoThumnailUpdater extends BaseUpdater {
  protected thumbnail: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.thumbnail = this.getThumbnail();
  }

  protected debugPrintMembers() {
    super.debugPrintMembers();
    console.log('thumbnail: ', this.thumbnail);
  }

  protected async addThumbnailElements(): Promise<void> {
    if (this.thumbnail === undefined) {
      return;
    }

    const badge_a: string = getTeamBadge(this.team_a);
    const badge_b: string = getTeamBadge(this.team_b);

    let img_a, img_b;

    if (badge_a) {
      img_a = document.createElement('img');
      img_a.alt = this.team_a + ' Badge';
      img_a.src = badge_a;
      img_a.width = this.thumbnail.clientWidth * 0.2;
      img_a.style.height = 'auto';
      img_a.style.position = 'absolute';
      img_a.style.top = '35%';
      img_a.style.left = '20%';
      img_a.style.transform = 'translate(-50%, -50%)';
      img_a.style.pointerEvents = 'none';
      img_a.style.transition = 'opacity 0.3s';
      this.thumbnail.appendChild(img_a);
    }

    if (badge_b) {
      img_b = document.createElement('img');
      img_b.alt = this.team_b + ' Badge';
      img_b.src = badge_b;
      img_b.width = this.thumbnail.clientWidth * 0.2;
      img_b.style.position = 'absolute';
      img_b.style.top = '35%';
      img_b.style.left = '80%';
      img_b.style.transform = 'translate(-50%, -50%)';
      img_b.style.pointerEvents = 'none';
      img_b.style.transition = 'opacity 0.3s';
      this.thumbnail.appendChild(img_b);
    }

    const between_badges = document.createElement('p');
    between_badges.innerText = '-';
    between_badges.style.position = 'absolute';
    between_badges.style.top = '25%';
    between_badges.style.left = '47%';
    between_badges.style.fontSize = '50px';
    between_badges.style.color = 'white';
    between_badges.style.pointerEvents = 'none';
    between_badges.style.transition = 'opacity 0.3s';
    this.thumbnail.appendChild(between_badges);

    const day = this.match_date.getDate();
    // Months are 0-indexed (0 = January, 1 = February, etc.)
    const month = this.match_date.getMonth() + 1;

    const match_date_element = document.createElement('p');
    match_date_element.innerText = `${day}/${month}`;
    match_date_element.style.position = 'absolute';
    match_date_element.style.top = '5%';
    match_date_element.style.left = '41%';
    match_date_element.style.textAlign = 'center';
    match_date_element.style.fontSize = '35px';
    match_date_element.style.color = 'white';
    match_date_element.style.pointerEvents = 'none';
    match_date_element.style.transition = 'opacity 0.3s';
    this.thumbnail.appendChild(match_date_element);

    const display_scores_checkbox: boolean = (await this.loadSettings()).display_total_score;
    let total_goals_element: HTMLElement;

    if (display_scores_checkbox) {
      total_goals_element = document.createElement('p');
      total_goals_element.innerText = `(${this.total_score})`;
      total_goals_element.style.position = 'absolute';
      total_goals_element.style.top = '45%';
      total_goals_element.style.left = '41%';
      total_goals_element.style.textAlign = 'center';
      total_goals_element.style.fontSize = '35px';
      total_goals_element.style.color = 'white';
      total_goals_element.style.pointerEvents = 'none';
      total_goals_element.style.transition = 'opacity 0.3s';
      this.thumbnail.appendChild(total_goals_element);
    }

    this.thumbnail.addEventListener('mouseenter', () => {
      img_a.style.opacity = '0';
      img_b.style.opacity = '0';
      between_badges.style.opacity = '0';
      match_date_element.style.opacity = '0';
      if (total_goals_element) {
        total_goals_element.style.opacity = '0';
      }
    });

    this.thumbnail.addEventListener('mouseleave', () => {
      img_a.style.opacity = '100%';
      img_b.style.opacity = '100%';
      between_badges.style.opacity = '100%';
      match_date_element.style.opacity = '100%';
      if (total_goals_element) {
        total_goals_element.style.opacity = '100%';
      }
    });
  }

  protected getThumbnail(): HTMLElement {
    throw new Error('getThumbnail method not implemented');
  }

}
