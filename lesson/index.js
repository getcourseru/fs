fetch(`https://getcourseru.github.io/fs/lesson/prices.json`)
    .then((response) => response.json())
    .then((data) => getPrice(data))
    .then((price) => renderForm(price))

function getPrice(data) {
    const [packageKind, teacherKind, lessonDuration, lessonCount] = parseURL();
    const [a,] = data.filter(item => item.lessonDuration == lessonDuration && item.teacherKind === teacherKind);

    let b;
    switch (packageKind) {
        case `pack`:
            [b,] = a.packages.filter(item => item.lessonCount == lessonCount)
            document.title = 'Уроки с преподавателем';
            break
        case `abon`:
            [b,] = a.subscriptions.filter(item => item.lessonCount == lessonCount)
            document.title = 'Уроки с преподавателем';
            break
        case `group`:
            [b,] = a.groups.filter(item => item.lessonCount == lessonCount)
            document.title = 'Уроки с преподавателем в группе';
            break
    };
    
    return b.price;
};

function renderForm(price) {
    const [packageKind, teacherKind, lessonDuration, lessonCount] = parseURL();
    const $container = document.querySelector('.form-content .builder');
    const $btn = $container.querySelector('.f-btn');

    $container.insertAdjacentHTML('afterbegin', 
        `<div class='prod'>
            <p class='title'>${packageKind !== `group` ? `Уроки с преподавателем` : `Уроки с преподавателем в группе`}</p>
            <p class='info'>Тип: ${packageKind === `pack` ? `пакет (не ограничен временными сроками)` : +lessonCount > 16 ? `абонемент на 3 месяца` : `абонемент на 1 месяц`}</p>
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
    
    window.localStorage.setItem('lessonPrice', price)
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
