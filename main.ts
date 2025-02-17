import { getTeamBadge } from './utils/utils';

(function () {
  function spoilerBlockVideo(video) {
    // Check if the video is from ESPN Fans before trying to spoil it [Homepage]
    var channel_element = video.querySelector('ytd-channel-name a');
    if (!channel_element) {
      // [Suggested videos]
      channel_element = video.querySelector('ytd-compact-video-renderer ytd-channel-name yt-formatted-string#text');
    }

    if (channel_element) {
      let channelName = channel_element ? channel_element.innerText.trim() : '';
      if (channelName !== 'ESPN Fans') {
        return;
      }
    }

    var thumbnail_element = video.querySelector('#thumbnail');
    const title_element = video.querySelector('#video-title');
    const title_link = video.querySelector('#video-title-link');

    if (!title_element || typeof title_element === 'undefined') {
      return;
    }

    const title_text = title_element.textContent || title_element.innerText;

    if (typeof title_text === 'undefined' || !title_text.includes('|')) {
      return;
    }

    // Check title is from a highlights match
    const match_teams_string = title_text.split('|')[1];
    if (!match_teams_string) {
      return;
    }
    if (!match_teams_string.includes('-')) {
      return;
    }

    if (!thumbnail_element) {
      var thumbnail_element = video.querySelector('ytd-compact-video-renderer ytd-thumbnail img');
    }

    hideThumbnail(thumbnail_element);

    const title_replace = spoilerTitle(title_text);
    if (title_replace === '') {
      return;
    }

    title_element.textContent = title_replace;
    title_element.innerText = title_replace;
    if (title_link) {
      title_link.title = title_replace;
    }

    let teams = getTeams(title_text);
    if (teams.length === 0) {
      return;
    }
    let [team_a, team_b] = teams;
    addTeamBadges(team_a, team_b, thumbnail_element);
  }

  function getTeams(original_title): any[] {
    const match_teams_string = original_title.split('|')[1];
    if (!match_teams_string) {
      return [];
    }

    if (!match_teams_string.includes('-')) {
      return [];
    }
    let [part1, part2] = match_teams_string.split('-');

    let team_a = part1.trim().split(' ').slice(0, -1).join(' ');
    let team_b = part2.trim().split(' ').slice(1).join(' ');

    return [team_a, team_b];
  }

  function spoilerTitle(original_title) {
    const teams = getTeams(original_title);
    if (teams.length === 0) {
      return '';
    }

    let [team_a, team_b] = teams;
    return team_a + ' vs ' + team_b;
  }

  function addTeamBadges(team_a, team_b, thumbnail_element) {
    if (thumbnail_element === 'undefined') {
      return;
    }

    const badge_a = getTeamBadge(team_a);
    const badge_b = getTeamBadge(team_b);

    if (badge_a) {
      const img_a = document.createElement('img');
      img_a.alt = team_a + 'Badge';
      img_a.src = badge_a;
      img_a.width = thumbnail_element.clientWidth * 0.2;
      img_a.style.height = 'auto';
      img_a.style.position = 'absolute';
      img_a.style.top = '35%';
      img_a.style.left = '20%';
      img_a.style.transform = 'translate(-50%, -50%)';
      img_a.style.pointerEvents = 'none';
      thumbnail_element.appendChild(img_a);
    }

    if (badge_b) {
      const img_b = document.createElement('img');
      img_b.alt = badge_b + 'Badge';
      img_b.src = badge_b;
      img_b.width = thumbnail_element.clientWidth * 0.2;
      img_b.style.position = 'absolute';
      img_b.style.top = '35%';
      img_b.style.left = '80%';
      img_b.style.transform = 'translate(-50%, -50%)';
      img_b.style.pointerEvents = 'none';
      thumbnail_element.appendChild(img_b);
    }

    const betweenBadges = document.createElement('p');
    betweenBadges.innerText = '-';
    betweenBadges.style.position = 'absolute';
    betweenBadges.style.top = '25%';
    betweenBadges.style.left = '47%';
    betweenBadges.style.fontSize = '50px';
    betweenBadges.style.color = 'white';
    betweenBadges.style.pointerEvents = 'none';
    thumbnail_element.appendChild(betweenBadges);
  }

  function hideThumbnail(thumbnail_element) {
    if (thumbnail_element === 'undefined') {
      return;
    }

    var thumbnail_image = thumbnail_element.querySelector('#thumbnail');
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

  function feedSpoilerBlock() {
    //const videos = document.querySelectorAll('#content');
    const videos = document.querySelectorAll('#dismissible');
    videos.forEach(spoilerBlockVideo);
  }

  function replaceVideoTitle() {
    const title_element = document.querySelector<any>('h1.style-scope.ytd-watch-metadata');
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

  function replacePlayerTitle() {
    const title_element = document.querySelector<any>(
      'a.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link'
    );

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

  function spoilerBlockTabTitle() {
    const current_url = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    let teams = getTeams(document.title);
    if (teams.length === 0) {
      return;
    }
    let [team_a, team_b] = teams;

    const non_spoiler_title = team_a + ' vs. ' + team_b;

    if (document.title !== non_spoiler_title) {
      document.title = non_spoiler_title;
    }
  }

  function spoilerBlockBody() {
    const current_url = window.location.href;
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

  const observer_tab_title = new MutationObserver(() => {
    spoilerBlockTabTitle();
  });
  observer_tab_title.observe(document.querySelector('title'), { childList: true });
  spoilerBlockTabTitle();

  const body_observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      spoilerBlockBody();
    });
  });
  body_observer.observe(document.body, { childList: true, subtree: true });
  spoilerBlockBody();
})();
