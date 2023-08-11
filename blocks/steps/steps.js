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

export default function decorate(block) {
    wrapTextinDiv();
}
