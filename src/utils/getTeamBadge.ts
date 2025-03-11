export function getTeamBadge(team: string): string {
  return chrome.runtime.getURL(getTeamBadgeLocalPath(team));
}

function getTeamBadgeLocalPath(team: string): string {
  // Premier
  switch (team) {
    case 'Aston Villa':
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
      return 'football-logos/logos/England - Premier League/Crystal Palace.png';
    case 'Everton':
      return 'football-logos/logos/England - Premier League/Everton FC.png';
    case 'Fulham':
      return 'football-logos/logos/England - Premier League/Fulham FC.png';
    case 'Ipswich':
      return 'football-logos/logos/England - Premier League/Ipswich Town.png';
    case 'Leicester':
      return 'football-logos/logos/England - Premier League/Leicester City.png';
    case 'Liverpool':
      return 'football-logos/logos/England - Premier League/Liverpool FC.png';
    case 'Manchester City':
      return 'football-logos/logos/England - Premier League/Manchester City.png';
    case 'Manchester United':
      return 'football-logos/logos/England - Premier League/Manchester United.png';
    case 'Newcastle':
      return 'football-logos/logos/England - Premier League/Newcastle United.png';
    case 'Nottingham Forest':
      return 'football-logos/logos/England - Premier League/Nottingham Forest.png';
    case 'Southampton':
      return 'football-logos/logos/England - Premier League/Southampton FC.png';
    case 'Tottenham':
      return 'football-logos/logos/England - Premier League/Tottenham Hotspur.png';
    case 'West Ham':
      return 'football-logos/logos/England - Premier League/West Ham United.png';
    case 'Wolverhampton':
      return 'football-logos/logos/England - Premier League/Wolverhampton Wanderers.png';
  }
  // La Liga
  switch (team) {
    case 'Athletic Club Bilbao':
      return 'football-logos/logos/Spain - LaLiga/Athletic Bilbao.png';
    case 'Atlético de Madrid':
      return 'football-logos/logos/Spain - LaLiga/Atlético de Madrid.png';
    case 'Osasuna':
      return 'football-logos/logos/Spain - LaLiga/CA Osasuna.png';
    case 'Leganés':
      return 'football-logos/logos/Spain - LaLiga/CD Leganés.png';
    case 'Celta':
      return 'football-logos/logos/Spain - LaLiga/Celta de Vigo.png';
    case 'Alavés':
      return 'football-logos/logos/Spain - LaLiga/Deportivo Alavés.png';
    case 'Barcelona':
      return 'football-logos/logos/Spain - LaLiga/FC Barcelona.png';
    case 'Getafe':
      return 'football-logos/logos/Spain - LaLiga/Getafe CF.png';
    case 'Girona':
      return 'football-logos/logos/Spain - LaLiga/Girona FC.png';
    case 'Rayo Vallecano':
      return 'football-logos/logos/Spain - LaLiga/Rayo Vallecano.png';
    case 'Espanyol':
      return 'football-logos/logos/Spain - LaLiga/RCD Espanyol Barcelona.png';
    case 'Mallorca':
      return 'football-logos/logos/Spain - LaLiga/RCD Mallorca.png';
    case 'Betis':
      return 'football-logos/logos/Spain - LaLiga/Real Betis Balompié.png';
    case 'Real Madrid':
      return 'football-logos/logos/Spain - LaLiga/Real Madrid.png';
    case 'Real Sociedad':
      return 'football-logos/logos/Spain - LaLiga/Real Sociedad.png';
    case 'Valladolid':
      return 'football-logos/logos/Spain - LaLiga/Real Valladolid CF.png';
    case 'Sevilla':
      return 'football-logos/logos/Spain - LaLiga/Sevilla FC.png';
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
    case 'Cagliari':
      return 'football-logos/logos/Italy - Serie A/Cagliari Calcio.png';
    case 'Como':
      return 'football-logos/logos/Italy - Serie A/Como 1907.png';
    case 'Empoli':
      return 'football-logos/logos/Italy - Serie A/FC Empoli.png';
    case 'Genoa':
      return 'football-logos/logos/Italy - Serie A/Genoa CFC.png';
    case 'Verona':
      return 'football-logos/logos/Italy - Serie A/Hellas Verona.png';
    case 'Inter':
      return 'football-logos/logos/Italy - Serie A/Inter Milan.png';
    case 'Juventus':
      return 'football-logos/logos/Italy - Serie A/Juventus FC.png';
    case 'Parma':
      return 'football-logos/logos/Italy - Serie A/Parma Calcio 1913.png';
    case 'Lazio':
      return 'football-logos/logos/Italy - Serie A/SS Lazio.png';
    case 'Napoli':
      return 'football-logos/logos/Italy - Serie A/SSC Napoli.png';
    case 'Torino':
      return 'football-logos/logos/Italy - Serie A/Torino FC.png';
    case 'Udinese':
      return 'football-logos/logos/Italy - Serie A/Udinese Calcio.png';
    case 'Lecce':
      return 'football-logos/logos/Italy - Serie A/US Lecce.png';
    case 'Venezia':
      return 'football-logos/logos/Italy - Serie A/Venezia FC.png';
  }
  // Liga Portugal
  switch(team) {
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
    case "Mónaco":
      return "football-logos/logos/France - Ligue 1/AS Monaco.png";
    case "Saint Etienne":
      return "football-logos/logos/France - Ligue 1/AS Saint-Étienne.png";
    case "Nantes":
      return "football-logos/logos/France - Ligue 1/FC Nantes.png";
    case "Toulouse":
      return "football-logos/logos/France - Ligue 1/FC Toulouse.png";
    case "Havre":
      return "football-logos/logos/France - Ligue 1/Le Havre AC.png";
    case "LOSC":
      return "football-logos/logos/France - Ligue 1/LOSC Lille.png";
    case "Montpellier":
      return "football-logos/logos/France - Ligue 1/Montpellier HSC.png";
    case "Niza":
      return "football-logos/logos/France - Ligue 1/OGC Nice.png";
    case "Lyon":
      return "football-logos/logos/France - Ligue 1/Olympique Lyon.png";
    case "Marseille":
      return "football-logos/logos/France - Ligue 1/Olympique Marseille.png";
    case "PSG":
      return "football-logos/logos/France - Ligue 1/Paris Saint-Germain.png";
    case "Lens":
      return "football-logos/logos/France - Ligue 1/RC Lens.png";
    case "Racing de Estrasburgo":
      return "football-logos/logos/France - Ligue 1/RC Strasbourg Alsace.png";
    case "Stade Brestois":
      return "football-logos/logos/France - Ligue 1/Stade Brestois 29.png";
    case "Reims":
      return "football-logos/logos/France - Ligue 1/Stade Reims.png";
    case "Rennais":
      return "football-logos/logos/France - Ligue 1/Stade Rennais FC.png";
  }
  // Bundesliga
  switch (team) {
    case "Heidenheim":
      return "football-logos/logos/Germany - Bundesliga/1.FC Heidenheim 1846.png";
    case "Unión Berlín":
      return "football-logos/logos/Germany - Bundesliga/1.FC Union Berlin.png";
    case "Mainz":
      return "football-logos/logos/Germany - Bundesliga/1.FSV Mainz 05.png";
    case "Bayer Leverkusen":
      return "football-logos/logos/Germany - Bundesliga/Bayer 04 Leverkusen.png";
    case "Bayern":
      return "football-logos/logos/Germany - Bundesliga/Bayern Munich.png";
    case "Dortmund":
      return "football-logos/logos/Germany - Bundesliga/Borussia Dortmund.png";
    case "Mönchengladbach":
      return "football-logos/logos/Germany - Bundesliga/Borussia Mönchengladbach.png";
    case "Frankfurt":
      return "football-logos/logos/Germany - Bundesliga/Eintracht Frankfurt.png";
    case "Augsburg":
      return "football-logos/logos/Germany - Bundesliga/FC Augsburg.png";
    case "St. Pauli":
      return "football-logos/logos/Germany - Bundesliga/FC St. Pauli.png";
    case "Holstein Kiel":
      return "football-logos/logos/Germany - Bundesliga/Holstein Kiel.png";
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
      return "images/Argentina - Primera Division/atleticotucuman.png ";
    case "Banfield":
      return "images/Argentina - Primera Division/banfield.png ";
    case "Barracas Central":
      return "images/Argentina - Primera Division/barracas.png ";
    case "Belgrano":
      return "images/Argentina - Primera Division/belgrano.png ";
    case "Boca":
      return "images/Argentina - Primera Division/boca.png ";
    case "Central Córdoba":
      return "images/Argentina - Primera Division/centralcordoba.png ";
    case "Defensa y Justicia":
      return "images/Argentina - Primera Division/defensa.png ";
    case "Estudiantes de La Plata":
      return "images/Argentina - Primera Division/estudiantes.png ";
    case "Gimnasia y Esgrima La Plata":
      return "images/Argentina - Primera Division/gimnasia.png ";
    case "Godoy Cruz":
      return "images/Argentina - Primera Division/godoycruz.png ";
    case "Huracán":
      return "images/Argentina - Primera Division/huracan.png ";
    case "Independiente":
      return "images/Argentina - Primera Division/independiente.png ";
    case "Independiente Rivadavia":
      return "images/Argentina - Primera Division/independienteriv.png ";
    case "Instituto":
      return "images/Argentina - Primera Division/instituto.png ";
    case "Lanús":
      return "images/Argentina - Primera Division/lanus.png ";
    case "Newell's Old Boys":
      return "images/Argentina - Primera Division/newells.png ";
    case "Platense":
      return "images/Argentina - Primera Division/platense.png ";
    case "Racing":
      return "images/Argentina - Primera Division/racing.png ";
    case "Deportivo Riestra":
      return "images/Argentina - Primera Division/riestra.png ";
    case "River Plate":
      return "images/Argentina - Primera Division/river.png ";
    case "Rosario Central":
      return "images/Argentina - Primera Division/rosariocentral.png ";
    case "San Lorenzo":
      return "images/Argentina - Primera Division/sanlorenzo.png ";
    case "San Martín":
      return "images/Argentina - Primera Division/sanmartinsj.png ";
    case "Sarmiento":
      return "images/Argentina - Primera Division/sarmiento.png ";
    case "Talleres":
      return "images/Argentina - Primera Division/talleres.png ";
    case "Tigre":
      return "images/Argentina - Primera Division/tigre.png ";
    case "Unión":
      return "images/Argentina - Primera Division/union.png ";
    case "Vélez":
      return "images/Argentina - Primera Division/velez.png";
  }

  // Default teams logo
  return 'images/ball.png';
}
