export function getTotalGoals(original_title: string): number {
    const match_teams_string: string = original_title.split('|')[1];
    if (!match_teams_string) {
      return 0;
    }
  
    if (!match_teams_string.includes('-')) {
      return 0;
    }
  
    const [part1, part2] = match_teams_string.split('-');
    return Number(part1.trim().split(' ').at(-1)) + Number(part2.trim().split(' ').at(0));
  }
