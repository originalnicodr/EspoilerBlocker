import { getTeamBadge } from '../utils/getTeamBadge';

export function addThumbnailElements(team_a: string, team_b: string, match_date: Date, total_goals: number, thumbnail_element: HTMLInputElement): void {
    if (thumbnail_element === undefined) {
      return;
    }

    const badge_a: string = getTeamBadge(team_a);
    const badge_b: string = getTeamBadge(team_b);

    let img_a, img_b;

    if (badge_a) {
      img_a = document.createElement('img');
      img_a.alt = team_a + 'Badge';
      img_a.src = badge_a;
      img_a.width = thumbnail_element.clientWidth * 0.2;
      img_a.style.height = 'auto';
      img_a.style.position = 'absolute';
      img_a.style.top = '35%';
      img_a.style.left = '20%';
      img_a.style.transform = 'translate(-50%, -50%)';
      img_a.style.pointerEvents = 'none';
      img_a.style.transition = 'opacity 0.3s';
      thumbnail_element.appendChild(img_a);
    }

    if (badge_b) {
      img_b = document.createElement('img');
      img_b.alt = badge_b + 'Badge';
      img_b.src = badge_b;
      img_b.width = thumbnail_element.clientWidth * 0.2;
      img_b.style.position = 'absolute';
      img_b.style.top = '35%';
      img_b.style.left = '80%';
      img_b.style.transform = 'translate(-50%, -50%)';
      img_b.style.pointerEvents = 'none';
      img_b.style.transition = 'opacity 0.3s';
      thumbnail_element.appendChild(img_b);
    }

    const between_badges = document.createElement('p');
    between_badges.innerText = '-';
    between_badges.style.position = 'absolute';
    between_badges.style.top = '25%';
    between_badges.style.left = '47%';
    between_badges.style.fontSize = '50px';
    between_badges.style.color = 'white';
    between_badges.style.pointerEvents = 'none';
    between_badges.style.transition = 'opacity 0.3s';
    thumbnail_element.appendChild(between_badges);

    const day = match_date.getDate();
    // Months are 0-indexed (0 = January, 1 = February, etc.)
    const month = match_date.getMonth() + 1;

    const match_date_element = document.createElement('p');
    match_date_element.innerText = `${day}/${month}`;
    match_date_element.style.position = 'absolute';
    match_date_element.style.top = '5%';
    match_date_element.style.left = '41%';
    match_date_element.style.textAlign = 'center';
    match_date_element.style.fontSize = '35px';
    match_date_element.style.color = 'white';
    match_date_element.style.pointerEvents = 'none';
    match_date_element.style.transition = 'opacity 0.3s';
    thumbnail_element.appendChild(match_date_element);

    const total_goals_element = document.createElement('p');
    total_goals_element.innerText = `(${total_goals})`;
    total_goals_element.style.position = 'absolute';
    total_goals_element.style.top = '45%';
    total_goals_element.style.left = '41%';
    total_goals_element.style.textAlign = 'center';
    total_goals_element.style.fontSize = '35px';
    total_goals_element.style.color = 'white';
    total_goals_element.style.pointerEvents = 'none';
    total_goals_element.style.transition = 'opacity 0.3s';
    //thumbnail_element.appendChild(total_goals_element);

    thumbnail_element.addEventListener('mouseenter', () => {
      img_a.style.opacity = '0';
      img_b.style.opacity = '0';
      between_badges.style.opacity = '0';
      match_date_element.style.opacity = '0';
      total_goals_element.style.opacity = '0';
    });

    thumbnail_element.addEventListener('mouseleave', () => {
      img_a.style.opacity = '100%';
      img_b.style.opacity = '100%';
      between_badges.style.opacity = '100%';
      match_date_element.style.opacity = '100%';
      total_goals_element.style.opacity = '100%';
    });
  }
