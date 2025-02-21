import { EspnSpoilerBlocker } from './EspnSpoilerBlocker';
import { getTeamBadge } from './utils/getTeamBadge';
/**
(function () {
  function spoilerBlockVideo(video: HTMLInputElement): void {
    // Check if the video is from ESPN Fans before trying to spoil it [Homepage]
    let channel_element : HTMLInputElement = video.querySelector('ytd-channel-name a');
    if (!channel_element) {
      // [Suggested videos]
      channel_element = video.querySelector('ytd-compact-video-renderer ytd-channel-name yt-formatted-string#text');
    }

    if (channel_element) {
      let channelName : string = channel_element ? channel_element.innerText.trim() : '';
      if (channelName !== 'ESPN Fans') {
        return;
      }
    }

    // Don't block spoilers from already watched videos
    const progress_bar = video.querySelector<HTMLDivElement>('ytd-thumbnail-overlay-resume-playback-renderer #progress');
    if (progress_bar && progress_bar.style.width === "100%") {
      return;
    }

    let thumbnail_element : HTMLInputElement = video.querySelector('#thumbnail');
    const title_element : HTMLInputElement = video.querySelector('#video-title');
    const title_link : HTMLInputElement = video.querySelector('#video-title-link');

    if (!title_element || typeof title_element === 'undefined') {
      return;
    }

    const title_text : string = title_element.textContent || title_element.innerText;

    if (typeof title_text === 'undefined' || !title_text.includes('|')) {
      return;
    }

    // Check title is from a highlights match
    const match_teams_string : string = title_text.split('|')[1];
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

    const total_goals : number = getTotalGoals(title_text);

    const title_replace : string = spoilerTitle(title_text);
    if (title_replace === '') {
      return;
    }

    title_element.textContent = title_replace;
    title_element.innerText = title_replace;
    if (title_link) {
      title_link.title = title_replace;
    }

    let teams : string[] = getTeams(title_text);
    if (teams.length === 0) {
      return;
    }
    let [team_a, team_b] = teams as [string, string];
    addTeamBadges(team_a, team_b, total_goals, thumbnail_element);
  }

  function getTeams(original_title: string): string[] {
    const match_teams_string : string = original_title.split('|')[1];
    if (!match_teams_string) {
      return [];
    }

    if (!match_teams_string.includes('-')) {
      return [];
    }
    let [part1, part2] = match_teams_string.split('-');

    let team_a : string = part1.trim().split(' ').slice(0, -1).join(' ');
    let team_b : string = part2.trim().split(' ').slice(1).join(' ');

    return [team_a, team_b];
  }

  function spoilerTitle(original_title: string): string {
    const teams : string[] = getTeams(original_title);
    if (teams.length === 0) {
      return '';
    }

    let [team_a, team_b] = teams as [string, string];
    return team_a + ' vs ' + team_b;
  }

  function getTotalGoals(original_title: string): number {
    const match_teams_string : string = original_title.split('|')[1];
    if (!match_teams_string) {
      return 0;
    }

    if (!match_teams_string.includes('-')) {
      return 0;
    }

    let [part1, part2] = match_teams_string.split('-');
    return Number(part1.trim().split(' ').at(-1)) + Number(part2.trim().split(' ').at(0));
  }

  function addTeamBadges(team_a:string, team_b:string, total_goals:number, thumbnail_element: HTMLInputElement): void {
    if (thumbnail_element === undefined) {
      return;
    }

    const badge_a : string = getTeamBadge(team_a);
    const badge_b : string = getTeamBadge(team_b);

    let img_a, img_b;

    if (badge_a) {
      img_a = document.createElement('img');
      img_a.alt = team_a + 'Badge';
      img_a.src = badge_a;
      img_a.width = thumbnail_element.clientWidth * 0.2;
      img_a.style.height = 'auto';
      img_a.style.position = 'absolute';
      img_a.style.top = '35%';
      img_a.style.left = '20%';
      img_a.style.transform = 'translate(-50%, -50%)';
      img_a.style.pointerEvents = 'none';
      img_a.style.transition = "opacity 0.3s";
      thumbnail_element.appendChild(img_a);
    }

    if (badge_b) {
      img_b = document.createElement('img');
      img_b.alt = badge_b + 'Badge';
      img_b.src = badge_b;
      img_b.width = thumbnail_element.clientWidth * 0.2;
      img_b.style.position = 'absolute';
      img_b.style.top = '35%';
      img_b.style.left = '80%';
      img_b.style.transform = 'translate(-50%, -50%)';
      img_b.style.pointerEvents = 'none';
      img_b.style.transition = "opacity 0.3s";
      thumbnail_element.appendChild(img_b);
    }

    const between_badges = document.createElement('p');
    between_badges.innerText = '-';
    between_badges.style.position = 'absolute';
    between_badges.style.top = '25%';
    between_badges.style.left = '47%';
    between_badges.style.fontSize = '50px';
    between_badges.style.color = 'white';
    between_badges.style.pointerEvents = 'none';
    between_badges.style.transition = "opacity 0.3s";
    thumbnail_element.appendChild(between_badges);

    const total_goals_element = document.createElement('p');
    total_goals_element.innerText = `(${total_goals})`;
    total_goals_element.style.position = 'absolute';
    total_goals_element.style.top = '5%';
    total_goals_element.style.left = '41%';
    total_goals_element.style.textAlign = "center";
    total_goals_element.style.fontSize = '35px';
    total_goals_element.style.color = 'white';
    total_goals_element.style.pointerEvents = 'none';
    total_goals_element.style.transition = "opacity 0.3s";
    //thumbnail_element.appendChild(total_goals_element);

    thumbnail_element.addEventListener("mouseenter", () => {
      img_a.style.opacity = "0";
      img_b.style.opacity = "0";
      between_badges.style.opacity = "0";
      total_goals_element.style.opacity = "0";
    });

    thumbnail_element.addEventListener("mouseleave", () => {
      img_a.style.opacity = "100%";
      img_b.style.opacity = "100%";
      between_badges.style.opacity = "100%";
      total_goals_element.style.opacity = "100%";
    });
  }

  function hideThumbnail(thumbnail_element: HTMLInputElement): void {
    if (thumbnail_element === undefined) {
      return;
    }

    let thumbnail_image : HTMLInputElement = thumbnail_element.querySelector('#thumbnail');
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

  function feedSpoilerBlock(): void {
    //const videos = document.querySelectorAll('#content');
    const videos = document.querySelectorAll('#dismissible');
    videos.forEach(spoilerBlockVideo);
  }

  function replaceVideoTitle(): void {
    const title_element : HTMLInputElement = document.querySelector<HTMLInputElement>('h1.style-scope.ytd-watch-metadata');
    if (title_element) {
      const title_text = title_element.textContent || title_element.innerText;

      if (typeof title_text === 'undefined' || !title_text.includes('|')) {
        return;
      }

      const title_replace = spoilerTitle(title_text);
      if (title_replace === '') {
        return;
      }
      title_element.title = title_replace;
      title_element.textContent = title_replace;
      title_element.innerText = title_replace;
    }
  }

  function replacePlayerTitle(): void {
    const title_element : HTMLInputElement = document.querySelector<HTMLInputElement>(
      'a.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link'
    );

    if (title_element) {
      const title_text : string = title_element.textContent || title_element.innerText;

      if (typeof title_text === 'undefined' || !title_text.includes('|')) {
        return;
      }

      const title_replace = spoilerTitle(title_text);
      if (title_replace === '') {
        return;
      }

      title_element.title = title_replace;
      title_element.textContent = title_replace;
      title_element.innerText = title_replace;
    }
  }

  function spoilerBlockTabTitle(): void {
    const current_url : string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    let teams : string[] = getTeams(document.title);
    if (teams.length === 0) {
      return;
    }
    let [team_a, team_b] = teams as [string, string];

    const non_spoiler_title : string = team_a + ' vs. ' + team_b;

    if (document.title !== non_spoiler_title) {
      document.title = non_spoiler_title;
    }
  }

  function spoilerBlockBody(): void {
    const current_url : string = window.location.href;
    if (current_url.includes('watch?v=')) {
      replaceVideoTitle();
      replacePlayerTitle();

      //const suggestedVideos = document.querySelectorAll('ytd-compact-video-renderer.style-scope.ytd-item-section-renderer');;
      const suggestedVideos = document.querySelectorAll('ytd-compact-video-renderer');
      suggestedVideos.forEach(spoilerBlockVideo);
    } else {
      feedSpoilerBlock();
    }
  }

  const observer_tab_title : MutationObserver = new MutationObserver(() => {
    spoilerBlockTabTitle();
  });
  observer_tab_title.observe(document.querySelector('title'), { childList: true });
  spoilerBlockTabTitle();

  const body_observer : MutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      spoilerBlockBody();
    });
  });
  body_observer.observe(document.body, { childList: true, subtree: true });
  spoilerBlockBody();
})();
 */


// changes
const blocker = new EspnSpoilerBlocker();
blocker.start();
