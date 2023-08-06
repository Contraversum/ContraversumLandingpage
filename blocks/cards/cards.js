import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;

    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';

        // Wrap the first three children of cards-card-body in a wrapper div
        const wrapper = document.createElement('div');
        wrapper.className = 'top-elements';
        for (let i = 0; i < 3 && div.children.length > 0; i++) {
          wrapper.append(div.children[0]); // move first child to wrapper
        }
        if (wrapper.children.length > 0) {
          div.insertBefore(wrapper, div.firstChild);
        }
      }
    });

    ul.append(li);
  });

  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
