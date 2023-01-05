const PARAMS = {}
parseURL()

function parseURL() {
    const url = new URL(document.location.href)
    const { pathname, searchParams } = url
    
    if (pathname.split(`/`).includes('editor')) {
    	const $pg = document.querySelector('.lite-page')
	$pg.innerHTML = ''
	return
    }
    
    for (let [name, value] of searchParams) {
        PARAMS[`${name}`] = value
    }
	
    //?lessonDuration=60&teacherType=ru&packageType=pkgs&courseType=std&lessonCount=5
}

const { lessonDuration, teacherType, packageType, courseType, lessonCount } = PARAMS

if (lessonDuration && teacherType && packageType && courseType && courseType) {
    console.log(PARAMS)
    
	fetch(`https://getcourseru.github.io/fs/class/price.json`)
        .then(response => response.json())
        .then(data => getOffer(data))
    
} else {
	showNotification()
}

function getOffer(data) {
    const [offers,] = data.filter(item => item.lessonDuration == PARAMS.lessonDuration && item.teacherType == PARAMS.teacherType && item.courseType == PARAMS.courseType)
    console.log(offers)
	
    if (offers && offers[`${PARAMS.packageType}`]) {
        const [offer,] = offers[`${PARAMS.packageType}`].filter(item => item.lessonCount == PARAMS.lessonCount)
	console.log(offer)
	
        if (document.querySelector(`.form-position-offer-${offer.offer}`)) {
            const $offer = document.querySelector(`.form-position-offer-${offer.offer}`)
            $offer.checked = true
        } else {
            console.log(`check offers`)
        }

        renderForm(offer)
    } else {
    	showNotification()
    }
}

function renderForm(offer) {
	const $container = document.querySelector('.form-content .builder');
    const $btn = $container.querySelector('.f-btn');

	$container.insertAdjacentHTML('afterbegin', 
        `<div class='prod'>
            <p class='prod__title'>${PARAMS.packageType !== `groups` ? `Уроки с преподавателем` : `Уроки с преподавателем в группе`}</p>
            <div class='prod__desc'>
                <p>Курс: ${PARAMS.courseType === `std` ? `обычный` : `бизнес`}</p>
                <p>Тип: ${PARAMS.packageType === `pkgs` ? `пакет (не ограничен временными сроками)` : PARAMS.lessonCount > 16 ? `абонемент на 3 месяца` : `абонемент на 1 месяц`}</p>
                <p>Преподаватель: ${PARAMS.teacherType === `ru` ? `русскоязычный` : `носитель`}</p> 
                <p>Количество уроков: ${PARAMS.lessonCount}</p>
                <p>Продолжительность урока: ${PARAMS.lessonDuration} минут</p>
            <div>
        </div>`);

    $btn.innerText = 'Оплатить';
    $btn.parentElement.insertAdjacentHTML('beforebegin', 
        `<div class='price'>
            <div class='price__text'>К оплате:<span id='price'>${offer.price}</span>₽</div>
        </div>`
    );
}

function showNotification() {

    if (!document.querySelector('form')) {
    	return
    }
	
    const $form = document.querySelector('form')
    $form.style.display = 'none'

    const $parentForm = $form.parentNode.parentNode
    $parentForm.insertAdjacentHTML('afterbegin', 
        `<div class='nt'>
            <div class='nt__container'>
                <div class='nt__image'>
                    <img src='https://fs.getcourse.ru/fileservice/file/download/a/13641/sc/341/h/43d1d1bdc86e74ead187f37ae1adf836.png'>
                </div>
                <div class='nt__content'>
                    <p>Так-с, кажется, что-то пошло не так...</p>
                    <p>Вернись на шаг назад и попробуй выбрать предложение</p>
                    <a href='https://englishshow.ru/ceny'>Вернуться</a>
                </div>
            </div>
        </div>`);
}
