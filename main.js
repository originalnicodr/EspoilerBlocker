// ==UserScript==
// @name         ESPN Fans Football Spoiler Block
// @namespace    http://tampermonkey.net/
// @version      2024-10-06
// @description  try to take over the world!
// @author       originalnicodr
// @match        https://www.youtube.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

// TODO:
// - Llenar con liga argentina
// - Refactorizar y modularizar
// - Problemas de centrado vertical de team badges (que pasa si es vacio?). Usar flexbox?
// - Cambiar comportamiento de hover en home ya que puede mostrar el thumbnail original un ratito?

// FUTURE:
// - Agregar fecha
// - Mostrar total goles al hacer hover?
// - Desaparecer info en hover?
// - Agregar soporte a la subpagina de "search"

(function() {
    function spoilerBlockVideo(video)
    {
        // Check if the video is from ESPN Fans before trying to spoil it [Homepage]
        var channel_element = video.querySelector("ytd-channel-name a");
        if (!channel_element) {
            // [Suggested videos]
            channel_element = video.querySelector("ytd-compact-video-renderer ytd-channel-name yt-formatted-string#text");
        }

        if (channel_element) {
            let channelName = channel_element ? channel_element.innerText.trim() : "";
            if (channelName !== "ESPN Fans") {
                return;
            }
        }

        var thumbnail_element = video.querySelector('#thumbnail');
        const title_element = video.querySelector('#video-title');
        const title_link = video.querySelector('#video-title-link');

        if (!title_element || typeof title_element === 'undefined') {
            return;
        }

        const title_text = title_element.textContent || title_element.innerText;

        if (typeof title_text === 'undefined' || !title_text.includes('|')) {
            return;
        }

        // Check title is from a highlights match
        const match_teams_string = title_text.split('|')[1];
        if (!match_teams_string) {
            return;
        }
        if (!match_teams_string.includes('-')) {
            return;
        }

        if (!thumbnail_element) {
            var thumbnail_element = video.querySelector('ytd-compact-video-renderer ytd-thumbnail img');
        }

        hideThumbnail(thumbnail_element);

        const title_replace = spoilerTitle(title_text);
        if (title_replace === "") {
            return;
        }

        title_element.textContent = title_replace;
        title_element.innerText = title_replace;
        if (title_link) {
            title_link.title = title_replace;
        }

        let teams = getTeams(title_text);
        if (teams.lenth === 0) {
            return;
        }
        let [team_a, team_b] = teams;
        addTeamBadges(team_a, team_b, thumbnail_element);

    }

    function getTeams(original_title) {
        const match_teams_string = original_title.split('|')[1];
        if (!match_teams_string) {
            return [];
        }

        if (!match_teams_string.includes('-')) {
            return [];
        }
        let [part1, part2] = match_teams_string.split('-');
    
        // From the first part (TeamA X), remove everything after the last space to isolate TeamA
        let team_a = part1.trim().split(' ').slice(0, -1).join(' ');
        // From the second part (Y TeamB), remove everything before the first space to isolate TeamB
        let team_b = part2.trim().split(' ').slice(1).join(' ');

        return [team_a, team_b]
    }

    function spoilerTitle(original_title){
        const teams = getTeams(original_title);
        if (teams.length === 0) {
            return "";
        }

        let [team_a, team_b] = teams;
        return team_a + " vs " + team_b;
    }

    function addTeamBadges(team_a, team_b, thumbnail_element) {
        if (thumbnail_element === 'undefined') {
            return;
        }
    
        const badge_a = getTeamBadge(team_a);
        const badge_b = getTeamBadge(team_b);

        if (badge_a) {
            const img_a = document.createElement("img");
            img_a.alt = team_a + "Badge";
            img_a.src = badge_a;
            img_a.width = thumbnail_element.clientWidth * 0.2;
            img_a.style.height = "auto";
            img_a.style.position = "absolute";
            img_a.style.top = "35%";
            img_a.style.left = "20%";
            img_a.style.transform = "translate(-50%, -50%)";
            img_a.style.pointerEvents = 'none';
            thumbnail_element.appendChild(img_a);
        }

        if (badge_b) {
            const img_b = document.createElement("img");
            img_b.alt = badge_b + "Badge";
            img_b.src = badge_b;
            img_b.width = thumbnail_element.clientWidth * 0.2;
            img_b.style.position = "absolute";
            img_b.style.top = "35%";
            img_b.style.left = "80%";
            img_b.style.transform = "translate(-50%, -50%)";
            img_b.style.pointerEvents = 'none';
            thumbnail_element.appendChild(img_b);
        }

        const betweenBadges = document.createElement("p");
        betweenBadges.innerText = "-";
        betweenBadges.style.position = "absolute";
        betweenBadges.style.top = "25%";
        betweenBadges.style.left = "47%";
        betweenBadges.style.fontSize = "50px";
        betweenBadges.style.color = "white";
        betweenBadges.style.pointerEvents = 'none';
        thumbnail_element.appendChild(betweenBadges);
    }
    
    function hideThumbnail(thumbnail_element){
        if (thumbnail_element === 'undefined') {
            return;
        }
    
        var thumbnail_image = thumbnail_element.querySelector('#thumbnail');
        if (thumbnail_image) {
            thumbnail_image.style.opacity = '0';
            return;
        }

        thumbnail_image = thumbnail_element.querySelector('#image');
        if (thumbnail_image) {
            thumbnail_image.style.opacity = '0';
            return;
        }

        thumbnail_image = thumbnail_element.querySelector("yt-image");
        if (thumbnail_image) {
            thumbnail_image.style.opacity = '0';
            return;
        }
    }
 
    function feedSpoilerBlock() {
        //const videos = document.querySelectorAll('#content');
        const videos = document.querySelectorAll('#dismissible');
        videos.forEach(spoilerBlockVideo);
    }

    function replaceVideoTitle() {
        const title_element = document.querySelector('h1.style-scope.ytd-watch-metadata');
        if (title_element) {
            const title_text = title_element.textContent || title_element.innerText;
    
            if (typeof title_text === 'undefined' || !title_text.includes('|')) {
                return;
            }

            const title_replace = spoilerTitle(title_text);
            if (title_replace === "") {
                return;
            }
            title_element.title = title_replace;
            title_element.textContent = title_replace;
            title_element.innerText = title_replace;
        }
    }

    function replacePlayerTitle() {
        const title_element = document.querySelector('a.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link');

        if (title_element) {
            const title_text = title_element.textContent || title_element.innerText;
    
            if (typeof title_text === 'undefined' || !title_text.includes('|')) {
                return;
            }

            const title_replace = spoilerTitle(title_text);
            if (title_replace === "") {
                return;
            }

            title_element.title = title_replace;
            title_element.textContent = title_replace;
            title_element.innerText = title_replace;
        }
    }

    function spoilerBlockTabTitle() {
        const current_url = window.location.href;
        if (!current_url.includes("watch?v=")) {
            return;
        }

        let teams = getTeams(document.title);
        if (teams.length === 0) {
            return;
        }
        let [team_a, team_b] = teams;

        const non_spoiler_title = team_a + " vs. " + team_b;

        if (document.title !== non_spoiler_title) {
            document.title = non_spoiler_title;
        }
    }
    
    function spoilerBlockBody(){
        const current_url = window.location.href;
        if (current_url.includes("watch?v=")) {
            replaceVideoTitle();
            replacePlayerTitle();

            //const suggestedVideos = document.querySelectorAll('ytd-compact-video-renderer.style-scope.ytd-item-section-renderer');;
            const suggestedVideos = document.querySelectorAll('ytd-compact-video-renderer');
            suggestedVideos.forEach(spoilerBlockVideo);
        }
        else {
            feedSpoilerBlock();
        }
    }

    const observer_tab_title = new MutationObserver(() => {
        spoilerBlockTabTitle();
    });
    observer_tab_title.observe(document.querySelector("title"), { childList: true });
    spoilerBlockTabTitle();

    const body_observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            spoilerBlockBody();
        });
    });
    body_observer.observe(document.body, { childList: true, subtree: true });
    spoilerBlockBody();

    })();

function getTeamBadge(team) {
    return chrome.runtime.getURL(getTeamBadgeLocalPath(team));
}

function getTeamBadgeLocalPath(team) {
        // Premier
        switch (team) {
            case "Aston":
            case "Aston Villa":
            case "Villa":
                return "football-logos/logos/England - Premier League/Aston Villa.png";
            case "Bournemouth":
                return "football-logos/logos/England - Premier League/AFC Bournemouth.png";
            case "Arsenal":
                return "football-logos/logos/England - Premier League/Arsenal FC.png";
            case "Brentford":
                return "football-logos/logos/England - Premier League/Brentford FC.png";
            case "Brighton":
                return "football-logos/logos/England - Premier League/Brighton & Hove Albion.png";
            case "Chelsea":
                return "football-logos/logos/England - Premier League/Chelsea FC.png";
            case "Crystal Palace":
            case "C. Palace":
                return "football-logos/logos/England - Premier League/Crystal Palace.png";
            case "Everton":
                return "football-logos/logos/England - Premier League/Everton FC.png";
            case "Fulham":
                return "football-logos/logos/England - Premier League/Fulham FC.png";
            case "Ipswich Town":
            case "Ipswich":
                return "football-logos/logos/England - Premier League/Ipswich Town.png";
            case "Leicester City":
            case "Leicester":
                return "football-logos/logos/England - Premier League/Leicester City.png";
            case "Liverpool":
                return "football-logos/logos/England - Premier League/Liverpool FC.png";
            case "Manchester City":
            case "Man. City":
                return "football-logos/logos/England - Premier League/Manchester City.png";
            case "Manchester United":
            case "Manchester Utd":
            case "Man. Utd":
            case "M. Utd.":
                return "football-logos/logos/England - Premier League/Manchester United.png";
            case "Newcastle United":
            case "Newcastle":
                return "football-logos/logos/England - Premier League/Newcastle United.png";
            case "Nottingham Forest":
            case "Nott.":
                return "football-logos/logos/England - Premier League/Nottingham Forest.png";
            case "Southampton":
                return "football-logos/logos/England - Premier League/Southampton FC.png";
            case "Tottenham Hotspur":
            case "Tottenham":
                return "football-logos/logos/England - Premier League/Tottenham Hotspur.png";
            case "West Ham United":
            case "West Ham":
                return "football-logos/logos/England - Premier League/West Ham United.png";
            case "Wolverhampton Wanderers":
            case "Wolverhampton":
            case "Wolves":
                return "football-logos/logos/England - Premier League/Wolverhampton Wanderers.png";
        }
        // La Liga
        switch(team)
        {
            case "Bilbao":
            case "Athletic":
                return "football-logos/logos/Spain - LaLiga/Athletic Bilbao.png";
            case "Atlético de Madrid":
            case "Atl. Madrid":
            case "Atlético":
                return "football-logos/logos/Spain - LaLiga/Atlético de Madrid.png";
            case "Osasuna":
                return "football-logos/logos/Spain - LaLiga/CA Osasuna.png";
            case "Leganés":
                return "football-logos/logos/Spain - LaLiga/CD Leganés.png";
            case "Celta de Vigo":
            case "Celta":
                return "football-logos/logos/Spain - LaLiga/Celta de Vigo.png";
            case "Alavés":
                return "football-logos/logos/Spain - LaLiga/Deportivo Alavés.png";
            case "Barcelona":
            case "Barca":
                return "football-logos/logos/Spain - LaLiga/FC Barcelona.png";
            case "Getafe":
                return "football-logos/logos/Spain - LaLiga/Getafe CF.png";
            case "Girona":
                return "football-logos/logos/Spain - LaLiga/Girona FC.png";
            case "Rayo Vallecano":
                return "football-logos/logos/Spain - LaLiga/Rayo Vallecano.png";
            case "RCD Espanyol":
            case "R.C.D. Espanyol":
            case "Espanyol":
                return "football-logos/logos/Spain - LaLiga/RCD Espanyol Barcelona.png";
            case "RCD Mallorca":
            case "R.C.D. Mallorca":
            case "Mallorca":
                return "football-logos/logos/Spain - LaLiga/RCD Mallorca.png";
            case "Betis":
                return "football-logos/logos/Spain - LaLiga/Real Betis Balompié.png";
            case "Real Madrid":
            case "R. Madrid":
                return "football-logos/logos/Spain - LaLiga/Real Madrid.png";
            case "Real Sociedad":
                return "football-logos/logos/Spain - LaLiga/Real Sociedad.png";
            case "Valladolid":
                return "football-logos/logos/Spain - LaLiga/Real Valladolid CF.png";
            case "Sevilla":
                return "football-logos/logos/Spain - LaLiga/Sevilla FC.png";
            case "U.D. Las Palmas":
            case "U.D. Las Palmas":
            case "Las Palmas":
                return "football-logos/logos/Spain - LaLiga/UD Las Palmas.png";
            case "Valencia":
                return "football-logos/logos/Spain - LaLiga/Valencia CF.png";
            case "Villarreal":
                return "football-logos/logos/Spain - LaLiga/Villarreal CF.png";
        }
        // Serie A
        switch(team){
            case "Milan":
                return "football-logos/logos/Italy - Serie A/AC Milan.png";
            case "Monza":
                return "football-logos/logos/Italy - Serie A/AC Monza.png";
            case "Fiorentina":
                return "football-logos/logos/Italy - Serie A/ACF Fiorentina.png";
            case "Roma":
                return "football-logos/logos/Italy - Serie A/AS Roma.png";
            case "Atalanta":
                return "football-logos/logos/Italy - Serie A/Atalanta BC.png";
            case "Bologna":
                return "football-logos/logos/Italy - Serie A/Bologna FC 1909.png";
            case "Cagliari Calcio":
            case "Cagliari":
                return "football-logos/logos/Italy - Serie A/Cagliari Calcio.png";
            case "Como":
                return "football-logos/logos/Italy - Serie A/Como 1907.png";
            case "Empoli":
                return "football-logos/logos/Italy - Serie A/FC Empoli.png";
            case "Genoa":
                return "football-logos/logos/Italy - Serie A/Genoa CFC.png";
            case "Hellas Verona":
            case "Verona":
                return "football-logos/logos/Italy - Serie A/Hellas Verona.png";
            case "Inter":
            case "Inter Milan":
                return "football-logos/logos/Italy - Serie A/Inter Milan.png";
            case "Juventus":
                return "football-logos/logos/Italy - Serie A/Juventus FC.png";
            case "Parma Calcio 1913":
            case "Parma":
                return "football-logos/logos/Italy - Serie A/Parma Calcio 1913.png";
            case "Lazio":
                return "football-logos/logos/Italy - Serie A/SS Lazio.png";
            case "Napoli":
                return "football-logos/logos/Italy - Serie A/SSC Napoli.png";
            case "Torino":
                return "football-logos/logos/Italy - Serie A/Torino FC.png";
            case "Udinese Calcio":
            case "Udinese":
                return "football-logos/logos/Italy - Serie A/Udinese Calcio.png";
            case "Lecce":
                return "football-logos/logos/Italy - Serie A/US Lecce.png";
            case "Venezia":
                return "football-logos/logos/Italy - Serie A/Venezia FC.png";
        }

        // Default teams logo
        return "images/ball.png";
    }
