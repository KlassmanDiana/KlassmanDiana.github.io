"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  // ---Переменные---
  var search = document.querySelector('.search');
  var cartBtn = document.getElementById('cart');
  var wishlistBtn = document.getElementById('wishlist');
  var goodsWrapper = document.querySelector('.goods-wrapper');
  var cart = document.querySelector('.cart');
  var category = document.querySelector('.category');
  var cardCounter = cartBtn.querySelector('.counter');
  var wishListCounter = wishlistBtn.querySelector('.counter');
  var cartWrapper = document.querySelector('.cart-wrapper'); //  товары в выбранном/корзине

  var wishList = [];
  var goodsBasket = {}; //  спиннер загрузки

  var loading = function loading(nameFunction) {
    var spinner = "<div id=\"spinner\"><div class=\"spinner-loading\"><div><div><div></div>\n        </div><div><div></div></div><div><div></div></div><div><div></div></div></div></div></div>";

    if (nameFunction === 'renderCard') {
      goodsWrapper.innerHTML = spinner;
    }

    ;

    if (nameFunction === 'renderCart') {
      cartWrapper.innerHTML = spinner;
    }

    ;
  }; //  запрос на сервер


  var getGoods = function getGoods(handler, filter) {
    loading(handler.name);
    fetch('db/db.json') // fetch возвращает промис
    .then(function (data) {
      return data.json();
    }).then(filter).then(handler);
  }; //  генерация карточек


  var createCardGoods = function createCardGoods(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'card-wrapper col-12 col-md-6 col-lg-4 col-xl-3 pb-3';
    card.innerHTML = "<div class=\"card\">\n                            <div class=\"card-img-wrapper\">\n                                <img class=\"card-img-top\" src=\"".concat(img, "\" alt=\"\">\n                                <button class=\"card-add-wishlist ").concat(wishList.includes(id) ? 'active' : '', "\"\n                                    data-goods-id = \"").concat(id, "\" >\n                                </button>\n                            </div>\n                            <div class=\"card-body justify-content-between\">\n                                <a href=\"#\" class=\"card-title\">").concat(title, "</a>\n                                <div class=\"card-price\">").concat(price, "</div>\n                                <div>\n                                    <button class=\"card-add-cart\" data-goods-id = \"").concat(id, "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n                                </div>\n                            </div>\n                        </div>");
    return card;
  }; //  формирование карточек из БД


  var renderCard = function renderCard(items) {
    goodsWrapper.textContent = '';

    if (items.length) {
      items.forEach(function (item) {
        var id = item.id,
            title = item.title,
            price = item.price,
            imgMin = item.imgMin; // деструктуризация и присвоение

        goodsWrapper.appendChild(createCardGoods(id, title, price, imgMin));
      });
    } else {
      goodsWrapper.textContent = 'Товара по вашему запросу нет';
    }
  }; // рендер товаров в корзине - Cart
  // генерация карточек в корзине


  var createCartGoods = function createCartGoods(id, title, price, img) {
    var card = document.createElement('div');
    card.className = 'goods';
    card.innerHTML = "<div class=\"goods-img-wrapper\">\n                            <img class=\"goods-img\" src=\"".concat(img, "\" alt=\"\">\n\n                        </div>\n                        <div class=\"goods-description\">\n                            <h2 class=\"goods-title\">").concat(title, "</h2>\n                            <p class=\"goods-price\">").concat(price, " \u20BD</p>\n\n                        </div>\n                        <div class=\"goods-price-count\">\n                            <div class=\"goods-trigger\">\n                                <button class=\"goods-add-wishlist ").concat(wishList.includes(id) ? 'active' : '', "\" data-goods-id = \"").concat(id, "\" ></button>\n                                <button class=\"goods-delete\" data-goods-id = \"").concat(id, "\"></button>\n                            </div>\n                            <div class=\"goods-count\">").concat(goodsBasket[id], "</div>\n                        </div>");
    return card;
  }; //  формирование карточек в корзину из БД


  var renderCart = function renderCart(items) {
    cartWrapper.textContent = '';

    if (items.length) {
      items.forEach(function (item) {
        var id = item.id,
            title = item.title,
            price = item.price,
            imgMin = item.imgMin; // деструктуризация и присвоение

        cartWrapper.appendChild(createCartGoods(id, title, price, imgMin));
      });
    } else {
      cartWrapper.innerHTML = '<div id="cart-empty">Ваша корзина пока пуста</div>';
    }
  }; //  добавление карточек в вертску
  // goodsWrapper.appendChild(createCardGoods(10000, 'Дартс', 2000, 'img/temp/archer.jpg'));
  // goodsWrapper.appendChild(createCardGoods(10001, 'Фламинго', 3000, 'img/temp/flamingo.jpg'));
  // goodsWrapper.appendChild(createCardGoods(10002, 'Носки', 1000, 'img/temp/socks.jpg'));
  // подсчет суммы в корзине


  var calcTotalPrice = function calcTotalPrice(goods) {
    var summ = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = goods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        summ += item.price * goodsBasket[item.id];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    cart.querySelector('.cart-total > span').textContent = summ.toFixed(2);
  };

  var showCart = function showCart(goods) {
    var basketGoods = goods.filter(function (item) {
      return goodsBasket.hasOwnProperty(item.id);
    });
    calcTotalPrice(basketGoods);
    return basketGoods;
  }; // отображение количества лайков


  var checkCount = function checkCount() {
    wishListCounter.textContent = wishList.length;
    cardCounter.textContent = Object.keys(goodsBasket).length;
  }; //  открытие окна корзины


  var openCart = function openCart(e) {
    e.preventDefault();
    cart.style.display = 'flex';
    getGoods(renderCart, showCart);
  }; //  закрытие окна корзины


  var closeCart = function closeCart(e) {
    if (e.target.classList.contains('cart') || e.target.classList.contains('cart-close')) {
      cart.style.display = 'none';
    } else {
      return;
    }
  }; //  имитация фильтрации карточек


  var randomSort = function randomSort(item) {
    return item.sort(function () {
      return Math.random() - 0.5;
    });
  }; //  выбор категории и отображение карточек категории


  var chooseCategory = function chooseCategory(e) {
    e.preventDefault();

    if (e.target.classList.contains('category-item')) {
      var _category = e.target.dataset.category;
      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return item.category.includes(_category);
        });
      });
    }
  }; //  поиск товаров


  var searchGoods = function searchGoods(e) {
    e.preventDefault();
    var input = e.target.elements.searchGoods;
    var inputValue = input.value.trim(); //без пробелов

    if (inputValue !== '') {
      var searchString = new RegExp(inputValue, 'i'); // console.log(searchString);
      // let reg = /xiaomi/i;

      getGoods(renderCard, function (goods) {
        return goods.filter(function (item) {
          return searchString.test(item.title);
        });
      });
    } else {
      search.classList.add('error'); // подсветка пустого поля ввода

      setTimeout(function () {
        search.classList.remove('error');
      }, 2000);
    }

    input.value = ''; // очищение поля ввода
  }; // cookie для корзины


  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  var cookieQuery = function cookieQuery(get) {
    if (get) {
      if (getCookie('goodsBasket')) {
        Object.assign(goodsBasket, JSON.parse(getCookie('goodsBasket')));
      }
    } else {
      document.cookie = "goodsBasket= ".concat(JSON.stringify(goodsBasket), "; max-age=86400e3");
    }

    checkCount();
  };

  var storageQuery = function storageQuery(get) {
    if (get) {
      if (localStorage.getItem('wishList')) {
        wishList.splice.apply(wishList, [0, 0].concat(_toConsumableArray(JSON.parse(localStorage.getItem('wishList'))))); //spread
        // wishList.push(...JSON.parse(localStorage.getItem('wishList')))
        // JSON.parse(localStorage.getItem('wishList')).forEach(id => wishList.push(id));
      }
    } else {
      localStorage.setItem('wishList', JSON.stringify(wishList));
    }

    checkCount();
  }; //  добавление/удаление id товара в массиве


  var toggleWishList = function toggleWishList(id, elem) {
    if (wishList.includes(id)) {
      wishList.splice(wishList.indexOf(id), 1);
      elem.classList.remove('active');
    } else {
      wishList.push(id);
      elem.classList.add('active');
    }

    checkCount();
    storageQuery();
  }; // добавление/удаление из корзины


  var addBasket = function addBasket(id) {
    if (goodsBasket[id]) {
      goodsBasket[id] += 1;
    } else {
      goodsBasket[id] = 1;
    }

    console.log(goodsBasket);
    checkCount();
    cookieQuery();
  }; //  получение id товара


  var handlerGoods = function handlerGoods(e) {
    var target = e.target;

    if (target.classList.contains('card-add-wishlist')) {
      toggleWishList(target.dataset.goodsId, target);
    }

    ;

    if (target.classList.contains('card-add-cart')) {
      addBasket(target.dataset.goodsId);
    }
  }; // отображение выбранных товаров


  var showWishList = function showWishList() {
    getGoods(renderCard, function (goods) {
      return goods.filter(function (item) {
        return wishList.includes(item.id);
      });
    });
  }; // удаление товара из корзины


  var removeGoods = function removeGoods(id) {
    delete goodsBasket[id];
    checkCount();
    cookieQuery();
    getGoods(renderCart, showCart);
  }; // проставление лайков в корзине, удаление товара из корзины


  var handlerBasket = function handlerBasket(e) {
    var target = e.target;

    if (target.classList.contains('goods-add-wishlist')) {
      toggleWishList(target.dataset.goodsId, target);
    }

    ;

    if (target.classList.contains('goods-delete')) {
      removeGoods(target.dataset.goodsId);
    }

    ;
  }; // инициализация


  getGoods(renderCard, randomSort);
  storageQuery(true);
  cookieQuery(true); // ---Обработчики событий---

  cartBtn.addEventListener('click', openCart);
  cart.addEventListener('click', closeCart);
  category.addEventListener('click', chooseCategory);
  search.addEventListener('submit', searchGoods);
  goodsWrapper.addEventListener('click', handlerGoods);
  wishlistBtn.addEventListener('click', showWishList);
  cartWrapper.addEventListener('click', handlerBasket);
});