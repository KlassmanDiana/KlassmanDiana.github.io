/// _____модуль Поиска_____
export default function searchOnPage() {
    const cards = document.querySelectorAll('.goods .card');
    const search = document.querySelector('.search-wrapper_input');
    const btnSearch = document.querySelector('.search-btn');

    const searchFunc = () => {
        const searchText = new RegExp(search.value.trim(), 'i'); // удаление пробелов, игнорирование регистра
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
            }
        });
        search.value = '';
    };

    btnSearch.addEventListener('click', searchFunc);

};