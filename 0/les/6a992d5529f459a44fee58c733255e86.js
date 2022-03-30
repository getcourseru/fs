const p = {
    "45": {
        "ru" : {
            "pack": [5950, 10400, 15150, 26700, 47400],
            "abon": [],
        },
        "en" : {
            "pack": [12000, 23000, 32250, 61200, 117300],
            "abon": []
        }
    },
    "60": {
        "ru" : {
            "pack": [6450, 11400, 16650, 29700, 53400],
            "abon": [],
        },
        "en" : {
            "pack": [14250, 27000, 38250, 72000, 138000],
            "abon": []
        }
    },
    "90": {
        "ru" : {
            "pack": [9675, 17100, 24975, 44550, 80100],
            "abon": [],
        },
        "en" : {
            "pack": [21375, 40500, 57375, 108000, 207000],
            "abon": []
        }
    }
};

document.title = 'Уроки с преподавателем';

const $container = document.querySelector('.form-content .builder');
const $btn = document.querySelector('.form-content .builder .f-btn');
const $body = document.getElementsByTagName('body')[0];

const NUM = [5, 10, 15, 30, 60];
const [f, g, h, j] = String(window.location.href.match(/\w{4}\/\w{2}\/\d{2}\/\d{1,2}/g)).split('/');
const index = NUM.indexOf(Number(j));
const type = (f === 'pack') ? 'пакет (не ограничен временными сроками)' : 'абонемент';
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

const price = (!window.location.href.includes('crt')) ? p[h][g][f][index] : p[h][g][f][index] - 100 * j;

$btn.innerText = 'Оплатить';
$btn.parentElement.insertAdjacentHTML('beforebegin', `<div class='prod'><div class='price'>К оплате: ${price} ₽</div></div>`);

const $logo = document.createElement('div');
$logo.classList.add('logo');
$body.append($logo);
