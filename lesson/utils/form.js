import { addPlaceholder } from "./placeholder.js"

export function renderForm(price, options) {
    const [packageKind, teacherKind, lessonDuration, lessonCount] = options;

    addPlaceholder();

    const $container = document.querySelector('.form-content .builder');
    const $btn = $container.querySelector('.f-btn');

    const packageKindTitle = packageKind === `pack`
        ? `пакет (не ограничен временными сроками)` 
        : lessonCount > 16
            ?   `абонемент на 3 месяца`
            :   `абонемент на 1 месяц`;

    $container.insertAdjacentHTML('afterbegin', 
        `<div class='prod'>
            <p class='title'>${packageKind !== `group` ? `Уроки с преподавателем` : `Уроки с преподавателем в группе`}</p>
            <p class='info'>Тип: ${packageKindTitle}</p>
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
}