function appendBalls() {
  return new Promise((resolve) => {
    fetch('images/ball.svg')
      .then((response) => response.text())
      .then((data) => {
        const section = document.querySelector('.section.hero-container');
        const elements = [];

        for (let i = 0; i < 3; i++) {
          const svgContainer = document.createElement('div');
          svgContainer.innerHTML = data;
          svgContainer.classList.add('ball');
          svgContainer.classList.add(`element-${i + 1}`);

          // Adjust the SVG's preserveAspectRatio attribute
          const svgElement = svgContainer.querySelector('svg');
          svgElement.setAttribute('preserveAspectRatio', 'none');

          section.prepend(svgContainer);
          elements.push(svgContainer);
        }

        resolve(elements);
      });
  });
}

function animateHeroElements(elements, velocities, scrollThreshold = 500) { // Default value of 500
  if (elements.length !== velocities.length) {
    console.error('The number of elements must match the number of velocities');
    return;
  }

  function handleScroll() {
    const scrollTop = window.scrollY;

    elements.forEach((el, index) => {
      const velocity = velocities[index];
      el.style.transform = `translate(${scrollTop * velocity}px, ${scrollTop * velocity}px)`;
    });

    if (scrollTop > scrollThreshold) {
      window.removeEventListener('scroll', handleScroll);
      window.addEventListener('scroll', monitorScrollPosition);
    }
  }

  function monitorScrollPosition() {
    if (window.scrollY <= scrollThreshold) {
      window.addEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', monitorScrollPosition);
    }
  }

  window.addEventListener('scroll', handleScroll);
}

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

  appendBalls().then((elements) => {
    animateHeroElements(elements, [0.3, 0.05, 0.1]);
  });
}
