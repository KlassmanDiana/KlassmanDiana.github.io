export default function renderCards(data) { // создание карточек 
    const container = document.querySelector('.goods'); // получить обертку
    data.goods.forEach((good) => { // перебрать каждый товар
        const newCard = document.createElement('div'); // создание пустого дива
        newCard.className = 'col-12 col-md-6 col-lg-4 col-xl-3'; // присваивание диву несколько классов
        // добавление разметки в див
        newCard.innerHTML = `<div class="card" data-category="${good.category}">
                        ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                            <div class="card-img-wrapper">
                                <span class="card-img-top"
                                    style="background-image: url('${good.img}')"></span>
                            </div>
                            <div class="card-body justify-content-between">
                                <div class="card-price" style="${good.sale ? 'color:red' : ''}"> ${good.price} Р</div>
                                <h5 class="card-title">${good.title}</h5>
                                <button class="btn btn-primary">В корзину</button>
                            </div>
                        </div>`;
        container.appendChild(newCard); // добавить в вертску созданную карточку
    })
}