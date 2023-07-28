function handleClick(event) {
    let target = event.target;

    if (target.nodeName === 'SPAN') {
        target = target.parentNode;
    }

    const parentDiv = target.parentNode;
    const answerDiv = parentDiv.querySelector(':nth-child(2)');
    const arrowIcon = target.querySelector('.icon-arrow');

    if (answerDiv.classList.contains('open')) {
        answerDiv.classList.remove('open');
        arrowIcon.classList.remove('rotated');
    } else {
        answerDiv.classList.add('open');
        arrowIcon.classList.add('rotated');
    }
}



export default function decorate(block) {
    const span = document.createElement('span');
    span.className = 'icon-arrow';  // Set a class for styling in CSS

    const questions = block.querySelectorAll('.accordion.block > div > div:nth-child(1)');

    // Append the span (which will contain the SVG via CSS) to each question
    questions.forEach(question => {
        question.appendChild(span.cloneNode(true));
        question.addEventListener('click', handleClick);
    });
}
