import { addThumbnailElements } from '../utils/addThumbnailElements';
import { getMatchDate } from '../utils/getMatchDate';
import { getTeamsByTitle } from '../utils/getTeamsByTitle';
import { getTotalGoals } from '../utils/getTotalGoals';
import { spoilerTitle } from '../utils/spoilerTitle';
import { BaseUpdater } from './BaseUpdater';

export class VideoThumbnailUpdater extends BaseUpdater {
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
  // Check if the video is from ESPN Fans before trying to spoil it [Homepage]
  let channel_element = video.querySelector<HTMLElement>('ytd-channel-name a');
  if (!channel_element) {
    channel_element = video.querySelector('ytd-compact-video-renderer ytd-channel-name yt-formatted-string#text');
  }

  if (channel_element) {
    const channelName: string = channel_element ? channel_element.innerText.trim() : '';
    if (channelName !== 'ESPN Fans') {
      return;
    }
  }

  // Don't block spoilers from already watched videos
  const progress_bar = video.querySelector<HTMLDivElement>('ytd-thumbnail-overlay-resume-playback-renderer #progress');
  if (progress_bar && progress_bar.style.width === '100%') {
    return;
  }

  let thumbnail_element: HTMLInputElement = video.querySelector('#thumbnail');
  const title_element: HTMLInputElement = video.querySelector('#video-title');
  const title_link: HTMLInputElement = video.querySelector('#video-title-link');

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

  if (!thumbnail_element) {
    thumbnail_element = video.querySelector('ytd-compact-video-renderer ytd-thumbnail img');
  }

  hideThumbnail(thumbnail_element);

  const total_goals: number = getTotalGoals(title_text);

  let aria_text: string;
  if (title_link) {
    aria_text = title_link.getAttribute('aria-label');
  }
  else {
    // The aria text with the date info can be found in the title itself instead of the title link
    aria_text = title_element.getAttribute('aria-label');
  }
  const match_date: Date = getMatchDate(aria_text);

  const title_replace: string = spoilerTitle(title_text);
  if (title_replace === '') {
    return;
  }

  title_element.textContent = title_replace;
  title_element.innerText = title_replace;
  if (title_link) {
    title_link.title = title_replace;
  }

  const teams: string[] = getTeamsByTitle(title_text);
  if (teams.length === 0) {
    return;
  }
  const [team_a, team_b] = teams as [string, string];
  addThumbnailElements(team_a, team_b, match_date, total_goals, thumbnail_element);
}

function hideThumbnail(thumbnail_element: HTMLInputElement): void {
  if (thumbnail_element === undefined) {
    return;
  }

  let thumbnail_image: HTMLInputElement = thumbnail_element.querySelector('#thumbnail');
  if (thumbnail_image) {
    thumbnail_image.style.opacity = '0';
    return;
  }

  thumbnail_image = thumbnail_element.querySelector('#image');
  if (thumbnail_image) {
    thumbnail_image.style.opacity = '0';
    return;
  }

  thumbnail_image = thumbnail_element.querySelector('yt-image');
  if (thumbnail_image) {
    thumbnail_image.style.opacity = '0';
    return;
  }
}
