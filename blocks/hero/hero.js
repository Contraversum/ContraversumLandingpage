import { animateElements } from '../../scripts/lib-franklin.js'

function appendBalls() {
  fetch('images/ball.svg')
    .then((response) => response.text())
    .then((data) => {
      const section = document.querySelector('.section.hero-container');
      for (let i = 0; i < 3; i++) {
        const svgContainer = document.createElement('div');
        svgContainer.innerHTML = data;
        svgContainer.classList.add('ball');
        svgContainer.classList.add(`element-${i + 1}`);

        // Adjust the SVG's preserveAspectRatio attribute
        const svgElement = svgContainer.querySelector('svg');
        svgElement.setAttribute('preserveAspectRatio', 'none');

        section.prepend(svgContainer);
      }
    });
}

const SCROLL_THRESHOLD = 500;

function handleScroll() {
  const scrollTop = window.scrollY;

  // Adjust these factors to change the speed and direction of the animation
  const factor1 = 0.3;
  const factor2 = 0.05;
  const factor3 = 0.1;

  const ball1 = document.querySelector('.ball.element-1');
  const ball2 = document.querySelector('.ball.element-2');
  const ball3 = document.querySelector('.ball.element-3');

  // Using both translateY and translateX to move diagonally
  ball1.style.transform = `translate(${scrollTop * factor1}px, ${scrollTop * factor1}px)`;
  ball2.style.transform = `translate(${scrollTop * factor2}px, ${scrollTop * factor2}px)`;
  ball3.style.transform = `translate(${scrollTop * factor3}px, ${scrollTop * factor3}px)`;

  if (scrollTop > SCROLL_THRESHOLD) {
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', monitorScrollPosition); // Start monitoring again
  }
}

function monitorScrollPosition() {
  if (window.scrollY <= SCROLL_THRESHOLD) {
    window.addEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', monitorScrollPosition); // Stop monitoring once re-added
  }
}

window.addEventListener('scroll', handleScroll);

export default function decorate(block) {
  const backgroundWrapper = document.createElement('div');
  const svgImg = document.createElement('img');
  svgImg.src = '/images/hero-background.svg';
  backgroundWrapper.appendChild(svgImg);

  block.prepend(backgroundWrapper);
  svgImg.alt = 'Hero background';
  svgImg.classList.add('background');

  const logo = document.createElement('img');
  logo.src = '/images/white-logo.svg';
  logo.classList.add('logo');
  logo.alt = 'Logo';
  block.appendChild(logo);

  appendBalls().then(elements => {
    animateElements(elements, [0.3, 0.05, 0.1]);
  });
}
