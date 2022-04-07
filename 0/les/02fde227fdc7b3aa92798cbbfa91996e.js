const p = {
    "45": {
        "ru" : {
            "pack": [],
            "abon": [8160, 11880, 15520, 21360, 31320, 40800]
        },
        "en" : {
            "pack": [],
            "abon": []
        },
        "crt": [7360, 10680, 13920, 18960, 27720, 36000]
    },
    "60": {
        "ru" : {
            "pack": [],
            "abon": [8960, 13080, 17120, 23760, 34920, 45600]
        },
        "en" : {
            "pack": [],
            "abon": []
        },
        "crt": [8160, 11880, 15520, 21360, 31320, 40800]
    },
    "90": {
        "ru" : {
            "pack": [],
            "abon": [13440, 19620, 25680, 35640, 52380, 68400]
        },
        "en" : {
            "pack": [],
            "abon": []
        },
        "crt": [12240, 17820, 23280, 32040, 46980, 61200]
    }
};

document.title = 'Уроки с преподавателем';

const $container = document.querySelector('.form-content .builder');
const $btn = document.querySelector('.form-content .builder .f-btn');
const $body = document.getElementsByTagName('body')[0];

const NUM = [8, 12, 16, 24, 36, 48];
const [f, g, h, j] = String(window.location.href.match(/\w{4}\/\w{2}\/\d{2}\/\d{1,2}/g)).split('/'); //pack/ru/60/5
const index = NUM.indexOf(Number(j));
const dur = (j > 16) ? '3 месяца' : '1 месяц'
const type = (f === 'pack') ? 'пакет (не ограничен временными сроками)' : `абонемент на ${dur}`;
const teacher = (g === 'ru') ? 'русскоязычный' : 'носитель';

document.getElementsByName('formParams[full_name]')[0].placeholder = 'Имя';
document.getElementsByName('formParams[email]')[0].placeholder = 'Email';
document.getElementsByName('formParams[phone]')[0].placeholder = 'Телефон';

$container.insertAdjacentHTML('afterBegin', `<div class='prod'>
    <p class='title'>Уроки с преподавателем</p>
    <p class='info'>Тип: ${type}</p>
    <p class='info'>Преподаватель: ${teacher}</p>
    <p class='info'>Количество уроков: ${j}</p>
    <p class='info'>Продолжительность урока: ${h} минут</p>
</div>`);

const price = (!window.location.href.includes('crt')) ? p[h][g][f][index] : p[h]['crt'][index];

$btn.innerText = 'Оплатить';
$btn.parentElement.insertAdjacentHTML('beforebegin', `<div class='prod'><div class='price'>К оплате: ${price} ₽</div></div>`);

const $logo = document.createElement('div');
$logo.classList.add('logo');
$body.append($logo);
