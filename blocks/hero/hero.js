export default function decorate(block) {
    const backgroundWrapper = document.createElement('div');
    const svgImg = document.createElement('img');
    svgImg.src = "/images/hero-background.svg";
    backgroundWrapper.appendChild(svgImg);

    block.prepend(backgroundWrapper);   
    svgImg.classList.add('background');
}
  