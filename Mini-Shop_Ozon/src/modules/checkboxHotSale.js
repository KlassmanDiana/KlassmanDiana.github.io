/// _____модуль Фильтрация_____
import filter from './filter';
export default function checkboxHotSale() {
    const checkbox = document.getElementById('discount-checkbox');
    const cards = document.querySelectorAll('.goods .card');
    const min = document.getElementById('min');
    const max = document.getElementById('max');

    /// кастомный чек-бокс Акция
    const onchangeCheckbox = () => {
        if (checkbox.checked) {
            document.querySelector('.filter-check_checkmark').classList.add('checked')
            cards.forEach((card) => {
                if (card.querySelector('.card-sale')) {
                    card.style.display = 'flex'
                } else {
                    card.parentNode.style.display = 'none'
                }
            })
        } else {
            document.querySelector('.filter-check_checkmark').classList.remove('checked')
            cards.forEach((card) => {
                card.parentNode.style.display = 'flex'
            })
        }
    };

    checkbox.addEventListener('change', onchangeCheckbox); // чек-бокс Акция
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
};