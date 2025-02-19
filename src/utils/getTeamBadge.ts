export function getTeamBadge(team: string): string {
  return chrome.runtime.getURL(getTeamBadgeLocalPath(team));
}

function getTeamBadgeLocalPath(team: string): string {
  // Premier
  switch (team) {
    case 'Aston':
    case 'Aston Villa':
    case 'Villa':
      return 'football-logos/logos/England - Premier League/Aston Villa.png';
    case 'Bournemouth':
      return 'football-logos/logos/England - Premier League/AFC Bournemouth.png';
    case 'Arsenal':
      return 'football-logos/logos/England - Premier League/Arsenal FC.png';
    case 'Brentford':
      return 'football-logos/logos/England - Premier League/Brentford FC.png';
    case 'Brighton':
      return 'football-logos/logos/England - Premier League/Brighton & Hove Albion.png';
    case 'Chelsea':
      return 'football-logos/logos/England - Premier League/Chelsea FC.png';
    case 'Crystal Palace':
    case 'C. Palace':
      return 'football-logos/logos/England - Premier League/Crystal Palace.png';
    case 'Everton':
      return 'football-logos/logos/England - Premier League/Everton FC.png';
    case 'Fulham':
      return 'football-logos/logos/England - Premier League/Fulham FC.png';
    case 'Ipswich Town':
    case 'Ipswich':
      return 'football-logos/logos/England - Premier League/Ipswich Town.png';
    case 'Leicester City':
    case 'Leicester':
      return 'football-logos/logos/England - Premier League/Leicester City.png';
    case 'Liverpool':
      return 'football-logos/logos/England - Premier League/Liverpool FC.png';
    case 'Manchester City':
    case 'Man. City':
      return 'football-logos/logos/England - Premier League/Manchester City.png';
    case 'Manchester United':
    case 'Manchester Utd':
    case 'Man. Utd':
    case 'M. Utd.':
      return 'football-logos/logos/England - Premier League/Manchester United.png';
    case 'Newcastle United':
    case 'Newcastle':
      return 'football-logos/logos/England - Premier League/Newcastle United.png';
    case 'Nottingham Forest':
    case 'Nott.':
      return 'football-logos/logos/England - Premier League/Nottingham Forest.png';
    case 'Southampton':
      return 'football-logos/logos/England - Premier League/Southampton FC.png';
    case 'Tottenham Hotspur':
    case 'Tottenham':
      return 'football-logos/logos/England - Premier League/Tottenham Hotspur.png';
    case 'West Ham United':
    case 'West Ham':
      return 'football-logos/logos/England - Premier League/West Ham United.png';
    case 'Wolverhampton Wanderers':
    case 'Wolverhampton':
    case 'Wolves':
      return 'football-logos/logos/England - Premier League/Wolverhampton Wanderers.png';
  }
  // La Liga
  switch (team) {
    case 'Bilbao':
    case 'Athletic':
      return 'football-logos/logos/Spain - LaLiga/Athletic Bilbao.png';
    case 'Atlético de Madrid':
    case 'Atl. Madrid':
    case 'Atlético':
      return 'football-logos/logos/Spain - LaLiga/Atlético de Madrid.png';
    case 'Osasuna':
      return 'football-logos/logos/Spain - LaLiga/CA Osasuna.png';
    case 'Leganés':
      return 'football-logos/logos/Spain - LaLiga/CD Leganés.png';
    case 'Celta de Vigo':
    case 'Celta':
      return 'football-logos/logos/Spain - LaLiga/Celta de Vigo.png';
    case 'Alavés':
      return 'football-logos/logos/Spain - LaLiga/Deportivo Alavés.png';
    case 'Barcelona':
    case 'Barca':
      return 'football-logos/logos/Spain - LaLiga/FC Barcelona.png';
    case 'Getafe':
      return 'football-logos/logos/Spain - LaLiga/Getafe CF.png';
    case 'Girona':
      return 'football-logos/logos/Spain - LaLiga/Girona FC.png';
    case 'Rayo Vallecano':
      return 'football-logos/logos/Spain - LaLiga/Rayo Vallecano.png';
    case 'RCD Espanyol':
    case 'R.C.D. Espanyol':
    case 'Espanyol':
      return 'football-logos/logos/Spain - LaLiga/RCD Espanyol Barcelona.png';
    case 'RCD Mallorca':
    case 'R.C.D. Mallorca':
    case 'Mallorca':
      return 'football-logos/logos/Spain - LaLiga/RCD Mallorca.png';
    case 'Betis':
      return 'football-logos/logos/Spain - LaLiga/Real Betis Balompié.png';
    case 'Real Madrid':
    case 'R. Madrid':
      return 'football-logos/logos/Spain - LaLiga/Real Madrid.png';
    case 'Real Sociedad':
      return 'football-logos/logos/Spain - LaLiga/Real Sociedad.png';
    case 'Valladolid':
      return 'football-logos/logos/Spain - LaLiga/Real Valladolid CF.png';
    case 'Sevilla':
      return 'football-logos/logos/Spain - LaLiga/Sevilla FC.png';
    case 'U.D. Las Palmas':
    case 'U.D. Las Palmas':
    case 'Las Palmas':
      return 'football-logos/logos/Spain - LaLiga/UD Las Palmas.png';
    case 'Valencia':
      return 'football-logos/logos/Spain - LaLiga/Valencia CF.png';
    case 'Villarreal':
      return 'football-logos/logos/Spain - LaLiga/Villarreal CF.png';
  }
  // Serie A
  switch (team) {
    case 'Milan':
      return 'football-logos/logos/Italy - Serie A/AC Milan.png';
    case 'Monza':
      return 'football-logos/logos/Italy - Serie A/AC Monza.png';
    case 'Fiorentina':
      return 'football-logos/logos/Italy - Serie A/ACF Fiorentina.png';
    case 'Roma':
      return 'football-logos/logos/Italy - Serie A/AS Roma.png';
    case 'Atalanta':
      return 'football-logos/logos/Italy - Serie A/Atalanta BC.png';
    case 'Bologna':
      return 'football-logos/logos/Italy - Serie A/Bologna FC 1909.png';
    case 'Cagliari Calcio':
    case 'Cagliari':
      return 'football-logos/logos/Italy - Serie A/Cagliari Calcio.png';
    case 'Como':
      return 'football-logos/logos/Italy - Serie A/Como 1907.png';
    case 'Empoli':
      return 'football-logos/logos/Italy - Serie A/FC Empoli.png';
    case 'Genoa':
      return 'football-logos/logos/Italy - Serie A/Genoa CFC.png';
    case 'Hellas Verona':
    case 'Verona':
      return 'football-logos/logos/Italy - Serie A/Hellas Verona.png';
    case 'Inter':
    case 'Inter Milan':
      return 'football-logos/logos/Italy - Serie A/Inter Milan.png';
    case 'Juventus':
      return 'football-logos/logos/Italy - Serie A/Juventus FC.png';
    case 'Parma Calcio 1913':
    case 'Parma':
      return 'football-logos/logos/Italy - Serie A/Parma Calcio 1913.png';
    case 'Lazio':
      return 'football-logos/logos/Italy - Serie A/SS Lazio.png';
    case 'Napoli':
      return 'football-logos/logos/Italy - Serie A/SSC Napoli.png';
    case 'Torino':
      return 'football-logos/logos/Italy - Serie A/Torino FC.png';
    case 'Udinese Calcio':
    case 'Udinese':
      return 'football-logos/logos/Italy - Serie A/Udinese Calcio.png';
    case 'Lecce':
      return 'football-logos/logos/Italy - Serie A/US Lecce.png';
    case 'Venezia':
      return 'football-logos/logos/Italy - Serie A/Venezia FC.png';
  }

  // Default teams logo
  return 'images/ball.png';
}
