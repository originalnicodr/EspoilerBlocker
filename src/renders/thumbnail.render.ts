import { getTeamBadge } from '../utils/getTeamBadge';
import { getTeamsByTitle } from '../utils/getTeamsByTitle';

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
  containerElement: HTMLElement,
  team_a: string,
  team_b: string,
  match_date: Date,
  total_score: undefined | number,
) => {
  // create basic structure
  const child = addBaseThumnailStyles(containerElement);

  addTeamsBadges(child, [team_a, team_b]);
  addInBetweenBadges(child, match_date, total_score);
  addRibbon(containerElement);
  addHoverEffect(containerElement);
};

function addBaseThumnailStyles(containerElement: HTMLElement) {
  // Create animated background layer
  const animatedBorder = document.createElement('div');
  Object.assign(animatedBorder.style, backgroundDivStyle);
  animatedBorder.className = 'background';

  // Create the inner "thumbnail" content
  const childElement = document.createElement('div');
  childElement.className = 'cool_thumbnail';
  Object.assign(childElement.style, childElementStyle);

  // Append both layers
  containerElement.appendChild(animatedBorder);
  containerElement.appendChild(childElement);

  // Add keyframe animation via a style tag once
  if (!document.getElementById('espn-blocker-thumbnail-spin-style')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'espn-blocker-thumbnail-spin-style';
    styleTag.innerHTML = `
    @keyframes espn-blocker-thumbnail-spin-style {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(styleTag);
  }

  return childElement;
}

function addTeamsBadges(container: HTMLDivElement, teams: string[]) {
  const imageContainer = document.createElement('div');
  Object.assign(imageContainer.style, {
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

  container.appendChild(imageContainer);

  for (const team of teams) {
    const image = document.createElement('img');
    image.alt = team + ' badge';
    image.src = getTeamBadge(team);

    Object.assign(image.style, { width: '30%', pointerEvents: 'none' } as Style);
    imageContainer.appendChild(image);
  }
}

function addInBetweenBadges(container: HTMLDivElement, match_date: Date | null, total_score: number | null) {
  const wrapper = document.createElement('div');
  // Some containers start with 0 width, so we need to set a minimum font size
  const base_font_size = container.offsetWidth == 0 ? 20 : container.offsetWidth / 10;
  Object.assign(wrapper.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    fontSize: `${base_font_size}px`,
  });

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
    const score_element = document.createElement('p');
    score_element.innerText = `(${total_score})`;
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
    wrapper.appendChild(score_element);
  }

  container.appendChild(wrapper);
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

function addHoverEffect(containerElement: HTMLElement) {
  const background = containerElement.querySelector('.background') as HTMLElement;
  const badges = containerElement.querySelectorAll('img');

  containerElement.addEventListener('mouseenter', () => {
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

  containerElement.addEventListener('mouseleave', () => {
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
