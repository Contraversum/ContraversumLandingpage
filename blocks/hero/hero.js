export default function decorate(block) {
    const backgroundWrapper = document.createElement('div');
    const svgImg = document.createElement('img');
    svgImg.src = "/images/hero-background.svg";
    backgroundWrapper.appendChild(svgImg);

    block.prepend(backgroundWrapper);   
    svgImg.classList.add('background');

    const logo = document.createElement('img');
    logo.src = "/images/white-logo.svg";
    logo.classList.add('logo');
    block.appendChild(logo);
}
  