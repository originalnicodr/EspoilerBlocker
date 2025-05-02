import { VideoHighlightType } from './getHighlightType';

export function getTeamBadge(team: string, highlight_type: VideoHighlightType): string {
  return chrome.runtime.getURL(getTeamBadgeLocalPath(team, highlight_type));
}

function getTeamBadgeLocalPath(team: string, highlight_type: VideoHighlightType): string {
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
      return "images/Argentina - Primera Division/aldosivi.png";
    case "Argentinos":
      return "images/Argentina - Primera Division/argentinos.png";
    case "Atlético Tucumán":
      return "images/Argentina - Primera Division/atleticotucuman.png";
    case "Banfield":
      return "images/Argentina - Primera Division/banfield.png";
    case "Barracas Central":
      return "images/Argentina - Primera Division/barracas.png";
    case "Belgrano":
      return "images/Argentina - Primera Division/belgrano.png";
    case "Boca":
      return "images/Argentina - Primera Division/boca.png";
    case "Central Córdoba":
      return "images/Argentina - Primera Division/centralcordoba.png";
    case "Defensa y Justicia":
      return "images/Argentina - Primera Division/defensa.png";
    case "Estudiantes de La Plata":
      return "images/Argentina - Primera Division/estudiantes.png";
    case "Gimnasia y Esgrima La Plata":
      return "images/Argentina - Primera Division/gimnasia.png";
    case "Godoy Cruz":
      return "images/Argentina - Primera Division/godoycruz.png";
    case "Huracán":
      return "images/Argentina - Primera Division/huracan.png";
    case "Independiente":
      return "images/Argentina - Primera Division/independiente.png";
    case "Independiente Rivadavia":
      return "images/Argentina - Primera Division/independienteriv.png";
    case "Instituto":
      return "images/Argentina - Primera Division/instituto.png";
    case "Lanús":
      return "images/Argentina - Primera Division/lanus.png";
    case "Newell's Old Boys":
      return "images/Argentina - Primera Division/newells.png";
    case "Platense":
      return "images/Argentina - Primera Division/platense.png";
    case "Racing":
      return "images/Argentina - Primera Division/racing.png";
    case "Deportivo Riestra":
      return "images/Argentina - Primera Division/riestra.png";
    case "River Plate":
      return "images/Argentina - Primera Division/river.png";
    case "Rosario Central":
      return "images/Argentina - Primera Division/rosariocentral.png";
    case "San Lorenzo":
      return "images/Argentina - Primera Division/sanlorenzo.png";
    case "San Martín":
      return "images/Argentina - Primera Division/sanmartinsj.png";
    case "Sarmiento":
      return "images/Argentina - Primera Division/sarmiento.png";
    case "Talleres":
      return "images/Argentina - Primera Division/talleres.png";
    case "Tigre":
      return "images/Argentina - Primera Division/tigre.png";
    case "Unión":
      return "images/Argentina - Primera Division/union.png";
    case "Vélez":
      return "images/Argentina - Primera Division/velez.png";
  }

  switch (team)
  {
    case "Andorra":
      return "images/Countries/ad.svg";
    case "Emiratos Árabes Unidos":
      return "images/Countries/ae.svg";
    case "Afganistán":
      return "images/Countries/af.svg";
    case "Antigua y Barbuda":
      return "images/Countries/ag.svg";
    case "Anguila":
      return "images/Countries/ai.svg";
    case "Albania":
      return "images/Countries/al.svg";
    case "Armenia":
      return "images/Countries/am.svg";
    case "Angola":
      return "images/Countries/ao.svg";
    case "Antártida":
      return "images/Countries/aq.svg";
    case "Argentina":
      return "images/Countries/ar.svg";
    case "Samoa Americana":
      return "images/Countries/as.svg";
    case "Austria":
      return "images/Countries/at.svg";
    case "Australia":
      return "images/Countries/au.svg";
    case "Aruba":
      return "images/Countries/aw.svg";
    case "Islas Åland":
      return "images/Countries/ax.svg";
    case "Azerbaiyán":
      return "images/Countries/az.svg";
    case "Bosnia y Herzegovina":
      return "images/Countries/ba.svg";
    case "Barbados":
      return "images/Countries/bb.svg";
    case "Bangladés":
      return "images/Countries/bd.svg";
    case "Bélgica":
      return "images/Countries/be.svg";
    case "Burkina Faso":
      return "images/Countries/bf.svg";
    case "Bulgaria":
      return "images/Countries/bg.svg";
    case "Baréin":
      return "images/Countries/bh.svg";
    case "Burundi":
      return "images/Countries/bi.svg";
    case "Benín":
      return "images/Countries/bj.svg";
    case "San Bartolomé":
      return "images/Countries/bl.svg";
    case "Bermudas":
      return "images/Countries/bm.svg";
    case "Brunéi":
      return "images/Countries/bn.svg";
    case "Bolivia":
      return "images/Countries/bo.svg";
    case "Caribe Neerlandés":
      return "images/Countries/bq.svg";
    case "Brasil":
      return "images/Countries/br.svg";
    case "Bahamas":
      return "images/Countries/bs.svg";
    case "Bután":
      return "images/Countries/bt.svg";
    case "Isla Bouvet":
      return "images/Countries/bv.svg";
    case "Botsuana":
      return "images/Countries/bw.svg";
    case "Bielorrusia":
      return "images/Countries/by.svg";
    case "Belice":
      return "images/Countries/bz.svg";
    case "Canadá":
      return "images/Countries/ca.svg";
    case "Islas Cocos":
      return "images/Countries/cc.svg";
    case "República Democrática del Congo":
      return "images/Countries/cd.svg";
    case "República Centroafricana":
      return "images/Countries/cf.svg";
    case "Congo":
      return "images/Countries/cg.svg";
    case "Suiza":
      return "images/Countries/ch.svg";
    case "Costa de Marfil":
      return "images/Countries/ci.svg";
    case "Islas Cook":
      return "images/Countries/ck.svg";
    case "Chile":
      return "images/Countries/cl.svg";
    case "Camerún":
      return "images/Countries/cm.svg";
    case "China":
      return "images/Countries/cn.svg";
    case "Colombia":
      return "images/Countries/co.svg";
    case "Isla Clipperton":
      return "images/Countries/cp.svg";
    case "Costa Rica":
      return "images/Countries/cr.svg";
    case "Cuba":
      return "images/Countries/cu.svg";
    case "Cabo Verde":
      return "images/Countries/cv.svg";
    case "Curazao":
      return "images/Countries/cw.svg";
    case "Isla Christmas":
      return "images/Countries/cx.svg";
    case "Chipre":
      return "images/Countries/cy.svg";
    case "Chequia":
      return "images/Countries/cz.svg";
    case "Alemania":
      return "images/Countries/de.svg";
    case "Diego García":
      return "images/Countries/dg.svg";
    case "Yibuti":
      return "images/Countries/dj.svg";
    case "Dinamarca":
      return "images/Countries/dk.svg";
    case "Dominica":
      return "images/Countries/dm.svg";
    case "República Dominicana":
      return "images/Countries/do.svg";
    case "Argelia":
      return "images/Countries/dz.svg";
    case "Ecuador":
      return "images/Countries/ec.svg";
    case "Estonia":
      return "images/Countries/ee.svg";
    case "Egipto":
      return "images/Countries/eg.svg";
    case "Sahara Occidental":
      return "images/Countries/eh.svg";
    case "Eritrea":
      return "images/Countries/er.svg";
    case "Cataluña":
      return "images/Countries/es-ct.svg";
    case "Galicia":
      return "images/Countries/es-ga.svg";
    case "País Vasco":
      return "images/Countries/es-pv.svg";
    case "España":
      return "images/Countries/es.svg";
    case "Etiopía":
      return "images/Countries/et.svg";
    case "Unión Europea":
      return "images/Countries/eu.svg";
    case "Finlandia":
      return "images/Countries/fi.svg";
    case "Fiyi":
      return "images/Countries/fj.svg";
    case "Islas Malvinas":
      return "images/Countries/fk.svg";
    case "Micronesia":
      return "images/Countries/fm.svg";
    case "Islas Feroe":
      return "images/Countries/fo.svg";
    case "Francia":
      return "images/Countries/fr.svg";
    case "Gabón":
      return "images/Countries/ga.svg";
    case "Inglaterra":
      return "images/Countries/gb-eng.svg";
    case "Irlanda del Norte":
      return "images/Countries/gb-nir.svg";
    case "Escocia":
      return "images/Countries/gb-sct.svg";
    case "Gales":
      return "images/Countries/gb-wls.svg";
    case "Granada":
      return "images/Countries/gd.svg";
    case "Georgia":
      return "images/Countries/ge.svg";
    case "Guayana Francesa":
      return "images/Countries/gf.svg";
    case "Guernsey":
      return "images/Countries/gg.svg";
    case "Ghana":
      return "images/Countries/gh.svg";
    case "Gibraltar":
      return "images/Countries/gi.svg";
    case "Groenlandia":
      return "images/Countries/gl.svg";
    case "Gambia":
      return "images/Countries/gm.svg";
    case "Guinea":
      return "images/Countries/gn.svg";
    case "Guadalupe":
      return "images/Countries/gp.svg";
    case "Guinea Ecuatorial":
      return "images/Countries/gq.svg";
    case "Grecia":
      return "images/Countries/gr.svg";
    case "Georgia del Sur e Islas Sandwich del Sur":
      return "images/Countries/gs.svg";
    case "Guatemala":
      return "images/Countries/gt.svg";
    case "Guam":
      return "images/Countries/gu.svg";
    case "Guinea-Bisáu":
      return "images/Countries/gw.svg";
    case "Guyana":
      return "images/Countries/gy.svg";
    case "Hong Kong":
      return "images/Countries/hk.svg";
    case "Islas Heard y McDonald":
      return "images/Countries/hm.svg";
    case "Honduras":
      return "images/Countries/hn.svg";
    case "Croacia":
      return "images/Countries/hr.svg";
    case "Haití":
      return "images/Countries/ht.svg";
    case "Hungría":
      return "images/Countries/hu.svg";
    case "Indonesia":
      return "images/Countries/id.svg";
    case "Irlanda":
      return "images/Countries/ie.svg";
    case "Israel":
      return "images/Countries/il.svg";
    case "Isla de Man":
      return "images/Countries/im.svg";
    case "India":
      return "images/Countries/in.svg";
    case "Territorio Británico del Océano Índico":
      return "images/Countries/io.svg";
    case "Irak":
      return "images/Countries/iq.svg";
    case "Irán":
      return "images/Countries/ir.svg";
    case "Islandia":
      return "images/Countries/is.svg";
    case "Italia":
      return "images/Countries/it.svg";
    case "Jersey":
      return "images/Countries/je.svg";
    case "Jamaica":
      return "images/Countries/jm.svg";
    case "Jordania":
      return "images/Countries/jo.svg";
    case "Japón":
      return "images/Countries/jp.svg";
    case "Kenia":
      return "images/Countries/ke.svg";
    case "Kirguistán":
      return "images/Countries/kg.svg";
    case "Camboya":
      return "images/Countries/kh.svg";
    case "Kiribati":
      return "images/Countries/ki.svg";
    case "Comoras":
      return "images/Countries/km.svg";
    case "San Cristóbal y Nieves":
      return "images/Countries/kn.svg";
    case "Corea del Norte":
      return "images/Countries/kp.svg";
    case "Corea del Sur":
      return "images/Countries/kr.svg";
    case "Kuwait":
      return "images/Countries/kw.svg";
    case "Islas Caimán":
      return "images/Countries/ky.svg";
    case "Kazajistán":
      return "images/Countries/kz.svg";
    case "Laos":
      return "images/Countries/la.svg";
    case "Líbano":
      return "images/Countries/lb.svg";
    case "Santa Lucía":
      return "images/Countries/lc.svg";
    case "Liechtenstein":
      return "images/Countries/li.svg";
    case "Sri Lanka":
      return "images/Countries/lk.svg";
    case "Liberia":
      return "images/Countries/lr.svg";
    case "Lesoto":
      return "images/Countries/ls.svg";
    case "Lituania":
      return "images/Countries/lt.svg";
    case "Luxemburgo":
      return "images/Countries/lu.svg";
    case "Letonia":
      return "images/Countries/lv.svg";
    case "Libia":
      return "images/Countries/ly.svg";
    case "Marruecos":
      return "images/Countries/ma.svg";
    case "Mónaco":
      return "images/Countries/mc.svg";
    case "Moldavia":
      return "images/Countries/md.svg";
    case "Montenegro":
      return "images/Countries/me.svg";
    case "Madagascar":
      return "images/Countries/mg.svg";
    case "Islas Marshall":
      return "images/Countries/mh.svg";
    case "Macedonia del Norte":
      return "images/Countries/mk.svg";
    case "Malí":
      return "images/Countries/ml.svg";
    case "Birmania":
      return "images/Countries/mm.svg";
    case "Mongolia":
      return "images/Countries/mn.svg";
    case "Macao":
      return "images/Countries/mo.svg";
    case "Islas Marianas del Norte":
      return "images/Countries/mp.svg";
    case "Martinica":
      return "images/Countries/mq.svg";
    case "Mauritania":
      return "images/Countries/mr.svg";
    case "Montserrat":
      return "images/Countries/ms.svg";
    case "Malta":
      return "images/Countries/mt.svg";
    case "Mauricio":
      return "images/Countries/mu.svg";
    case "Maldivas":
      return "images/Countries/mv.svg";
    case "Malaui":
      return "images/Countries/mw.svg";
    case "México":
      return "images/Countries/mx.svg";
    case "Malasia":
      return "images/Countries/my.svg";
    case "Mozambique":
      return "images/Countries/mz.svg";
    case "Namibia":
      return "images/Countries/na.svg";
    case "Nueva Caledonia":
      return "images/Countries/nc.svg";
    case "Níger":
      return "images/Countries/ne.svg";
    case "Isla Norfolk":
      return "images/Countries/nf.svg";
    case "Nigeria":
      return "images/Countries/ng.svg";
    case "Nicaragua":
      return "images/Countries/ni.svg";
    case "Países Bajos":
      return "images/Countries/nl.svg";
    case "Noruega":
      return "images/Countries/no.svg";
    case "Nepal":
      return "images/Countries/np.svg";
    case "Nauru":
      return "images/Countries/nr.svg";
    case "Niue":
      return "images/Countries/nu.svg";
    case "Nueva Zelanda":
      return "images/Countries/nz.svg";
    case "Omán":
      return "images/Countries/om.svg";
    case "Panamá":
      return "images/Countries/pa.svg";
    case "Perú":
      return "images/Countries/pe.svg";
    case "Filipinas":
      return "images/Countries/ph.svg";
    case "Pakistán":
      return "images/Countries/pk.svg";
    case "Polonia":
      return "images/Countries/pl.svg";
    case "San Pedro y Miquelón":
      return "images/Countries/pm.svg";
    case "Pitcairn":
      return "images/Countries/pn.svg";
    case "Puerto Rico":
      return "images/Countries/pr.svg";
    case "Palestina":
      return "images/Countries/ps.svg";
    case "Portugal":
      return "images/Countries/pt.svg";
    case "Palaos":
      return "images/Countries/pw.svg";
    case "Paraguay":
      return "images/Countries/py.svg";
    case "Catar":
      return "images/Countries/qa.svg";
    case "Reunión":
      return "images/Countries/re.svg";
    case "Rumania":
      return "images/Countries/ro.svg";
    case "Serbia":
      return "images/Countries/rs.svg";
    case "Rusia":
      return "images/Countries/ru.svg";
    case "Ruanda":
      return "images/Countries/rw.svg";
    case "Arabia Saudita":
      return "images/Countries/sa.svg";
    case "Islas Salomón":
      return "images/Countries/sb.svg";
    case "Seychelles":
      return "images/Countries/sc.svg";
    case "Sudán":
      return "images/Countries/sd.svg";
    case "Suecia":
      return "images/Countries/se.svg";
    case "Singapur":
      return "images/Countries/sg.svg";
    case "Eslovenia":
      return "images/Countries/si.svg";
    case "Eslovaquia":
      return "images/Countries/sk.svg";
    case "Sierra Leona":
      return "images/Countries/sl.svg";
    case "San Marino":
      return "images/Countries/sm.svg";
    case "Senegal":
      return "images/Countries/sn.svg";
    case "Somalia":
      return "images/Countries/so.svg";
    case "Surinam":
      return "images/Countries/sr.svg";
    case "El Salvador":
      return "images/Countries/sv.svg";
    case "Siria":
      return "images/Countries/sy.svg";
    case "Esuatini":
      return "images/Countries/sz.svg";
    case "Tailandia":
      return "images/Countries/th.svg";
    case "Togo":
      return "images/Countries/tg.svg";
    case "Túnez":
      return "images/Countries/tn.svg";
    case "Turquía":
      return "images/Countries/tr.svg";
    case "Ucrania":
      return "images/Countries/ua.svg";
    case "Uruguay":
      return "images/Countries/uy.svg";
    case "Venezuela":
      return "images/Countries/ve.svg";
    case "Vietnam":
      return "images/Countries/vn.svg";
    case "Yemen":
      return "images/Countries/ye.svg";
    case "Zambia":
      return "images/Countries/zm.svg";
    case "Zimbabue":
      return "images/Countries/zw.svg";
  }

  // Default teams logo
  if (highlight_type == VideoHighlightType.Basketball) {
    return 'images/basketball-ball.png';
  }
  return 'images/football-ball.png';
}
