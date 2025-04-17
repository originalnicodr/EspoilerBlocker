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
};

export const thumbnailRender = (containerElement: HTMLElement, title: HTMLElement) => {
  // create basic structure
  const child = addBaseThumnailStyles(containerElement);

  // update title
  const teams = getTeamsByTitle(title.textContent || title.innerText);
  title.innerText = `${teams.at(0)} vs ${teams.at(1)}`;

  addTeamsBadges(child, teams);
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
    top: '17%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    pointerEvents: 'none',
  } as Style);

  container.appendChild(imageContainer);

  for (const team of teams) {
    const image = document.createElement('img');
    image.alt = team + ' badge';
    image.src = getTeamBadge(team);

    Object.assign(image.style, { width: '30%', pointerEvents: 'none' } as Style);
    imageContainer.appendChild(image);
  }

  const betweenBadges = document.createElement('p');
  betweenBadges.innerText = 'vs';
  Object.assign(betweenBadges.style, {
    top: '45%',
    fontSize: '18px',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    pointerEvents: 'none',
  } as Style);
  container.appendChild(betweenBadges);
}

function addRibbon(container: HTMLElement) {
  const baseStyle: Style = {
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
  };

  // Create the ribbon element
  const ribbon = document.createElement('div');
  ribbon.innerText = 'SPOILER BLOCKED';
  Object.assign(ribbon.style, baseStyle);

  if (container.getBoundingClientRect().width < 220) {
    console.log('aca es todo chiquito');
    // in case the element is small, move the ribbon a bit
    ribbon.style.top = '14px';
    ribbon.style.left = '-47px';
    ribbon.style.transform = 'rotate(330deg)';
    ribbon.style.fontSize = '8px';
  }

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
