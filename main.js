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
// - snake_case para variables
// - Refactorizar y modularizar
// - Sacar los iconos de los equipos de forma local?
// - Llenar con los otros equipos

// - Problemas de centrado vertical de team badges (que pasa si es vacio?). Usar flexbox?

// FUTURE:
// - Agregar fecha
// - Mostrar total goles al hacer hover?
// - Desaparecer info en hover?

(function() {
    function spoilerBlockVideo(video)
    {
        // Check if the video is from ESPN Fans before trying to spoil it [Homepage]
        var channelElement = video.querySelector("ytd-channel-name a");
        if (!channelElement) {
            // [Suggested videos]
            channelElement = video.querySelector("ytd-compact-video-renderer ytd-channel-name yt-formatted-string#text");
        }

        if (channelElement) {
            let channelName = channelElement ? channelElement.innerText.trim() : "";
            if (channelName !== "ESPN Fans") {
                return;
            }
        }

        var thumbnailElement = video.querySelector('#thumbnail');
        const titleElement = video.querySelector('#video-title');
        const titleLink = video.querySelector('#video-title-link');

        if (!titleElement || typeof titleElement === 'undefined') {
            return;
        }

        const titleText = titleElement.textContent || titleElement.innerText;

        if (typeof titleText === 'undefined' || !titleText.includes('|')) {
            return;
        }

        // Check title is from a highlights match
        const match_teams_string = titleText.split('|')[1];
        if (!match_teams_string) {
            return;
        }
        if (!match_teams_string.includes('-')) {
            return;
        }

        if (!thumbnailElement) {
            var thumbnailElement = video.querySelector('ytd-compact-video-renderer ytd-thumbnail img');
        }

        hideThumbnail(thumbnailElement);

        const titleReplace = spoilerTitle(titleText);
        if (titleReplace === "") {
            return;
        }

        titleElement.textContent = titleReplace;
        titleElement.innerText = titleReplace;
        if (titleLink) {
            titleLink.title = titleReplace;
        }

        let teams = getTeams(titleText);
        if (teams.lenth === 0) {
            return;
        }
        let [teamA, teamB] = teams;
        addTeamBadges(teamA, teamB, thumbnailElement);

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
        let teamA = part1.trim().split(' ').slice(0, -1).join(' ');
        // From the second part (Y TeamB), remove everything before the first space to isolate TeamB
        let teamB = part2.trim().split(' ').slice(1).join(' ');

        return [teamA, teamB]
    }

    function spoilerTitle(original_title){
        const teams = getTeams(original_title);
        if (teams.length === 0) {
            return "";
        }

        let [teamA, teamB] = teams;
        return teamA + " vs " + teamB;
    }

    function addTeamBadges(teamA, teamB, thumbnailElement) {
        if (thumbnailElement === 'undefined') {
            return;
        }
    
        const badgeA = getTeamBadge(teamA);
        const badgeB = getTeamBadge(teamB);

        if (badgeA) {
            const imgA = document.createElement("img");
            imgA.alt = teamA + "Badge";
            imgA.src = badgeA;
            imgA.width = thumbnailElement.clientWidth * 0.2;
            imgA.style.height = "auto";
            imgA.style.position = "absolute";
            imgA.style.top = "35%";
            imgA.style.left = "20%";
            imgA.style.transform = "translate(-50%, -50%)";
            imgA.style.pointerEvents = 'none';
            thumbnailElement.appendChild(imgA);
        }

        if (badgeB) {
            const imgB = document.createElement("img");
            imgB.alt = badgeB + "Badge";
            imgB.src = badgeB;
            imgB.width = thumbnailElement.clientWidth * 0.2;
            imgB.style.position = "absolute";
            imgB.style.top = "35%";
            imgB.style.left = "80%";
            imgB.style.transform = "translate(-50%, -50%)";
            imgB.style.pointerEvents = 'none';
            thumbnailElement.appendChild(imgB);
        }

        const betweenBadges = document.createElement("p");
        betweenBadges.innerText = "-";
        betweenBadges.style.position = "absolute";
        betweenBadges.style.top = "25%";
        betweenBadges.style.left = "47%";
        betweenBadges.style.fontSize = "50px";
        betweenBadges.style.color = "white";
        betweenBadges.style.pointerEvents = 'none';
        thumbnailElement.appendChild(betweenBadges);
    }
    
    function hideThumbnail(thumbnailElement){
        if (thumbnailElement === 'undefined') {
            return;
        }
    
        var thumbnailImage = thumbnailElement.querySelector('#thumbnail');
        if (thumbnailImage) {
            thumbnailImage.style.opacity = '0';
            return;
        }

        thumbnailImage = thumbnailElement.querySelector('#image');
        if (thumbnailImage) {
            thumbnailImage.style.opacity = '0';
            return;
        }

        thumbnailImage = thumbnailElement.querySelector("yt-image");
        if (thumbnailImage) {
            thumbnailImage.style.opacity = '0';
            return;
        }
    }

    // Hitting an API for each of these is kind of expensive, so we map the team badges to known sources
    // It's not the league you follow here? Considering adding them and making a pull request!
    function getTeamBadge(team) {
        // Premier
        switch (team) {
            case "Aston":
            case "Aston Villa":
            case "Villa":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Aston%20Villa.png";
            case "Bournemouth":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/AFC%20Bournemouth.png";
            case "Arsenal":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Arsenal%20FC.png";
            case "Brentford":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Brentford%20FC.png";
            case "Brighton":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Brighton%20%26%20Hove%20Albion.png";
            case "Chelsea":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Chelsea%20FC.png";
            case "Crystal Palace":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Crystal%20Palace.png";
            case "Everton":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Everton%20FC.png";
            case "Fulham ":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Fulham%20FC.png";
            case "Ipswich Town":
            case "Ipswich":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Ipswich%20Town.png";
            case "Leicester City":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Leicester%20City.png";
            case "Liverpool":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Liverpool%20FC.png";
            case "Manchester City":
            case "Man. City":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Manchester%20City.png";
            case "Manchester United":
            case "Manchester Utd":
            case "Man. Utd":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Manchester%20United.png";
            case "Newcastle United":
            case "Newcastle":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Newcastle%20United.png";
            case "Nottingham Forest":
            case "Nott.":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Nottingham%20Forest.png";
            case "Southampton":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Southampton%20FC.png";
            case "Tottenham Hotspur":
            case "Tottenham":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Tottenham%20Hotspur.png";
            case "West Ham United":
            case "West Ham":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/West%20Ham%20United.png";
            case "Wolverhampton Wanderers":
            case "Wolverhampton":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/England%20-%20Premier%20League/Wolverhampton%20Wanderers.png";
        }
    
        // La Liga
        switch(team)
        {
            case "Atlético de Madrid":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/Spain%20-%20LaLiga/Atl%C3%A9tico%20de%20Madrid.png";
            case "Barcelona":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/Spain%20-%20LaLiga/FC%20Barcelona.png";
            case "Real Madrid":
                return "https://raw.githubusercontent.com/luukhopman/football-logos/refs/heads/master/logos/Spain%20-%20LaLiga/Real%20Madrid.png";
        }
    
        return "";
    }

 
    function feedSpoilerBlock() {
        //const videos = document.querySelectorAll('#content');
        const videos = document.querySelectorAll('#dismissible');
        videos.forEach(spoilerBlockVideo);
    }

    function replaceVideoTitle() {
        const titleElement = document.querySelector('h1.style-scope.ytd-watch-metadata');
        if (titleElement) {
            const titleText = titleElement.textContent || titleElement.innerText;
    
            if (typeof titleText === 'undefined' || !titleText.includes('|')) {
                return;
            }

            const titleReplace = spoilerTitle(titleText);
            if (titleReplace === "") {
                return;
            }
            titleElement.title = titleReplace;
            titleElement.textContent = titleReplace;
            titleElement.innerText = titleReplace;
        }
    }

    function replacePlayerTitle() {
        const titleElement = document.querySelector('a.ytp-title-link.yt-uix-sessionlink.ytp-title-fullerscreen-link');

        if (titleElement) {
            const titleText = titleElement.textContent || titleElement.innerText;
    
            if (typeof titleText === 'undefined' || !titleText.includes('|')) {
                return;
            }

            const titleReplace = spoilerTitle(titleText);
            if (titleReplace === "") {
                return;
            }

            titleElement.title = titleReplace;
            titleElement.textContent = titleReplace;
            titleElement.innerText = titleReplace;
        }
    }

    function spoilerBlockTabTitle() {
        const currentUrl = window.location.href;
        if (!currentUrl.includes("watch?v=")) {
            return;
        }

        let teams = getTeams(document.title);
        if (teams.length === 0) {
            return;
        }
        let [teamA, teamB] = teams;

        const non_spoiler_title = teamA + " vs. " + teamB;

        if (document.title !== non_spoiler_title) {
            document.title = non_spoiler_title;
        }
    }
    
    function spoilerBlockBody(){
        const currentUrl = window.location.href;
        if (currentUrl.includes("watch?v=")) {
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


