export function standarizeTeamsName(team_alias: string): string {
  // Premier
  switch (team_alias) {
    case 'Aston':
    case 'Aston Villa':
    case 'A. Villa':
    case 'Villa':
      return 'Aston Villa';
    case 'Burnley':
    case 'Burnley FC':
      return 'Burnley';
    case 'Crystal Palace':
    case 'C. Palace':
      return 'Crystal Palace';
    case 'Ipswich Town':
    case 'Ipswich':
      return 'Ipswich';
    case 'Leeds United':
    case 'Leeds':
      return 'Leeds United';
    case 'Leicester City':
    case 'Leicester':
      return 'Leicester';
    case 'Manchester City':
    case 'Man. City':
    case 'M. City':
      return 'Manchester City';
    case 'Manchester United':
    case 'M. United':
    case 'Manchester Utd':
    case 'Man. Utd':
    case 'Man. United':
    case 'M. Utd.':
      return 'Manchester United';
    case 'Newcastle United':
    case 'Newcastle':
      return 'Newcastle';
    case 'Nottingham Forest':
    case 'N. Forest':
    case 'Nottingham':
    case 'Nott.':
      return 'Nottingham Forest';
    case 'Sunderland':
    case 'Sunderland AFC':
      return 'Sunderland';
    case 'Tottenham Hotspur':
    case 'Tottenham':
      return 'Tottenham';
    case 'West Ham United':
    case 'West Ham':
      return 'West Ham';
    case 'Wolverhampton Wanderers':
    case 'Wolverhampton':
    case 'Wolves':
      return 'Wolverhampton';
  }
  // La Liga
  switch (team_alias) {
    case 'Ath. Bilbao':
    case 'Bilbao':
    case 'Athletic':
    case 'Athletic Club':
    case 'Athletic Club Bilbao':
      return 'Athletic Club Bilbao';
    case 'Atlético de Madrid':
    case 'Atl. Madrid':
    case 'Atlético':
    case 'Atleti':
      return 'Atlético de Madrid';
    case 'Betis':
    case 'Real Betis':
      return 'Real Betis';
    case 'Celta de Vigo':
    case 'Celta':
      return 'Celta';
    case 'Barcelona':
    case 'Barca':
    case 'Barça':
      return 'Barcelona';
    case 'RCD Espanyol':
    case 'R.C.D. Espanyol':
    case 'Espanyol':
      return 'Espanyol';
    case 'RCD Mallorca':
    case 'R.C.D. Mallorca':
    case 'Mallorca':
      return 'Mallorca';
    case 'Real Madrid':
    case 'R. Madrid':
      return 'Real Madrid';
    case 'Real Sociedad':
    case 'R. Sociedad':
      return 'Real Sociedad';
    case 'U.D. Las Palmas':
    case 'U.D. Las Palmas':
    case 'Las Palmas':
      return 'Las Palmas';
  }
  // Serie A
  switch (team_alias) {
    case 'Cagliari Calcio':
    case 'Cagliari':
      return 'Cagliari';
    case 'Hellas Verona':
    case 'Verona':
      return 'Verona';
    case 'Inter':
    case 'Inter Milan':
      return 'Inter';
    case 'Parma Calcio 1913':
    case 'Parma':
      return 'Parma';
    case 'Udinese Calcio':
    case 'Udinese':
      return 'Udinese';
  }
  // Liga Portugal
  switch (team_alias) {
    case 'AVS Futebol SAD':
    case 'AVS':
      return 'AVS';
    case 'Estrela da Amadora':
    case 'Estrela Amadora':
      return 'Estrela Amadora';
    case 'Gil Vicente':
    case 'Vicente':
      return 'Vicente';
    case 'Sporting CP':
    case 'Sporting':
      return 'Sporting';
  }
  // Ligue 1
  switch (team_alias) {
    case 'Monaco':
    case 'Mónaco':
      return 'Monaco';
    case 'Saint-Étienne':
    case 'Saint Etienne':
      return 'Saint Etienne';
    case 'Le Havre':
    case 'Havre':
      return 'Havre';
    case 'Olympique Lyon':
    case 'Lille':
    case 'LOSC Lille':
      return 'Lille';
    case 'Lyon':
      return 'Lyon';
    case 'Olympique de Marsella':
    case 'Olympique Marseille':
    case 'O. Marsella':
    case 'Marseille':
      return 'Olympique de Marsella';
    case 'Paris Saint-Germain':
    case 'PSG':
      return 'PSG';
    case 'Racing de Estrasburgo':
    case 'Estrasburgo':
    case 'Strasbourg':
      return 'Racing de Estrasburgo';
    case 'Stade Reims':
    case 'Reims':
      return 'Reims';
    case 'Stade Rennais':
    case 'Rennais':
      return 'Rennais';
  }
  // Bundesliga
  switch (team_alias) {
    case 'FC Union Berlin':
    case 'FC Unión Berlín':
    case 'Union Berlin':
    case 'Unión Berlín':
    case 'U. Berlin':
      return 'Unión Berlín';
    case 'FSV Mainz 05':
    case 'Mainz 05':
    case 'Mainz':
      return 'Mainz';
    case 'Bayer Leverkusen':
    case 'B. Leverkusen':
    case 'B Leverkusen':
      return 'Bayer Leverkusen';
    case 'Bayern Munich':
    case 'B. Munich':
    case 'Bayern':
      return 'Bayern';
    case 'Borussia Dortmund':
    case 'B. Dortmund':
    case 'Dortmund':
      return 'Dortmund';
    case 'Borussia Mönchengladbach':
    case 'Mönchengladbach':
      return 'Mönchengladbach';
    case 'Eintracht Frankfurt':
    case 'E. Frankfurt':
    case 'Frankfurt':
      return 'Frankfurt';
    case 'Holstein Kiel':
    case 'KSV Holstein':
      return 'Holstein Kiel';
    case 'RB Leipzig':
    case 'Leipzig':
      return 'Leipzig';
    case 'Wolfsburgo':
    case 'Wolfsburg':
      return 'Wolfsburg';
    case 'Werder Bremen':
    case 'W. Bremen':
      return 'Werder Bremen';
  }
  // Primera División de Argentina
  switch (team_alias) {
    case 'Argentinos Juniors':
    case 'Argentinos Jr.s':
    case 'Argentinos Jrs.':
    case 'Argentinos':
      return 'Argentinos Juniors';
    case 'Atlético Tucumán':
    case 'Atl. Tucumán':
    case 'Atletico Tucuman':
      return 'Atlético Tucumán';
    case 'Barracas Central':
    case 'Barracas':
      return 'Barracas Central';
    case 'Central Córdoba':
    case 'Central Cordoba':
    case 'C. Cordoba':
    case 'C. Córdoba':
      return 'Central Córdoba';
    case 'Defensa y Justicia':
    case 'DyJ':
      return 'Defensa y Justicia';
    case 'Estudiantes':
    case 'Estudiantes de La Plata':
      return 'Estudiantes de La Plata';
    case 'Gimnasia':
    case 'Gimnasia y Esgrima':
    case 'Gimnasia y Esgrima La Plata':
      return 'Gimnasia y Esgrima La Plata';
    case 'Huracan':
    case 'Huracán':
      return 'Huracán';
    case 'Independiente Rivadavia':
    case 'I. Rivadavia':
    case 'I Rivadavia':
    case 'Ind. Rivadavia':
    case 'Independiente Riv.':
    case 'Ind. Riv.':
      return 'Independiente Rivadavia';
    case "Newell's Old Boys":
    case 'Newells Old Boys':
    case "Newell's":
    case 'Newells':
      return "Newell's Old Boys";
    case 'Deportivo Riestra':
    case 'Dep. Riestra':
    case 'Riestra':
      return 'Deportivo Riestra';
    case 'River Plate':
    case 'River':
      return 'River Plate';
    case 'Rosario Central':
    case 'R. Central':
    case 'Central':
      return 'Rosario Central';
    case 'San Lorenzo':
    case 'CASLA':
      return 'San Lorenzo';
    case 'San Martín':
    case 'San Martin':
    case 'San Martín S. J.':
    case 'San Martin S. J.':
    case 'San Martin SJ':
    case 'San Martín SJ':
      return 'San Martín';
    case 'Unión':
    case 'Union':
      return 'Unión';
    case 'Vélez':
    case 'Velez':
      return 'Vélez';
  }

  // Couldn't find teams name, return passed alias
  return team_alias;
}
