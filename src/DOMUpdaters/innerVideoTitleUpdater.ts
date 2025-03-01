import { getTeamsByTitle } from '../utils/getTeamsByTitle';
import { BaseUpdater } from './BaseUpdater';

export class InnerVideoTitleUpdater extends BaseUpdater {
  constructor(private title: HTMLAnchorElement) {
    super(title);
  }

  public update() {
    // TODO: We should check the channel before changing the title to ensure we're not editing other channel's videos

    const title = this.title.textContent;

    let teams = getTeamsByTitle(title);
    if (teams.length === 0) {
      return;
    }
    let [teamA, teamB] = teams;

    const non_spoiler_title = `${teamA} vs ${teamB}`;

    if (this.title.textContent !== non_spoiler_title) {
      this.title.innerHTML = non_spoiler_title;
    }
  }

  public removeChanges() {
    super.removeChanges();
  }
}
