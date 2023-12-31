function appendBalls() {
  return new Promise((resolve) => {
    fetch('images/ball.svg')
      .then((response) => response.text())
      .then((data) => {
        const section = document.querySelector('.section.hero-container');

        const ballsContainer = document.createElement('div');
        ballsContainer.style.position = 'relative';
        section.prepend(ballsContainer);

        const elements = [];

        for (let i = 0; i < 3; i++) {
          const svgContainer = document.createElement('div');
          svgContainer.innerHTML = data;
          svgContainer.classList.add('ball');
          svgContainer.classList.add(`element-${i + 1}`);

          // Adjust the SVG's preserveAspectRatio attribute
          const svgElement = svgContainer.querySelector('svg');
          svgElement.setAttribute('preserveAspectRatio', 'none');

          ballsContainer.appendChild(svgContainer); // Append to the ballsContainer instead of the section
          elements.push(svgContainer);
        }

        resolve(elements);
      });
  });
}

export default function decorate(block) {
  const backgroundWrapper = document.createElement('div');
  const svgImg = document.createElement('img');
  svgImg.src = '/images/hero-background.svg';
  backgroundWrapper.appendChild(svgImg);

  block.prepend(backgroundWrapper);
  svgImg.alt = 'Hero background';
  svgImg.classList.add('background');

  appendBalls().then((elements) => {
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
      if (!hasScrolled) {
        hasScrolled = true;
        elements.forEach((el, index) => {
          // Check if the window width is greater than 768px
          if (window.innerWidth > 768) {
            const delay = (index + 1) * 0.35; // delay increment for each ball
            el.style.animationDelay = `${delay}s`;
          }

          el.classList.add('pop');
          el.addEventListener('animationend', () => {
            el.remove();
          });
        });
      }
    });
  });
}
