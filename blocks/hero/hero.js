function appendBalls() {
    fetch('images/ball.svg')
        .then(response => response.text())
        .then(data => {
            let section = document.querySelector('.section.hero-container');
            for (let i = 0; i < 3; i++) {
                let svgContainer = document.createElement('div');
                svgContainer.innerHTML = data;
                svgContainer.classList.add('ball');
                svgContainer.classList.add('element-' + (i + 1));

                // Adjust the SVG's preserveAspectRatio attribute
                let svgElement = svgContainer.querySelector('svg');
                svgElement.setAttribute('preserveAspectRatio', 'none');

                section.prepend(svgContainer);
            }
        });
}

export default function decorate(block) {
    const backgroundWrapper = document.createElement('div');
    const svgImg = document.createElement('img');
    svgImg.src = "/images/hero-background.svg";
    backgroundWrapper.appendChild(svgImg);

    block.prepend(backgroundWrapper);   
    svgImg.alt = "Hero background";
    svgImg.classList.add('background');

    const logo = document.createElement('img');
    logo.src = "/images/white-logo.svg";
    logo.classList.add('logo');
    logo.alt = "Logo";
    block.appendChild(logo);

    appendBalls();
}
  