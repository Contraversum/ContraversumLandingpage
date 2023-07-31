export default function decorate(block) {
    console.log('text.js');

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
}
