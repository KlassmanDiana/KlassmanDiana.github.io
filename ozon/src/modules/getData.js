export default function getData() {
    const container = document.querySelector('.goods');
    return fetch('db/db.json') // получение данных
        .then((response) => { // 1. проверка полученных данных
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Данные не были получены_' + response.status);
            }
        })
        .then((data) => { // 2. обработка полученных данных
            return data;
        })
        .catch(err => {
            console.log(err);
            container.innerHTML = `<div style="margin: 0 auto;" class="card-price">Упс, что-то пошло не так...</div>`
        })
}
