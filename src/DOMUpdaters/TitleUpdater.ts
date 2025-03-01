import { getTeamsByTitle } from '../utils/getTeamsByTitle';
import { BaseUpdater } from './BaseUpdater';

export class TitleUpdater extends BaseUpdater {
  constructor(private title: Element) {
    super(title);
  }

  public update() {
    const current_url: string = window.location.href;
    if (!current_url.includes('watch?v=')) {
      return;
    }

    // TODO: We should check the channel before changing the title to ensure we're not editing other channel's videos

    const teams = getTeamsByTitle(document.title);
    if (teams.length === 0) {
      return;
    }
    const [teamA, teamB] = teams;

    const non_spoiler_title = `${teamA} vs ${teamB}`;

    if (document.title !== non_spoiler_title) {
      document.title = non_spoiler_title;
    }
  }

  public removeChanges() {
    super.removeChanges();
  }
}
