import { VideoHighlightType } from './getHighlightType';

export function getTeamBadge(team: string, highlight_type: VideoHighlightType): string {
  let badge_url: string = getTeamBadgeURL(team, highlight_type);
  if (badge_url) {
    badge_url = chrome.runtime.getURL(badge_url);
  } else {
    badge_url = getCountryFlagURL(team);
  }

  if (!badge_url) {
    // Default teams logo
    if (highlight_type == VideoHighlightType.Basketball) {
      badge_url = chrome.runtime.getURL('images/basketball-ball.png');
    }
    badge_url = chrome.runtime.getURL('images/football-ball.png');
  }
  return badge_url;
}

function getTeamBadgeURL(team: string, highlight_type: VideoHighlightType): string | null {
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
    case 'Burnley':
      return 'images/England - Premier League (missing)/burnley.png';
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
    case 'Leeds United':
      return 'images/England - Premier League (missing)/leeds.png';
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
    case 'Sunderland':
      return 'images/England - Premier League (missing)/sunderland.png';
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
    case 'Elche':
      return 'football-logos/history/2021-22/Spain - LaLiga/Elche CF.png';
    case 'Levante':
      return 'football-logos/history/2021-22/Spain - LaLiga/Levante UD.png';
    case 'Mallorca':
      return 'football-logos/logos/Spain - LaLiga/RCD Mallorca.png';
    case 'Real Betis':
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
    case 'Cremonese':
      return 'football-logos/history/2022-23/Italy - Serie A/US Cremonese.png';
    case 'Venezia':
      return 'football-logos/logos/Italy - Serie A/Venezia FC.png';
  }
  // Liga Portugal
  switch (team) {
    case 'AVS':
      return 'football-logos/logos/Portugal - Liga Portugal/Avs Futebol.png';
    case 'Boavista':
      return 'football-logos/logos/Portugal - Liga Portugal/Boavista FC.png';
    case 'Casa Pia':
      return 'football-logos/logos/Portugal - Liga Portugal/Casa Pia AC.png';
    case 'Nacional':
      return 'football-logos/logos/Portugal - Liga Portugal/CD Nacional.png';
    case 'Santa Clara':
      return 'football-logos/logos/Portugal - Liga Portugal/CD Santa Clara.png';
    case 'Estrela Amadora':
      return 'football-logos/logos/Portugal - Liga Portugal/CF Estrela Amadora.png';
    case 'Arouca':
      return 'football-logos/logos/Portugal - Liga Portugal/FC Arouca.png';
    case 'Famalicão':
      return 'football-logos/logos/Portugal - Liga Portugal/FC Famalicão.png';
    case 'Porto':
      return 'football-logos/logos/Portugal - Liga Portugal/FC Porto.png';
    case 'Estoril Praia':
      return 'football-logos/logos/Portugal - Liga Portugal/GD Estoril Praia.png';
    case 'Vicente':
      return 'football-logos/logos/Portugal - Liga Portugal/Gil Vicente FC.png';
    case 'Moreirense':
      return 'football-logos/logos/Portugal - Liga Portugal/Moreirense FC.png';
    case 'Rio Ave':
      return 'football-logos/logos/Portugal - Liga Portugal/Rio Ave FC.png';
    case 'Braga':
      return 'football-logos/logos/Portugal - Liga Portugal/SC Braga.png';
    case 'Farense':
      return 'football-logos/logos/Portugal - Liga Portugal/SC Farense.png';
    case 'Benfica':
      return 'football-logos/logos/Portugal - Liga Portugal/SL Benfica.png';
    case 'Sporting':
      return 'football-logos/logos/Portugal - Liga Portugal/Sporting CP.png';
    case 'Vitória Guimarães':
      return 'football-logos/logos/Portugal - Liga Portugal/Vitória Guimarães SC.png';
  }
  // Ligue 1
  switch (team) {
    case 'Auxerre':
      return 'football-logos/logos/France - Ligue 1/AJ Auxerre.png';
    case 'Angers':
      return 'football-logos/logos/France - Ligue 1/Angers SCO.png';
    case 'Monaco':
      return 'football-logos/logos/France - Ligue 1/AS Monaco.png';
    case 'Saint Etienne':
      return 'football-logos/logos/France - Ligue 1/AS Saint-Étienne.png';
    case 'Metz':
      return 'football-logos/history/2021-22/France - Ligue 1/FC Metz.png';
    case 'Nantes':
      return 'football-logos/logos/France - Ligue 1/FC Nantes.png';
    case 'Toulouse':
      return 'football-logos/logos/France - Ligue 1/FC Toulouse.png';
    case 'Havre':
      return 'football-logos/logos/France - Ligue 1/Le Havre AC.png';
    case 'Lille':
      return 'football-logos/logos/France - Ligue 1/LOSC Lille.png';
    case 'Lorient':
      return 'football-logos/history/2021-22/France - Ligue 1/FC Lorient.png';
    case 'Montpellier':
      return 'football-logos/logos/France - Ligue 1/Montpellier HSC.png';
    case 'Niza':
      return 'football-logos/logos/France - Ligue 1/OGC Nice.png';
    case 'Lyon':
      return 'football-logos/logos/France - Ligue 1/Olympique Lyon.png';
    case 'Olympique de Marsella':
      return 'football-logos/logos/France - Ligue 1/Olympique Marseille.png';
    case 'PSG':
      return 'football-logos/logos/France - Ligue 1/Paris Saint-Germain.png';
    case 'Lens':
      return 'football-logos/logos/France - Ligue 1/RC Lens.png';
    case 'Racing de Estrasburgo':
      return 'football-logos/logos/France - Ligue 1/RC Strasbourg Alsace.png';
    case 'Stade Brestois':
      return 'football-logos/logos/France - Ligue 1/Stade Brestois 29.png';
    case 'Reims':
      return 'football-logos/logos/France - Ligue 1/Stade Reims.png';
    case 'Rennais':
      return 'football-logos/logos/France - Ligue 1/Stade Rennais FC.png';
  }
  // Bundesliga
  switch (team) {
    case 'Heidenheim':
      return 'football-logos/logos/Germany - Bundesliga/1.FC Heidenheim 1846.png';
    case 'Unión Berlín':
      return 'football-logos/logos/Germany - Bundesliga/1.FC Union Berlin.png';
    case 'Mainz':
      return 'football-logos/logos/Germany - Bundesliga/1.FSV Mainz 05.png';
    case 'Bayer Leverkusen':
      return 'football-logos/logos/Germany - Bundesliga/Bayer 04 Leverkusen.png';
    case 'Bayern':
      return 'football-logos/logos/Germany - Bundesliga/Bayern Munich.png';
    case 'Dortmund':
      return 'football-logos/logos/Germany - Bundesliga/Borussia Dortmund.png';
    case 'Mönchengladbach':
      return 'football-logos/logos/Germany - Bundesliga/Borussia Mönchengladbach.png';
    case 'Frankfurt':
      return 'football-logos/logos/Germany - Bundesliga/Eintracht Frankfurt.png';
    case 'Augsburg':
      return 'football-logos/logos/Germany - Bundesliga/FC Augsburg.png';
    case 'St. Pauli':
      return 'football-logos/logos/Germany - Bundesliga/FC St. Pauli.png';
    case 'Holstein Kiel':
      return 'football-logos/logos/Germany - Bundesliga/Holstein Kiel.png';
    case 'Leipzig':
      return 'football-logos/logos/Germany - Bundesliga/RB Leipzig.png';
    case 'Freiburg':
      return 'football-logos/logos/Germany - Bundesliga/SC Freiburg.png';
    case 'Werder Bremen':
      return 'football-logos/logos/Germany - Bundesliga/SV Werder Bremen.png';
    case 'Hoffenheim':
      return 'football-logos/logos/Germany - Bundesliga/TSG 1899 Hoffenheim.png';
    case 'Stuttgart':
      return 'football-logos/logos/Germany - Bundesliga/VfB Stuttgart.png';
    case 'Bochum':
      return 'football-logos/logos/Germany - Bundesliga/VfL Bochum.png';
    case 'Wolfsburg':
      return 'football-logos/logos/Germany - Bundesliga/VfL Wolfsburg.png';
  }
  // Primera División de Argentina
  switch (team) {
    case 'Aldosivi':
      return 'images/Argentina - Primera Division/aldosivi.png';
    case 'Argentinos Juniors':
      return 'images/Argentina - Primera Division/argentinos.png';
    case 'Atlético Tucumán':
      return 'images/Argentina - Primera Division/atleticotucuman.png';
    case 'Banfield':
      return 'images/Argentina - Primera Division/banfield.png';
    case 'Barracas Central':
      return 'images/Argentina - Primera Division/barracas.png';
    case 'Belgrano':
      return 'images/Argentina - Primera Division/belgrano.png';
    case 'Boca':
      return 'images/Argentina - Primera Division/boca.png';
    case 'Central Córdoba':
      return 'images/Argentina - Primera Division/centralcordoba.png';
    case 'Defensa y Justicia':
      return 'images/Argentina - Primera Division/defensa.png';
    case 'Estudiantes de La Plata':
      return 'images/Argentina - Primera Division/estudiantes.png';
    case 'Gimnasia y Esgrima La Plata':
      return 'images/Argentina - Primera Division/gimnasia.png';
    case 'Godoy Cruz':
      return 'images/Argentina - Primera Division/godoycruz.png';
    case 'Huracán':
      return 'images/Argentina - Primera Division/huracan.png';
    case 'Independiente':
      return 'images/Argentina - Primera Division/independiente.png';
    case 'Independiente Rivadavia':
      return 'images/Argentina - Primera Division/independienteriv.png';
    case 'Instituto':
      return 'images/Argentina - Primera Division/instituto.png';
    case 'Lanús':
      return 'images/Argentina - Primera Division/lanus.png';
    case "Newell's Old Boys":
      return 'images/Argentina - Primera Division/newells.png';
    case 'Platense':
      return 'images/Argentina - Primera Division/platense.png';
    case 'Racing':
      return 'images/Argentina - Primera Division/racing.png';
    case 'Deportivo Riestra':
      return 'images/Argentina - Primera Division/riestra.png';
    case 'River Plate':
      return 'images/Argentina - Primera Division/river.png';
    case 'Rosario Central':
      return 'images/Argentina - Primera Division/rosariocentral.png';
    case 'San Lorenzo':
      return 'images/Argentina - Primera Division/sanlorenzo.png';
    case 'San Martín':
      return 'images/Argentina - Primera Division/sanmartinsj.png';
    case 'Sarmiento':
      return 'images/Argentina - Primera Division/sarmiento.png';
    case 'Talleres':
      return 'images/Argentina - Primera Division/talleres.png';
    case 'Tigre':
      return 'images/Argentina - Primera Division/tigre.png';
    case 'Unión':
      return 'images/Argentina - Primera Division/union.png';
    case 'Vélez':
      return 'images/Argentina - Primera Division/velez.png';
  }

  return null;
}

function getCountryFlagURL(team: string): string | null {
  switch (team) {
    case 'Andorra':
      return 'https://flagcdn.com/ad.svg';
    case 'Emiratos Árabes Unidos':
      return 'https://flagcdn.com/ae.svg';
    case 'Afganistán':
      return 'https://flagcdn.com/af.svg';
    case 'Antigua y Barbuda':
      return 'https://flagcdn.com/ag.svg';
    case 'Anguila':
      return 'https://flagcdn.com/ai.svg';
    case 'Albania':
      return 'https://flagcdn.com/al.svg';
    case 'Armenia':
      return 'https://flagcdn.com/am.svg';
    case 'Angola':
      return 'https://flagcdn.com/ao.svg';
    case 'Antártida':
      return 'https://flagcdn.com/aq.svg';
    case 'Argentina':
      return 'https://flagcdn.com/ar.svg';
    case 'Samoa Americana':
      return 'https://flagcdn.com/as.svg';
    case 'Austria':
      return 'https://flagcdn.com/at.svg';
    case 'Australia':
      return 'https://flagcdn.com/au.svg';
    case 'Aruba':
      return 'https://flagcdn.com/aw.svg';
    case 'Islas Åland':
      return 'https://flagcdn.com/ax.svg';
    case 'Azerbaiyán':
      return 'https://flagcdn.com/az.svg';
    case 'Bosnia y Herzegovina':
      return 'https://flagcdn.com/ba.svg';
    case 'Barbados':
      return 'https://flagcdn.com/bb.svg';
    case 'Bangladés':
      return 'https://flagcdn.com/bd.svg';
    case 'Bélgica':
      return 'https://flagcdn.com/be.svg';
    case 'Burkina Faso':
      return 'https://flagcdn.com/bf.svg';
    case 'Bulgaria':
      return 'https://flagcdn.com/bg.svg';
    case 'Baréin':
      return 'https://flagcdn.com/bh.svg';
    case 'Burundi':
      return 'https://flagcdn.com/bi.svg';
    case 'Benín':
      return 'https://flagcdn.com/bj.svg';
    case 'San Bartolomé':
      return 'https://flagcdn.com/bl.svg';
    case 'Bermudas':
      return 'https://flagcdn.com/bm.svg';
    case 'Brunéi':
      return 'https://flagcdn.com/bn.svg';
    case 'Bolivia':
      return 'https://flagcdn.com/bo.svg';
    case 'Caribe Neerlandés':
      return 'https://flagcdn.com/bq.svg';
    case 'Brasil':
      return 'https://flagcdn.com/br.svg';
    case 'Bahamas':
      return 'https://flagcdn.com/bs.svg';
    case 'Bután':
      return 'https://flagcdn.com/bt.svg';
    case 'Isla Bouvet':
      return 'https://flagcdn.com/bv.svg';
    case 'Botsuana':
      return 'https://flagcdn.com/bw.svg';
    case 'Bielorrusia':
      return 'https://flagcdn.com/by.svg';
    case 'Belice':
      return 'https://flagcdn.com/bz.svg';
    case 'Canadá':
      return 'https://flagcdn.com/ca.svg';
    case 'Islas Cocos':
      return 'https://flagcdn.com/cc.svg';
    case 'República Democrática del Congo':
      return 'https://flagcdn.com/cd.svg';
    case 'República Centroafricana':
      return 'https://flagcdn.com/cf.svg';
    case 'Congo':
      return 'https://flagcdn.com/cg.svg';
    case 'Suiza':
      return 'https://flagcdn.com/ch.svg';
    case 'Costa de Marfil':
      return 'https://flagcdn.com/ci.svg';
    case 'Islas Cook':
      return 'https://flagcdn.com/ck.svg';
    case 'Chile':
      return 'https://flagcdn.com/cl.svg';
    case 'Camerún':
      return 'https://flagcdn.com/cm.svg';
    case 'China':
      return 'https://flagcdn.com/cn.svg';
    case 'Colombia':
      return 'https://flagcdn.com/co.svg';
    case 'Isla Clipperton':
      return 'https://flagcdn.com/cp.svg';
    case 'Costa Rica':
      return 'https://flagcdn.com/cr.svg';
    case 'Cuba':
      return 'https://flagcdn.com/cu.svg';
    case 'Cabo Verde':
      return 'https://flagcdn.com/cv.svg';
    case 'Curazao':
      return 'https://flagcdn.com/cw.svg';
    case 'Isla Christmas':
      return 'https://flagcdn.com/cx.svg';
    case 'Chipre':
      return 'https://flagcdn.com/cy.svg';
    case 'Chequia':
    case 'República Checa':
      return 'https://flagcdn.com/cz.svg';
    case 'Alemania':
      return 'https://flagcdn.com/de.svg';
    case 'Diego García':
      return 'https://flagcdn.com/dg.svg';
    case 'Yibuti':
      return 'https://flagcdn.com/dj.svg';
    case 'Dinamarca':
      return 'https://flagcdn.com/dk.svg';
    case 'Dominica':
      return 'https://flagcdn.com/dm.svg';
    case 'República Dominicana':
      return 'https://flagcdn.com/do.svg';
    case 'Argelia':
      return 'https://flagcdn.com/dz.svg';
    case 'Ecuador':
      return 'https://flagcdn.com/ec.svg';
    case 'Estados Unidos':
      return 'https://flagcdn.com/us.svg';
    case 'Estonia':
      return 'https://flagcdn.com/ee.svg';
    case 'Egipto':
      return 'https://flagcdn.com/eg.svg';
    case 'Sahara Occidental':
      return 'https://flagcdn.com/eh.svg';
    case 'Eritrea':
      return 'https://flagcdn.com/er.svg';
    case 'Cataluña':
      return 'https://flagcdn.com/es-ct.svg';
    case 'Galicia':
      return 'https://flagcdn.com/es-ga.svg';
    case 'País Vasco':
      return 'https://flagcdn.com/es-pv.svg';
    case 'España':
      return 'https://flagcdn.com/es.svg';
    case 'Etiopía':
      return 'https://flagcdn.com/et.svg';
    case 'Unión Europea':
      return 'https://flagcdn.com/eu.svg';
    case 'Finlandia':
      return 'https://flagcdn.com/fi.svg';
    case 'Fiyi':
      return 'https://flagcdn.com/fj.svg';
    case 'Islas Malvinas':
      return 'https://flagcdn.com/fk.svg';
    case 'Micronesia':
      return 'https://flagcdn.com/fm.svg';
    case 'Islas Feroe':
      return 'https://flagcdn.com/fo.svg';
    case 'Francia':
      return 'https://flagcdn.com/fr.svg';
    case 'Gabón':
      return 'https://flagcdn.com/ga.svg';
    case 'Inglaterra':
      return 'https://flagcdn.com/gb-eng.svg';
    case 'Irlanda del Norte':
      return 'https://flagcdn.com/gb-nir.svg';
    case 'Escocia':
      return 'https://flagcdn.com/gb-sct.svg';
    case 'Gales':
      return 'https://flagcdn.com/gb-wls.svg';
    case 'Granada':
      return 'https://flagcdn.com/gd.svg';
    case 'Georgia':
      return 'https://flagcdn.com/ge.svg';
    case 'Guayana Francesa':
      return 'https://flagcdn.com/gf.svg';
    case 'Guernsey':
      return 'https://flagcdn.com/gg.svg';
    case 'Ghana':
      return 'https://flagcdn.com/gh.svg';
    case 'Gibraltar':
      return 'https://flagcdn.com/gi.svg';
    case 'Groenlandia':
      return 'https://flagcdn.com/gl.svg';
    case 'Gambia':
      return 'https://flagcdn.com/gm.svg';
    case 'Guinea':
      return 'https://flagcdn.com/gn.svg';
    case 'Guadalupe':
      return 'https://flagcdn.com/gp.svg';
    case 'Guinea Ecuatorial':
      return 'https://flagcdn.com/gq.svg';
    case 'Grecia':
      return 'https://flagcdn.com/gr.svg';
    case 'Georgia del Sur e Islas Sandwich del Sur':
      return 'https://flagcdn.com/gs.svg';
    case 'Guatemala':
      return 'https://flagcdn.com/gt.svg';
    case 'Guam':
      return 'https://flagcdn.com/gu.svg';
    case 'Guinea-Bisáu':
      return 'https://flagcdn.com/gw.svg';
    case 'Guyana':
      return 'https://flagcdn.com/gy.svg';
    case 'Hong Kong':
      return 'https://flagcdn.com/hk.svg';
    case 'Islas Heard y McDonald':
      return 'https://flagcdn.com/hm.svg';
    case 'Honduras':
      return 'https://flagcdn.com/hn.svg';
    case 'Croacia':
      return 'https://flagcdn.com/hr.svg';
    case 'Haití':
      return 'https://flagcdn.com/ht.svg';
    case 'Hungría':
      return 'https://flagcdn.com/hu.svg';
    case 'Indonesia':
      return 'https://flagcdn.com/id.svg';
    case 'Irlanda':
      return 'https://flagcdn.com/ie.svg';
    case 'Israel':
      return 'https://flagcdn.com/il.svg';
    case 'Isla de Man':
      return 'https://flagcdn.com/im.svg';
    case 'India':
      return 'https://flagcdn.com/in.svg';
    case 'Territorio Británico del Océano Índico':
      return 'https://flagcdn.com/io.svg';
    case 'Irak':
      return 'https://flagcdn.com/iq.svg';
    case 'Irán':
      return 'https://flagcdn.com/ir.svg';
    case 'Islandia':
      return 'https://flagcdn.com/is.svg';
    case 'Italia':
      return 'https://flagcdn.com/it.svg';
    case 'Jersey':
      return 'https://flagcdn.com/je.svg';
    case 'Jamaica':
      return 'https://flagcdn.com/jm.svg';
    case 'Jordania':
      return 'https://flagcdn.com/jo.svg';
    case 'Japón':
      return 'https://flagcdn.com/jp.svg';
    case 'Kenia':
      return 'https://flagcdn.com/ke.svg';
    case 'Kirguistán':
      return 'https://flagcdn.com/kg.svg';
    case 'Camboya':
      return 'https://flagcdn.com/kh.svg';
    case 'Kiribati':
      return 'https://flagcdn.com/ki.svg';
    case 'Comoras':
      return 'https://flagcdn.com/km.svg';
    case 'San Cristóbal y Nieves':
      return 'https://flagcdn.com/kn.svg';
    case 'Corea del Norte':
      return 'https://flagcdn.com/kp.svg';
    case 'Corea del Sur':
      return 'https://flagcdn.com/kr.svg';
    case 'Kuwait':
      return 'https://flagcdn.com/kw.svg';
    case 'Islas Caimán':
      return 'https://flagcdn.com/ky.svg';
    case 'Kazajistán':
      return 'https://flagcdn.com/kz.svg';
    case 'Laos':
      return 'https://flagcdn.com/la.svg';
    case 'Líbano':
      return 'https://flagcdn.com/lb.svg';
    case 'Santa Lucía':
      return 'https://flagcdn.com/lc.svg';
    case 'Liechtenstein':
      return 'https://flagcdn.com/li.svg';
    case 'Sri Lanka':
      return 'https://flagcdn.com/lk.svg';
    case 'Liberia':
      return 'https://flagcdn.com/lr.svg';
    case 'Lesoto':
      return 'https://flagcdn.com/ls.svg';
    case 'Lituania':
      return 'https://flagcdn.com/lt.svg';
    case 'Luxemburgo':
      return 'https://flagcdn.com/lu.svg';
    case 'Letonia':
      return 'https://flagcdn.com/lv.svg';
    case 'Libia':
      return 'https://flagcdn.com/ly.svg';
    case 'Marruecos':
      return 'https://flagcdn.com/ma.svg';
    case 'Mónaco':
      return 'https://flagcdn.com/mc.svg';
    case 'Moldavia':
      return 'https://flagcdn.com/md.svg';
    case 'Montenegro':
      return 'https://flagcdn.com/me.svg';
    case 'Madagascar':
      return 'https://flagcdn.com/mg.svg';
    case 'Islas Marshall':
      return 'https://flagcdn.com/mh.svg';
    case 'Macedonia del Norte':
      return 'https://flagcdn.com/mk.svg';
    case 'Malí':
      return 'https://flagcdn.com/ml.svg';
    case 'Birmania':
      return 'https://flagcdn.com/mm.svg';
    case 'Mongolia':
      return 'https://flagcdn.com/mn.svg';
    case 'Macao':
      return 'https://flagcdn.com/mo.svg';
    case 'Islas Marianas del Norte':
      return 'https://flagcdn.com/mp.svg';
    case 'Martinica':
      return 'https://flagcdn.com/mq.svg';
    case 'Mauritania':
      return 'https://flagcdn.com/mr.svg';
    case 'Montserrat':
      return 'https://flagcdn.com/ms.svg';
    case 'Malta':
      return 'https://flagcdn.com/mt.svg';
    case 'Mauricio':
      return 'https://flagcdn.com/mu.svg';
    case 'Maldivas':
      return 'https://flagcdn.com/mv.svg';
    case 'Malaui':
      return 'https://flagcdn.com/mw.svg';
    case 'México':
      return 'https://flagcdn.com/mx.svg';
    case 'Malasia':
      return 'https://flagcdn.com/my.svg';
    case 'Mozambique':
      return 'https://flagcdn.com/mz.svg';
    case 'Namibia':
      return 'https://flagcdn.com/na.svg';
    case 'Nueva Caledonia':
      return 'https://flagcdn.com/nc.svg';
    case 'Níger':
      return 'https://flagcdn.com/ne.svg';
    case 'Isla Norfolk':
      return 'https://flagcdn.com/nf.svg';
    case 'Nigeria':
      return 'https://flagcdn.com/ng.svg';
    case 'Nicaragua':
      return 'https://flagcdn.com/ni.svg';
    case 'Países Bajos':
      return 'https://flagcdn.com/nl.svg';
    case 'Noruega':
      return 'https://flagcdn.com/no.svg';
    case 'Nepal':
      return 'https://flagcdn.com/np.svg';
    case 'Nauru':
      return 'https://flagcdn.com/nr.svg';
    case 'Niue':
      return 'https://flagcdn.com/nu.svg';
    case 'Nueva Zelanda':
      return 'https://flagcdn.com/nz.svg';
    case 'Omán':
      return 'https://flagcdn.com/om.svg';
    case 'Panamá':
      return 'https://flagcdn.com/pa.svg';
    case 'Perú':
      return 'https://flagcdn.com/pe.svg';
    case 'Filipinas':
      return 'https://flagcdn.com/ph.svg';
    case 'Pakistán':
      return 'https://flagcdn.com/pk.svg';
    case 'Polonia':
      return 'https://flagcdn.com/pl.svg';
    case 'San Pedro y Miquelón':
      return 'https://flagcdn.com/pm.svg';
    case 'Pitcairn':
      return 'https://flagcdn.com/pn.svg';
    case 'Puerto Rico':
      return 'https://flagcdn.com/pr.svg';
    case 'Palestina':
      return 'https://flagcdn.com/ps.svg';
    case 'Portugal':
      return 'https://flagcdn.com/pt.svg';
    case 'Palaos':
      return 'https://flagcdn.com/pw.svg';
    case 'Paraguay':
      return 'https://flagcdn.com/py.svg';
    case 'Catar':
      return 'https://flagcdn.com/qa.svg';
    case 'Reunión':
      return 'https://flagcdn.com/re.svg';
    case 'Rumania':
      return 'https://flagcdn.com/ro.svg';
    case 'Serbia':
      return 'https://flagcdn.com/rs.svg';
    case 'Rusia':
      return 'https://flagcdn.com/ru.svg';
    case 'Ruanda':
      return 'https://flagcdn.com/rw.svg';
    case 'Arabia Saudita':
      return 'https://flagcdn.com/sa.svg';
    case 'Islas Salomón':
      return 'https://flagcdn.com/sb.svg';
    case 'Seychelles':
      return 'https://flagcdn.com/sc.svg';
    case 'Sudán':
      return 'https://flagcdn.com/sd.svg';
    case 'Suecia':
      return 'https://flagcdn.com/se.svg';
    case 'Singapur':
      return 'https://flagcdn.com/sg.svg';
    case 'Eslovenia':
      return 'https://flagcdn.com/si.svg';
    case 'Eslovaquia':
      return 'https://flagcdn.com/sk.svg';
    case 'Sierra Leona':
      return 'https://flagcdn.com/sl.svg';
    case 'San Marino':
      return 'https://flagcdn.com/sm.svg';
    case 'Senegal':
      return 'https://flagcdn.com/sn.svg';
    case 'Somalia':
      return 'https://flagcdn.com/so.svg';
    case 'Surinam':
      return 'https://flagcdn.com/sr.svg';
    case 'El Salvador':
      return 'https://flagcdn.com/sv.svg';
    case 'Siria':
      return 'https://flagcdn.com/sy.svg';
    case 'Esuatini':
      return 'https://flagcdn.com/sz.svg';
    case 'Tailandia':
      return 'https://flagcdn.com/th.svg';
    case 'Togo':
      return 'https://flagcdn.com/tg.svg';
    case 'Túnez':
      return 'https://flagcdn.com/tn.svg';
    case 'Turquía':
      return 'https://flagcdn.com/tr.svg';
    case 'Ucrania':
      return 'https://flagcdn.com/ua.svg';
    case 'Uruguay':
      return 'https://flagcdn.com/uy.svg';
    case 'Venezuela':
      return 'https://flagcdn.com/ve.svg';
    case 'Vietnam':
      return 'https://flagcdn.com/vn.svg';
    case 'Yemen':
      return 'https://flagcdn.com/ye.svg';
    case 'Zambia':
      return 'https://flagcdn.com/zm.svg';
    case 'Zimbabue':
      return 'https://flagcdn.com/zw.svg';
  }

  return null;
}
