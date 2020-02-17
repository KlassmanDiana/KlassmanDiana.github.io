document.addEventListener('DOMContentLoaded', function() {
    // ---Переменные---
    const search = document.querySelector('.search');
    const cartBtn = document.getElementById('cart');
    const wishlistBtn = document.getElementById('wishlist');
    const goodsWrapper = document.querySelector('.goods-wrapper');
    const cart = document.querySelector('.cart');
    const category = document.querySelector('.category');
    const cardCounter = cartBtn.querySelector('.counter');
    const wishListCounter = wishlistBtn.querySelector('.counter');
    const cartWrapper = document.querySelector('.cart-wrapper');

     //  товары в выбранном/корзине
    const wishList = [];
    const goodsBasket = {};

    //  спиннер загрузки
    const loading = (nameFunction) => {
        const spinner = `<div id="spinner"><div class="spinner-loading"><div><div><div></div>
        </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>`

        if (nameFunction === 'renderCard') {
            goodsWrapper.innerHTML = spinner;
        };
        if (nameFunction === 'renderCart') {
            cartWrapper.innerHTML = spinner;
        };
    };
    
    //  запрос на сервер
    const getGoods = (handler, filter) => {
        loading(handler.name);
        fetch('db/db.json') // fetch возвращает промис
            .then(data => data.json())
            .then(filter)
            .then(handler);
    }  

    //  генерация карточек
    const createCardGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
        card.innerHTML = `<div class="card">
                            <div class="card-img-wrapper">
                                <img class="card-img-top" src="${img}" alt="">
                                <button class="card-add-wishlist ${wishList.includes(id) ? 'active' : '' }"
                                    data-goods-id = "${id}" >
                                </button>
                            </div>
                            <div class="card-body justify-content-between">
                                <a href="#" class="card-title">${title}</a>
                                <div class="card-price">${price}</div>
                                <div>
                                    <button class="card-add-cart" data-goods-id = "${id}">Добавить в корзину</button>
                                </div>
                            </div>
                        </div>`
        return card;
    };

    //  формирование карточек из БД
    const renderCard = items => {
        goodsWrapper.textContent = '';

        if (items.length) {
            items.forEach(item => {
                const {id, title, price, imgMin} = item; // деструктуризация и присвоение
                goodsWrapper.appendChild(
                    createCardGoods(id, title, price, imgMin));
            });
        } else {
            goodsWrapper.textContent = 'Товара по вашему запросу нет';
        }
        
    };

    // рендер товаров в корзине - Cart
    // генерация карточек в корзине
    const createCartGoods = (id, title, price, img) => {
        const card = document.createElement('div');
        card.className = 'goods';
        card.innerHTML = `<div class="goods-img-wrapper">
                            <img class="goods-img" src="${img}" alt="">

                        </div>
                        <div class="goods-description">
                            <h2 class="goods-title">${title}</h2>
                            <p class="goods-price">${price} ₽</p>

                        </div>
                        <div class="goods-price-count">
                            <div class="goods-trigger">
                                <button class="goods-add-wishlist ${wishList.includes(id) ? 'active' : '' }" data-goods-id = "${id}" ></button>
                                <button class="goods-delete" data-goods-id = "${id}"></button>
                            </div>
                            <div class="goods-count">${goodsBasket[id]}</div>
                        </div>`
        return card;
    };

    //  формирование карточек в корзину из БД
    const renderCart = items => {
        cartWrapper.textContent = '';

        if (items.length) {
            items.forEach(item => {
                const {id, title, price, imgMin} = item; // деструктуризация и присвоение
                cartWrapper.appendChild(
                    createCartGoods(id, title, price, imgMin));
            });
        } else {
            cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пока пуста</div>';
        }
        
    };

    //  добавление карточек в вертску
    // goodsWrapper.appendChild(createCardGoods(10000, 'Дартс', 2000, 'img/temp/archer.jpg'));
    // goodsWrapper.appendChild(createCardGoods(10001, 'Фламинго', 3000, 'img/temp/flamingo.jpg'));
    // goodsWrapper.appendChild(createCardGoods(10002, 'Носки', 1000, 'img/temp/socks.jpg'));

    // подсчет суммы в корзине
    const calcTotalPrice = goods => {
        let summ = 0;
        for (const item of goods) {
            summ += item.price * goodsBasket[item.id];
        }
        cart.querySelector('.cart-total > span').textContent = summ.toFixed(2);
    }
    
    const showCart = goods => {
        const basketGoods = goods.filter(item => goodsBasket.hasOwnProperty(item.id));
        calcTotalPrice(basketGoods);
        return basketGoods;
    }

    // отображение количества лайков
    const checkCount = () => {
        wishListCounter.textContent = wishList.length;
        cardCounter.textContent = Object.keys(goodsBasket).length;
    };


    //  открытие окна корзины
    const openCart = (e) => {
        e.preventDefault();
        cart.style.display = 'flex';
        getGoods(renderCart, showCart);
    };

    //  закрытие окна корзины
    const closeCart = (e) => {
        if (e.target.classList.contains('cart') || e.target.classList.contains('cart-close') ) {
            cart.style.display = 'none';
        } else {
            return;
        }
    };

    //  имитация фильтрации карточек
    const randomSort = item =>  item.sort(() => Math.random() - 0.5);
    
    //  выбор категории и отображение карточек категории
    const chooseCategory = e => {
        e.preventDefault();
        if (e.target.classList.contains('category-item')) {
            const category = e.target.dataset.category;
            getGoods(renderCard, goods => goods.filter(item => item.category.includes(category)));
        }
    }

    //  поиск товаров
    const searchGoods = e => {
        e.preventDefault();
        const input = e.target.elements.searchGoods;
        const inputValue = input.value.trim(); //без пробелов
        if (inputValue !== '') {
            const searchString = new RegExp(inputValue, 'i');
            // console.log(searchString);
            // let reg = /xiaomi/i;
            getGoods(renderCard, goods => goods.filter(item => searchString.test(item.title)));
        } else {
            search.classList.add('error'); // подсветка пустого поля ввода
            setTimeout( () => {
                search.classList.remove('error');
            }, 2000);
        }

        input.value = ''; // очищение поля ввода
    };
    
    // cookie для корзины
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
      }

      const cookieQuery = get => {
        if (get) {
            if (getCookie('goodsBasket')) {
                Object.assign(goodsBasket,JSON.parse(getCookie('goodsBasket')));
            }
        } else {
            document.cookie = `goodsBasket= ${JSON.stringify(goodsBasket)}; max-age=86400e3`;
        }
        checkCount();
      };
    
    const storageQuery = get => {
        if (get) {
            if (localStorage.getItem('wishList')) {
                wishList.splice(0, 0,...JSON.parse(localStorage.getItem('wishList'))) //spread
                // wishList.push(...JSON.parse(localStorage.getItem('wishList')))
                // JSON.parse(localStorage.getItem('wishList')).forEach(id => wishList.push(id));
            }
        } else {
            localStorage.setItem('wishList', JSON.stringify(wishList));
        }
        checkCount();
    };


    //  добавление/удаление id товара в массиве
    const toggleWishList = (id, elem) => {
        if (wishList.includes(id)) {
            wishList.splice(wishList.indexOf(id), 1)
            elem.classList.remove('active')
        } else {
            wishList.push(id);
            elem.classList.add('active')    
        }
        checkCount();
        storageQuery();
    };

    // добавление/удаление из корзины
    const addBasket = id => {
        if (goodsBasket[id]) {
            goodsBasket[id] += 1
        } else {
            goodsBasket[id] = 1
        }
        console.log(goodsBasket);
        checkCount();
        cookieQuery();
    }

    //  получение id товара
    const handlerGoods = e => {
        const target = e.target;
        if (target.classList.contains('card-add-wishlist')) {
            toggleWishList(target.dataset.goodsId, target);
        };

        if (target.classList.contains('card-add-cart')) {
            addBasket(target.dataset.goodsId);
        }

    };

    // отображение выбранных товаров
    const showWishList = () => {
        getGoods(renderCard, goods => goods.filter(item => wishList.includes(item.id)));
    };
 
    // удаление товара из корзины
    const removeGoods = id => {
        delete goodsBasket[id];
        checkCount();
        cookieQuery();
        getGoods(renderCart, showCart);
    }

    // проставление лайков в корзине, удаление товара из корзины
    const handlerBasket = e => {
        const target = e.target;
        if (target.classList.contains('goods-add-wishlist')) {
            toggleWishList(target.dataset.goodsId, target);
        };

        if (target.classList.contains('goods-delete')) {
            removeGoods(target.dataset.goodsId);
        };
    };

    // инициализация
    getGoods(renderCard, randomSort);
    storageQuery(true);
    cookieQuery(true);

    // ---Обработчики событий---
    cartBtn.addEventListener('click', openCart);
    cart.addEventListener('click', closeCart);
    category.addEventListener('click', chooseCategory);
    search.addEventListener('submit', searchGoods);
    goodsWrapper.addEventListener('click', handlerGoods);
    wishlistBtn.addEventListener('click', showWishList);
    cartWrapper.addEventListener('click', handlerBasket);

}); 