export function getTeamsByTitle(title: string): string[] {
  const match_teams_string: string = title.split('|')[1];
  if (!match_teams_string || !match_teams_string.includes('-')) {
    return [];
  }

  const [part1, part2] = match_teams_string.split('-');

  const teamA: string = part1.trim().split(' ').slice(0, -1).join(' ');
  const teamB: string = part2.trim().split(' ').slice(1).join(' ');

  return [teamA, teamB];
}
