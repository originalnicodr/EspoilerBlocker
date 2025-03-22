import { getTeamsByTitle } from '../utils/getTeamsByTitle'

export function spoilerTitle(original_title: string): string {
  const teams: string[] = getTeamsByTitle(original_title);
  if (teams.length === 0) {
    return '';
  }

  const [team_a, team_b] = teams;
  return team_a + ' vs ' + team_b;
}
