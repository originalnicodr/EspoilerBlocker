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

    let teams = this.getTeamsFromTitle();
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

  private getTeamsFromTitle() {
    const match_teams_string = document.title.split('|')[1];
    if (!match_teams_string || !match_teams_string.includes('-')) {
      return [];
    }

    let [part1, part2] = match_teams_string.split('-');

    let teamA = part1.trim().split(' ').slice(0, -1).join(' ');
    let teamB = part2.trim().split(' ').slice(1).join(' ');

    return [teamA, teamB];
  }
}
