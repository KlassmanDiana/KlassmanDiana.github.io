/// _____модуль Работа с корзиной_____
export default function workWithBasket() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const btnCloseCart = document.querySelector('.cart-close');
    const btnAddInCart = document.querySelector('.btn');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const goods = document.querySelector('.goods');
    const cartEmpty = document.getElementById('cart-empty');
    const counter = document.querySelector('.counter');
    const totalPrice = document.querySelector('.cart-total span');

    /// открытие корзины
    const openCart = () => {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden' // запрет прокрутки при открытой корзине
    };

    /// закрытие корзины
    const closeCart = () => {
        modalCart.style.display = 'none';
        document.body.style.overflow = ''
    };

    /// отображение количества товаров в корзине
    const showCountandPrice = () => {
        const count = cartWrapper.querySelectorAll('.card'); // сколько карточек в обертке
        counter.textContent = count.length; // вывести количество карточек в корзине
        if (count.length) {
            cartEmpty.remove(); //удаление надписи Ваша корзина пуста
        } else {
            cartWrapper.appendChild(cartEmpty); // добавление надписи Ваша корзина пуста
        }

        const cardsPrice = cartWrapper.querySelectorAll('.card-price'); // получить цены всех товаров из корзины
        let sum = 0;
        cardsPrice.forEach((price) => {
            let prices = parseFloat(price.textContent); // получить чистое число
            sum += prices;
        });
        totalPrice.textContent = sum; // записать общую сумму
    };

    /// добавление/удаление товара в корзину
    const addBasket = card => {
        const cardClone = card.cloneNode(true); // клонирование карточки
        cartWrapper.appendChild(cardClone); // добавление карточки в корзину

        const btnRemove = cardClone.querySelector('.btn'); // переименование кнопки карточки в корзине
        btnRemove.textContent = 'Удалить из корзины';
        btnRemove.addEventListener('click', () => {
            cardClone.remove(); // удалить карточку из корзины
            showCountandPrice(); // пересчитать общую стоимость в корзине
        })
    };

    /// делегирование Добавление товара в корзину
    const handlerCart = e => {
        if (e.target.classList.contains('btn')) { // нажата кнопка Добавить в корзину?
            const card = e.target.closest('.card') // поиск родителя кнопки - карточки
            addBasket(card) // добавить карточку в корзину
            showCountandPrice(); // посчитать количество товаров в корзине
        }
    };

    btnCart.addEventListener('click', openCart); // открытие окна корзины
    btnCloseCart.addEventListener('click', closeCart); // закрытие окна корзины
    goods.addEventListener('click', handlerCart); // делегированиие 
};