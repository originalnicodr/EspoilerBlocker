import { getTeamsByTitle } from '../utils/getTeamsByTitle';
import { BaseUpdater } from './BaseUpdater';

export class TitleUpdater extends BaseUpdater {
  private originalYoutubeTitle: string = undefined;

  constructor(private title: Element) {
    super(title);
  }

  update() {
    const current_url: string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    // TODO: We should check the channel before changing the title to ensure we're not editing other channel's videos

    let teams = getTeamsByTitle(document.title);
    if (teams.length === 0) {
      return;
    }
    let [teamA, teamB] = teams;

    const non_spoiler_title = `${teamA} vs ${teamB}`;

    if (document.title !== non_spoiler_title) {
      document.title = non_spoiler_title;
    }
  }

  removeChanges() {
    super.removeChanges();
  }
}
