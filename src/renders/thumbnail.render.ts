import { getTeamBadge } from '../utils/getTeamBadge';
import { getTeamsByTitle } from '../utils/getTeamsByTitle';

type Style = Partial<CSSStyleDeclaration>;

const backgroundDivStyle: Style = {
  content: "''",
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  width: '200%',
  height: '200%',
  background: 'conic-gradient(from 0deg, #ff0000, #ffffff, #0066ff, #ff0000)',
  filter: 'blur(10px)',
  zIndex: '0',
  borderRadius: '0.5rem',
  animation: 'spin 4s linear infinite',
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
    @keyframes spin {
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
    top: '10%',
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
    fontSize: '40px',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    pointerEvents: 'none',
  } as Style);
  container.appendChild(betweenBadges);
}
