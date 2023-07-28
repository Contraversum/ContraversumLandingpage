function handleClick(event) {
    console.log('handleClick()');
    
    let target = event.target;
    
    // if the target is span, change it to its parent (the question div)
    if (target.nodeName === 'SPAN') {
        target = target.parentNode;
    }
    
    const parentDiv = target.parentNode;
    const answerDiv = parentDiv.querySelector(':nth-child(2)');
    
    // get the computed style of the answer div
    const computedStyle = window.getComputedStyle(answerDiv);
    
    if (computedStyle.display === "none") {
        console.log('showing answer');
        answerDiv.style.display = "block";
    } else {
        console.log('hiding answer');
        answerDiv.style.display = "none";
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
