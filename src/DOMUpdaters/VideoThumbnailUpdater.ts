import { thumbnailRender } from '../renders/thumbnail.render';
import { BaseUpdater } from './BaseUpdater';

export class VideoThumbnailUpdater extends BaseUpdater {
  constructor(private container: Element) {
    super(container);
  }

  public update() {
    try {
      if (this.shouldBlockSpoilers()) {
        this.duplicateElement();
        spoilerBlockVideo(this.elementToEdit);
      }
    } catch (error) {
      console.error('Error spoiling video:', { container: this.container, error });
    }
  }

  public removeChanges() {
    super.removeChanges();
  }

  private shouldBlockSpoilers(): boolean {
    // Conditions.
    // check either channel name OR if we're watching ESPN FANS PAGE.
    let channelCondition = false;
    if (window.location.href.toLowerCase().includes('espnfans')) {
      channelCondition = true;
    } else {
      let channelElement = this.container.querySelector<HTMLElement>('ytd-channel-name a');

      if (!channelElement) {
        channelElement = this.container.querySelector(
          'ytd-compact-video-renderer ytd-channel-name yt-formatted-string#text',
        );
      }

      if ((channelElement?.innerText || channelElement.textContent).trim() === 'ESPN Fans') {
        channelCondition = true;
      }
    }

    return channelCondition && this.videoTitleContainsSpoilers();
  }

  videoTitleContainsSpoilers(): boolean {
    const titleElement: HTMLInputElement = this.container.querySelector('#video-title');

    if (!titleElement) {
      return false;
    }

    const title = (titleElement.textContent || titleElement.innerText || '').trim();

    // NOTE: we could use this regex to retrieve groups, goals, and extra info using the named groups.
    // probably we would want to move it to utils
    const regex =
      /(?<summary>.+) \| (?<team1>.+) (?<goalsTeam1>\d+)( \((?<penaltyTeam1>\d+)\)-\((?<penaltyTeam2>\d+)\))? ?-? ?(?<goalsTeam2>\d+) (?<team2>.+) \| RESUMEN$/;

    return regex.test(title);
  }
}

function spoilerBlockVideo(video: Element): void {
  // Don't block spoilers from already watched videos
  const progress_bar = video.querySelector<HTMLDivElement>('ytd-thumbnail-overlay-resume-playback-renderer #progress');
  if (progress_bar && progress_bar.style.width === '100%') {
    return;
  }

  let thumbnail_element: HTMLElement = video.querySelector('#thumbnail');
  const title_element: HTMLAnchorElement = video.querySelector('#video-title');

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

  thumbnailRender(thumbnail_element, title_element);
}
