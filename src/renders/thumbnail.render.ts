import { getTeamBadge } from '../utils/getTeamBadge';

type Style = Partial<CSSStyleDeclaration>;

const backgroundGradient = 'conic-gradient(from 0deg, #ff0000, black, #0066ff, #ff0000)';
const backgroundHoverGradient = 'conic-gradient(from 0deg, #fd4444, #fd4444, #fd4444,#8745fa,#ca47f5,#fd4444)';

const backgroundDivStyle: Style = {
  content: "''",
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  width: '200%',
  height: '200%',
  background: backgroundGradient,
  filter: 'blur(10px)',
  zIndex: '0',
  borderRadius: '0.5rem',
  animation: 'espn-blocker-thumbnail-spin-style 4s linear infinite',
  pointerEvents: 'none',
};

// borders between the animated background and the main thumbnail content
const childElementBordersInPixels = 3;

const childElementStyle: Style = {
  position: 'absolute',
  width: `calc(100% - ${childElementBordersInPixels * 2}px)`,
  height: `calc(100% - ${childElementBordersInPixels * 2}px)`,
  top: `${childElementBordersInPixels}px`,
  left: `${childElementBordersInPixels}px`,
  borderRadius: 'inherit',
  backgroundColor: '#1F1F1F',
  pointerEvents: 'none',
};

export const thumbnailRender = (
  container_element: HTMLElement,
  team_a: string,
  team_b: string,
  match_date: Date,
  total_score: undefined | number,
): HTMLElement => {
  // This element holds all added stuff so we can easily remove it later.
  const wrapper = document.createElement('div');
  wrapper.className = 'espn-spoiler-wrapper';
  Object.assign(wrapper.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  });

  container_element.appendChild(wrapper);

  const child: HTMLElement = addBaseThumnailStyles(wrapper);
  addTeamsBadges(child, [team_a, team_b]);
  addInBetweenBadges(child, match_date, total_score);
  addRibbon(wrapper);
  addHoverEffect(container_element);

  return wrapper;
};

function addBaseThumnailStyles(wrapper: HTMLElement): HTMLElement {
  const animated_border = document.createElement('div');
  Object.assign(animated_border.style, backgroundDivStyle);
  animated_border.className = 'background';

  const child_element = document.createElement('div');
  child_element.className = 'cool_thumbnail';
  Object.assign(child_element.style, childElementStyle);

  wrapper.appendChild(animated_border);
  wrapper.appendChild(child_element);

  // Add keyframe animation via a style tag once
  if (!document.getElementById('espn-blocker-thumbnail-spin-style')) {
    const style_tag = document.createElement('style');
    style_tag.id = 'espn-blocker-thumbnail-spin-style';
    style_tag.innerHTML = `
    @keyframes espn-blocker-thumbnail-spin-style {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }`;
    document.head.appendChild(style_tag);
  }

  return child_element;
}

function addTeamsBadges(container: HTMLElement, teams: string[]) {
  const image_container = document.createElement('div');
  Object.assign(image_container.style, {
    display: 'flex',
    position: 'absolute',
    height: '80%',
    top: '13%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    pointerEvents: 'none',
    filter: 'drop-shadow(rgb(10, 10, 10) 0px 6px 10px)',
  } as Style);

  container.appendChild(image_container);

  for (const team of teams) {
    const image = document.createElement('img');
    image.alt = team + ' badge';
    image.src = getTeamBadge(team);

    Object.assign(image.style, { width: '30%', pointerEvents: 'none' } as Style);
    image_container.appendChild(image);
  }
}

function addInBetweenBadges(container: HTMLElement, match_date: Date | null, total_score: number | null) {
  const wrapper = document.createElement('div');
  // Some containers start with 0 width, so we need to set a minimum font size
  const base_font_size = container.offsetWidth === 0 ? 20 : container.offsetWidth / 10;
  Object.assign(wrapper.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    fontSize: `${base_font_size}px`,
  });
  wrapper.className = 'espn-spoilerblocker-middle-elements';

  const vs_element = document.createElement('p');
  vs_element.innerText = 'vs';
  Object.assign(vs_element.style, {
    position: 'absolute',
    top: '50%',
    left: '0',
    width: '100%',
    textAlign: 'center',
    fontSize: '1em',
    color: 'white',
    transform: 'translateY(-50%)',
    margin: '0',
    pointerEvents: 'none',
  });
  wrapper.appendChild(vs_element);

  if (match_date) {
    const day = match_date.getDate();
    const month = match_date.getMonth() + 1;
    const date_element = document.createElement('p');
    date_element.innerText = `${day}/${month}`;
    Object.assign(date_element.style, {
      position: 'absolute',
      bottom: '42.5%',
      left: '0',
      transform: 'translateY(-100%)',
      width: '100%',
      textAlign: 'center',
      fontSize: '1.25em',
      color: 'white',
      margin: '0',
      pointerEvents: 'none',
    });
    wrapper.appendChild(date_element);
  }

  if (total_score) {
    const score_element = createScoreElement(total_score);
    wrapper.appendChild(score_element);
  }

  container.appendChild(wrapper);
}

export function createScoreElement(score: number): HTMLElement {
  const score_element = document.createElement('p');
  score_element.innerText = `(${score})`;
  Object.assign(score_element.style, {
    position: 'absolute',
    top: '55%',
    left: '0',
    transform: 'translateY(100%)',
    width: '100%',
    textAlign: 'center',
    fontSize: '0.75em',
    color: 'white',
    margin: '0',
    pointerEvents: 'none',
  });
  score_element.className = 'espn-spoilerblocker-total-score';
  return score_element;
}

function addRibbon(container: HTMLElement) {
  if (container.getBoundingClientRect().width < 300) {
    // do not add the ribbon on small thumbnails
    return;
  }

  // Create the ribbon element
  const ribbon = document.createElement('div');
  ribbon.innerText = 'SPOILER BLOCKED';
  Object.assign(ribbon.style, {
    position: 'absolute',
    top: '25px',
    left: '-51px',
    transform: 'rotate(-45deg)',
    backgroundColor: '#ff0000',
    color: 'white',
    padding: '6px 48px',
    fontSize: 'clamp(0.4em, 2vw, 0.9em)', // scales based on container width
    fontWeight: 'bold',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  });

  container.appendChild(ribbon);
}

function addHoverEffect(container_element: HTMLElement) {
  const wrapper = container_element.querySelector('.espn-spoiler-wrapper') as HTMLElement;
  const background = wrapper?.querySelector('.background') as HTMLElement;
  const badges = wrapper?.querySelectorAll('img') || [];

  // Helper to detect real "entry" and "exit" from the whole container
  const isLeavingOrEnteringFromOutside = (e: MouseEvent) =>
    !container_element.contains(e.relatedTarget as Node);

  container_element.addEventListener('mouseover', (e) => {
    if (!isLeavingOrEnteringFromOutside(e)) return;

    if (background) {
      background.style.animationDuration = '8s'; // Slow down the spin
      background.style.filter = 'blur(14px)';
      background.style.background = backgroundHoverGradient;
    }

    badges.forEach((img) => {
      img.style.transform = 'scale(1.1)';
      img.style.transition = 'transform 0.3s ease';
    });
  });

  container_element.addEventListener('mouseout', (e) => {
    if (!isLeavingOrEnteringFromOutside(e)) return;

    if (background) {
      background.style.animationDuration = '4s'; // Reset spin speed
      background.style.filter = 'blur(10px)';
      background.style.background = backgroundGradient;
    }

    badges.forEach((img) => {
      img.style.transform = 'scale(1)';
    });
  });
}
