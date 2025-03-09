import { addThumbnailElements } from '../utils/addThumbnailElements';
import { getMatchDate } from '../utils/getMatchDate'
import { getTeamsByTitle } from '../utils/getTeamsByTitle';
import { getTotalGoals } from '../utils/getTotalGoals';
import { spoilerTitle } from '../utils/spoilerTitle';
import { BaseUpdater } from './BaseUpdater';

export class EndscreenAutoplayThumbnailUpdater extends BaseUpdater {
  constructor(private container: Element) {
    super(container);
  }

  public update() {
    try {
      spoilerBlockVideo(this.container);
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
    }
  }

  public removeChanges() {
    super.removeChanges();
  }
}

function spoilerBlockVideo(video: Element): void {
  let channel_element = video.querySelector<HTMLElement>('ytp-autonav-endscreen-upnext-author');

  if (channel_element) {
    const channelName: string = channel_element ? channel_element.innerText.trim() : '';
    if (channelName.includes('ESPN Fans')) {
      return;
    }
  }

  let thumbnail_element: HTMLInputElement = video.querySelector('.ytp-autonav-endscreen-upnext-thumbnail');
  const title_element: HTMLInputElement = video.querySelector('.ytp-autonav-endscreen-upnext-title');

  if (!title_element || typeof title_element === 'undefined') {
    return;
  }

  const title_text: string = title_element.textContent || title_element.innerText;

  if (typeof title_text === 'undefined' || !title_text.includes('|')) {
    return;
  }

  // Check title is from a highlights match
  const match_teams_string: string = title_text.split('|')[1];
  if (!match_teams_string) {
    return;
  }
  if (!match_teams_string.includes('-')) {
    return;
  }

  hideThumbnail(thumbnail_element);

  const title_replace: string = spoilerTitle(title_text);
  if (title_replace === '') {
    return;
  }
  title_element.textContent = title_replace;
  title_element.innerText = title_replace;

  const teams: string[] = getTeamsByTitle(title_text);
  if (teams.length === 0) {
    return;
  }
  const [team_a, team_b] = teams as [string, string];
  const match_date: Date = getMatchDate(video.getAttribute('aria-label'));
  const total_goals: number = getTotalGoals(title_text);
  addThumbnailElements(team_a, team_b, match_date, total_goals, thumbnail_element);
}

function hideThumbnail(thumbnail_element: HTMLInputElement): void {
  if (thumbnail_element === undefined) {
    return;
  }

  thumbnail_element.style.backgroundImage = "";
}
