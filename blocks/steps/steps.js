function wrapTextinDiv() {
    const targetDivs = document.querySelectorAll('.steps.block > div > div:first-child');
    targetDivs.forEach(targetDiv => {
        const pTags = targetDiv.querySelectorAll('p');
        // Create a new wrapper div
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'text-element';

        // Append the last two p tags to the new wrapper div in reversed order
        for (let i = 1; i >= 0; i--) {
            wrapperDiv.appendChild(pTags[pTags.length - 1 - i]);
        }
        // Append the new wrapper div to the target div
        targetDiv.appendChild(wrapperDiv);
    });
}

function addLines() {
    // Select all child divs of .steps.block
    const steps = document.querySelectorAll('.steps.block > div');
    
    // Loop through each div and check its index
    steps.forEach((step, index) => {
        // If this is the last div, don't append anything
        if (index === steps.length - 1) {
            return;
        }
        
        // Create an img element for the SVG
        const svgImg = document.createElement('img');

        // Depending on the index, set the src for the img
        if (index % 2 === 0) { // odd index (0-based)
            svgImg.src = "/images/even-line.svg";
        } else { // even index (0-based)
            svgImg.src = "/images/uneven-line.svg";
        }

        // Append the SVG img after the current div
        step.parentNode.insertBefore(svgImg, step.nextSibling);
    });
}

export default function decorate(block) {
    wrapTextinDiv();
    addLines();
}
