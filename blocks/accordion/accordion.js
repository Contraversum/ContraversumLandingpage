export default function decorate(block) {
    console.log('decorate accordion');

    // Create a new span element
    const span = document.createElement('span');
    span.className = 'icon-arrow';  // Set a class for styling in CSS

    // Find all question divs
    const questions = block.querySelectorAll('.accordion.block > div > div:nth-child(1)');

    // Append the span (which will contain the SVG via CSS) to each question
    questions.forEach(question => {
        question.appendChild(span.cloneNode(true));
    });
}