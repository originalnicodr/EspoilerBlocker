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
  // Liga Portugal
  switch(team) {
    case "AVS Futebol SAD":
    case "AVS":
      return "football-logos/logos/Portugal - Liga Portugal/Avs Futebol.png";
    case "Boavista":
      return "football-logos/logos/Portugal - Liga Portugal/Boavista FC.png";
    case "Casa Pia":
      return "football-logos/logos/Portugal - Liga Portugal/Casa Pia AC.png";
    case "Nacional":
      return "football-logos/logos/Portugal - Liga Portugal/CD Nacional.png";
    case "Santa Clara":
      return "football-logos/logos/Portugal - Liga Portugal/CD Santa Clara.png";
    case "Estrela da Amadora":
    case "Estrela Amadora":
      return "football-logos/logos/Portugal - Liga Portugal/CF Estrela Amadora.png";
    case "Arouca":
      return "football-logos/logos/Portugal - Liga Portugal/FC Arouca.png";
    case "Famalicão":
      return "football-logos/logos/Portugal - Liga Portugal/FC Famalicão.png";
    case "Porto":
      return "football-logos/logos/Portugal - Liga Portugal/FC Porto.png";
    case "Estoril Praia":
      return "football-logos/logos/Portugal - Liga Portugal/GD Estoril Praia.png";
    case "Gil Vicente":
    case "Vicente":
      return "football-logos/logos/Portugal - Liga Portugal/Gil Vicente FC.png";
    case "Moreirense":
      return "football-logos/logos/Portugal - Liga Portugal/Moreirense FC.png";
    case "Rio Ave":
      return "football-logos/logos/Portugal - Liga Portugal/Rio Ave FC.png";
    case "Braga":
      return "football-logos/logos/Portugal - Liga Portugal/SC Braga.png";
    case "Farense":
      return "football-logos/logos/Portugal - Liga Portugal/SC Farense.png";
    case "Benfica":
      return "football-logos/logos/Portugal - Liga Portugal/SL Benfica.png";
    case "Sporting CP":
    case "Sporting":
      return "football-logos/logos/Portugal - Liga Portugal/Sporting CP.png";
    case "Vitória Guimarães":
      return "football-logos/logos/Portugal - Liga Portugal/Vitória Guimarães SC.png";
  }
  // Ligue 1
  switch (team) {
    case "Auxerre":
      return "football-logos/logos/France - Ligue 1/AJ Auxerre.png";
    case "Angers":
      return "football-logos/logos/France - Ligue 1/Angers SCO.png";
    case "Monaco":
    case "Mónaco":
      return "football-logos/logos/France - Ligue 1/AS Monaco.png";
    case "Saint-Étienne":
    case "Saint Etienne":
      return "football-logos/logos/France - Ligue 1/AS Saint-Étienne.png";
    case "Nantes":
      return "football-logos/logos/France - Ligue 1/FC Nantes.png";
    case "Toulouse":
      return "football-logos/logos/France - Ligue 1/FC Toulouse.png";
    case "Le Havre":
    case "Havre":
      return "football-logos/logos/France - Ligue 1/Le Havre AC.png";
    case "LOSC":
      return "football-logos/logos/France - Ligue 1/LOSC Lille.png";
    case "Montpellier":
      return "football-logos/logos/France - Ligue 1/Montpellier HSC.png";
    case "Niza":
      return "football-logos/logos/France - Ligue 1/OGC Nice.png";
    case "Olympique Lyon":
    case "Lyon":
      return "football-logos/logos/France - Ligue 1/Olympique Lyon.png";
    case "Olympique Marseille":
    case "Marseille":
      return "football-logos/logos/France - Ligue 1/Olympique Marseille.png";
    case "Paris Saint-Germain":
    case "PSG":
      return "football-logos/logos/France - Ligue 1/Paris Saint-Germain.png";
    case "Lens":
      return "football-logos/logos/France - Ligue 1/RC Lens.png";
    case "Racing de Estrasburgo":
      return "football-logos/logos/France - Ligue 1/RC Strasbourg Alsace.png";
    case "Stade Brestois":
      return "football-logos/logos/France - Ligue 1/Stade Brestois 29.png";
    case "Stade Reims":
    case "Reims":
      return "football-logos/logos/France - Ligue 1/Stade Reims.png";
    case "Stade Rennais":
    case "Rennais":
      return "football-logos/logos/France - Ligue 1/Stade Rennais FC.png";
  }
  // Bundesliga
  switch (team) {
    case "Heidenheim":
      return "football-logos/logos/Germany - Bundesliga/1.FC Heidenheim 1846.png";
    case "FC Union Berlin":
    case "FC Union Berlin":
      return "football-logos/logos/Germany - Bundesliga/1.FC Union Berlin.png";
    case "FSV Mainz 05":
    case "Mainz 05":
    case "Mainz":
      return "football-logos/logos/Germany - Bundesliga/1.FSV Mainz 05.png";
    case "Bayer Leverkusen":
    case "B. Leverkusen":
      return "football-logos/logos/Germany - Bundesliga/Bayer 04 Leverkusen.png";
    case "Bayern Munich":
    case "B. Munich":
      return "football-logos/logos/Germany - Bundesliga/Bayern Munich.png";
    case "Borussia Dortmund":
    case "B. Dortmund":
    case "Dortmund":
      return "football-logos/logos/Germany - Bundesliga/Borussia Dortmund.png";
    case "Borussia Mönchengladbach":
    case "Mönchengladbach":
      return "football-logos/logos/Germany - Bundesliga/Borussia Mönchengladbach.png";
    case "Eintracht Frankfurt":
    case "Frankfurt":
      return "football-logos/logos/Germany - Bundesliga/Eintracht Frankfurt.png";
    case "Augsburg":
      return "football-logos/logos/Germany - Bundesliga/FC Augsburg.png";
    case "St. Pauli":
      return "football-logos/logos/Germany - Bundesliga/FC St. Pauli.png";
    case "Holstein Kiel":
    case "KSV Holstein": 
      return "football-logos/logos/Germany - Bundesliga/Holstein Kiel.png";
    case "RB Leipzig":
    case "Leipzig":
      return "football-logos/logos/Germany - Bundesliga/RB Leipzig.png";
    case "Freiburg":
      return "football-logos/logos/Germany - Bundesliga/SC Freiburg.png";
    case "Werder Bremen":
      return "football-logos/logos/Germany - Bundesliga/SV Werder Bremen.png";
    case "Hoffenheim":
      return "football-logos/logos/Germany - Bundesliga/TSG 1899 Hoffenheim.png";
    case "Stuttgart":
      return "football-logos/logos/Germany - Bundesliga/VfB Stuttgart.png";
    case "Bochum":
      return "football-logos/logos/Germany - Bundesliga/VfL Bochum.png";
    case "Wolfsburg":
      return "football-logos/logos/Germany - Bundesliga/VfL Wolfsburg.png";
  }
  // Primera División de Argentina
  switch (team) {
    case "Aldosivi":
      return "images/Argentina - Primera Division/aldosivi.png ";
    case "Argentinos":
      return "images/Argentina - Primera Division/argentinos.png ";
    case "Atlético Tucumán":
    case "Atl. Tucumán":
    case "Atletico Tucuman":
      return "images/Argentina - Primera Division/atleticotucuman.png ";
    case "Banfield":
      return "images/Argentina - Primera Division/banfield.png ";
    case "Barracas Central":
    case "Barracas":
      return "images/Argentina - Primera Division/barracas.png ";
    case "Belgrano":
      return "images/Argentina - Primera Division/belgrano.png ";
    case "Boca":
      return "images/Argentina - Primera Division/boca.png ";
    case "Central Córdoba":
    case "Central Cordoba":
      return "images/Argentina - Primera Division/centralcordoba.png ";
    case "Defensa y Justicia":
      return "images/Argentina - Primera Division/defensa.png ";
    case "Estudiantes":
    case "Estudiantes de La Plata":
      return "images/Argentina - Primera Division/estudiantes.png ";
    case "Gimnasia":
    case "Gimnasia y Esgrima":
    case "Gimnasia y Esgrima La Plata":
      return "images/Argentina - Primera Division/gimnasia.png ";
    case "Godoy Cruz":
      return "images/Argentina - Primera Division/godoycruz.png ";
    case "Huracan":
    case "Huracán":
      return "images/Argentina - Primera Division/huracan.png ";
    case "Independiente":
      return "images/Argentina - Primera Division/independiente.png ";
    case "Independiente Rivadavia":
    case "Ind. Rivadavia":
    case "Independiente Riv.":
    case "Ind. Riv.":
      return "images/Argentina - Primera Division/independienteriv.png ";
    case "Instituto":
      return "images/Argentina - Primera Division/instituto.png ";
    case "Lanús":
      return "images/Argentina - Primera Division/lanus.png ";
    case "Newell's Old Boys":
    case "Newells Old Boys":
    case "Newell's":
    case "Newells":
      return "images/Argentina - Primera Division/newells.png ";
    case "Platense":
      return "images/Argentina - Primera Division/platense.png ";
    case "Racing":
      return "images/Argentina - Primera Division/racing.png ";
    case "Deportivo Riestra":
    case "Riestra":
      return "images/Argentina - Primera Division/riestra.png ";
    case "River Plate":
    case "River":
      return "images/Argentina - Primera Division/river.png ";
    case "Rosario Central":
    case "Central":
      return "images/Argentina - Primera Division/rosariocentral.png ";
    case "San Lorenzo":
      return "images/Argentina - Primera Division/sanlorenzo.png ";
    case "San Martín":
    case "San Martin":
    case "San Martín S. J.":
    case "San Martin S. J.":
      return "images/Argentina - Primera Division/sanmartinsj.png ";
    case "Sarmiento":
      return "images/Argentina - Primera Division/sarmiento.png ";
    case "Talleres":
      return "images/Argentina - Primera Division/talleres.png ";
    case "Tigre":
      return "images/Argentina - Primera Division/tigre.png ";
    case "Unión":
    case "Union":
      return "images/Argentina - Primera Division/union.png ";
    case "Vélez":
    case "Velez":
      return "images/Argentina - Primera Division/velez.png";
  }

  // Default teams logo
  return 'images/ball.png';
}
