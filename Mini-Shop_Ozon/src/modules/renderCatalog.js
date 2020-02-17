export default function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const category = new Set(); // уникальные значения категорий
    const catalogBtn = document.querySelector('.catalog-button');
    const catalogWrapper = document.querySelector('.catalog');

    cards.forEach((card) => {
        category.add(card.dataset.category); // получить уникальные категории
    });
    category.forEach((item) => { // перебрать категории
        const li = document.createElement('li'); // создать список категории
        li.textContent = item;
        catalogList.appendChild(li);
    });
    const allLi = catalogList.querySelectorAll('li');

    catalogBtn.addEventListener('click', (e) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (e.target.tagName === 'LI') {
           cards.forEach((card) => {
            if (card.dataset.category === e.target.textContent) {
                card.parentNode.style.display = ''
            } else {
                card.parentNode.style.display = 'none'
            }
           }) 
           allLi.forEach((item) => { // перебор li и добавление/удаление класса active
               if (item === e.target) {
                   item.classList.add('active')
               } else {
                    item.classList.remove('active')
               }
           })
           filter();
        }
    });
}