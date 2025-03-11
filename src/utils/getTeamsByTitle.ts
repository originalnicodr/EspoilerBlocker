import { standarizeTeamsName } from "./standarizeTeamsName";

export function getTeamsByTitle(title: string): string[] {
  const match_teams_string: string = title.split('|')[1];
  if (!match_teams_string || !match_teams_string.includes('-')) {
    return [];
  }

  let [part1, part2] = match_teams_string.split('-');

  let teamA: string = part1.trim().split(' ').slice(0, -1).join(' ');
  let teamB: string = part2.trim().split(' ').slice(1).join(' ');

  return [standarizeTeamsName(teamA), standarizeTeamsName(teamB)];
}
