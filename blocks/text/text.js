function addSVGs() {
  let promise1 = fetch("images/pink-background.svg")
    .then((response) => response.text())
    .then((data) => {
      let section = document.querySelector(
        ".section.pink-background.text-container"
      );
      let svgContainer = document.createElement("div");
      svgContainer.innerHTML = data;

      // Adjust the SVG's preserveAspectRatio attribute
      let svgElement = svgContainer.querySelector("svg");
      svgElement.setAttribute("preserveAspectRatio", "none");
      svgElement.classList.add("background");

      section.prepend(svgContainer);
    });

  const elements = [];
  let promise2 = fetch("images/ball.svg")
    .then((response) => response.text())
    .then((data) => {
      let section = document.querySelector(
        ".section.pink-background.text-container"
      );
      for (let i = 0; i < 3; i++) {
        let svgContainer = document.createElement("div");
        svgContainer.innerHTML = data;
        svgContainer.classList.add("ball");
        svgContainer.classList.add("element-" + (i + 1));

        // Adjust the SVG's preserveAspectRatio attribute
        let svgElement = svgContainer.querySelector("svg");
        svgElement.setAttribute("preserveAspectRatio", "none");

        section.prepend(svgContainer);
        elements.push(svgContainer); // push the new element to the array
      }
    });

  return Promise.all([promise1, promise2]).then(() => elements); // return the elements after promises are resolved
}

export default function decorate(block) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("bottom-icons");

  // Iterate over the children of the block, skipping the first one
  for (let i = 1; i < block.children.length; i++) {
    const child = block.children[i];
    wrapperDiv.appendChild(child.cloneNode(true));
  }

  // Remove the children from the block that have been wrapped
  while (block.children.length > 1) {
    block.removeChild(block.children[1]);
  }
  block.appendChild(wrapperDiv);

  if (block.classList.contains("no-image")) {
    addSVGs().then((elements) => {
      let section = document.querySelector(
        ".section.pink-background.text-container"
      );

      window.addEventListener("scroll", () => {
        // Check if the user has scrolled to the .pink-background section
        let sectionTop = section.getBoundingClientRect().top;

        // This means that the top of the .pink-background section is now visible in the viewport
        if (
          sectionTop <= window.innerHeight &&
          !section.classList.contains("animated")
        ) {
          section.classList.add("animated"); // This class is used to ensure that the animation runs only once.

          elements.forEach((el, index) => {
            const delay = (index + 1) * 0.75;
            el.style.animationDelay = `${delay}s`;
            el.classList.add("pop");
            el.addEventListener("animationend", () => {
              el.remove();
            });
          });
        }
      });
    });
  }
  // Grab all the button-like elements.
  const buttons = document.querySelectorAll(".bottom-icons > div");

  // Add a click event listener to each button-like element.
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Find the target element using the data-id attribute.
      const targetSection = document.querySelector(
        '[data-id="bottom-call-to-action"]'
      );
      const positionToScroll =
        targetSection.getBoundingClientRect().top + window.scrollY - 200;

      // Use window.scrollTo method to scroll to the adjusted position.
      window.scrollTo({
        top: positionToScroll,
        behavior: "smooth",
      });
    });
  });
}
