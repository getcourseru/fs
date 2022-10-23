/*import { parseURL } from "./utils/url.js";
import { getPrice } from "./utils/price.js";
import { renderForm } from "./utils/form.js";
const options = parseURL();

fetch(`https://getcourseru.github.io/fs/lesson/prices.json`)
    .then((response) => response.json())
    .then((data) => getPrice(data, options))
    .then((price) => renderForm(price, options))*/

fetch(`https://getcourseru.github.io/fs/lesson/prices.json`)
    .then((response) => response.json())
    .then((data) => getPrice(data))
    .then((price) => renderForm(price, options))

function getPrice(data) {
    console.log(data)
    
    const options = parseURL();
    const [packageKind, teacherKind, lessonDuration, lessonCount] = options;
    
    data.forEach(item => console.log(item.lessonDuration, item.teacherKind))
    
    const a = data.filter(function(item) {
        return item.lessonDuration === lessonDuration && item.teacherKind === teacherKind
    });
    
    console.log(a)
    
    let b;
    switch (packageKind) {
        case `pack`:
            [b, ] = a.packages.filter(item => item.lessonCount === lessonCount)
            document.title = 'Уроки с преподавателем';
            break
        case `abon`:
            [b, ] = a.subscriptions.filter(item => item.lessonCount === lessonCount)
            document.title = 'Уроки с преподавателем';
            break
        case `group`:
            [b, ] = a.groups.filter(item => item.lessonCount === lessonCount)
            document.title = 'Уроки с преподавателем в группе';
            break
    };
    
    return b.price, options;
};

function renderForm(price, options) {
    const [packageKind, teacherKind, lessonDuration, lessonCount] = options;
    const $container = document.querySelector('.form-content .builder');
    const $btn = $container.querySelector('.f-btn');

    $container.insertAdjacentHTML('afterbegin', 
        `<div class='prod'>
            <p class='title'>${packageKind !== `group` ? `Уроки с преподавателем` : `Уроки с преподавателем в группе`}</p>
            <p class='info'>Тип: ${packageKind === `pack` ? `пакет (не ограничен временными сроками)` : lessonCount > 16 ? `абонемент на 3 месяца` : `абонемент на 1 месяц`}</p>
            <p class='info'>Преподаватель: ${teacherKind === `ru` ? `русскоязычный` : `носитель`}</p> 
            <p class='info'>Количество уроков: ${lessonCount}</p>
            <p class='info'>Продолжительность урока: ${lessonDuration} минут</p>
        </div>`);

    $btn.innerText = 'Оплатить';
    $btn.parentElement.insertAdjacentHTML('beforebegin', 
        `<div class='price'>
            <div class='price__text'>К оплате:<span id='price'>${price}</span>₽</div>
        </div>`
    );

    addPlaceholder();
}

function addPlaceholder() {
    const [nameInput, ] = document.getElementsByName('formParams[full_name]');
    nameInput.placeholder = `Имя`;
    const [emailInput, ] = document.getElementsByName('formParams[email]');
    emailInput.placeholder = `Email`;
    const [phoneInput, ] = document.getElementsByName('formParams[phone]');
    phoneInput.placeholder = `Телефон`;
}

function parseURL() {
    return String(window.location.href.match(/\w+\/\w+\/\d+\/\d+/)).split('/');
}
