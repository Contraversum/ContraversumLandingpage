function addSVGs() {
    fetch('images/pink-background.svg')
        .then(response => response.text())
        .then(data => {
            let section = document.querySelector('.section.pink-background.text-container');
            let svgContainer = document.createElement('div');
            svgContainer.innerHTML = data;

            // Adjust the SVG's preserveAspectRatio attribute
            let svgElement = svgContainer.querySelector('svg');
            svgElement.setAttribute('preserveAspectRatio', 'none');
            svgElement.classList.add('background');

            section.prepend(svgContainer);
        });

    // fetch ball.svg from images and append it to the same div as the SVG background
    fetch('images/ball.svg')
        .then(response => response.text())
        .then(data => {
            let section = document.querySelector('.section.pink-background.text-container');
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
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('bottom-icons');

    // Iterate over the children of the block, skipping the first one
    for (let i = 1; i < block.children.length; i++) {
        const child = block.children[i];

        // Append each child to the new wrapper div
        wrapperDiv.appendChild(child.cloneNode(true));
    }

    // Remove the children from the block that have been wrapped
    while (block.children.length > 1) {
        block.removeChild(block.children[1]);
    }
    block.appendChild(wrapperDiv);

    if (block.classList.contains('no-image')) {
        addSVGs();
    }
}