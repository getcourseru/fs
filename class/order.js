const PARAMS = {}
parseURL()

function parseURL() {
    const url = new URL(document.location.href)
    const { searchParams } = url
    
    for (let [name, value] of searchParams) {
        PARAMS[`${name}`] = value
    }
}

const { lessonDuration, teacherType, packageType, courseType, lessonCount } = PARAMS

if (lessonDuration && teacherType && packageType && courseType && courseType) {
    console.log(PARAMS)
    
	fetch(`https://getcourseru.github.io/fs/class/price.json`)
        .then(response => response.json())
        .then(data => getOffer(data))
    
} else {
	hideForm()
}

function getOffer(data) {
    const [offers,] = data.filter(item => item.lessonDuration == PARAMS.lessonDuration && item.teacherType == PARAMS.teacherType && item.courseType == PARAMS.courseType)

    if (offers && offers[`${PARAMS.packageType}`]) {
        const [offer,] = offers[`${PARAMS.packageType}`].filter(item => item.lessonCount == PARAMS.lessonCount)

        if (document.querySelector(`.form-position-offer-${offer.offer}`)) {
            const $offer = document.querySelector(`.form-position-offer-${offer.offer}`)
            $offer.checked = true
        } else {
            console.log(`check offers`)
        }

        renderForm(offer)
    } else {
    	hideForm()
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


function hideForm() {
    const $form = document.querySelector('form')
    $form.style.display = 'none'
	
    const $parentForm = $form.parentNode.parentNode
    $parentForm.insertAdjacentHTML('afterbegin', `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum architecto voluptate quae deserunt, similique aliquid consectetur magni quisquam dolore libero rerum, in officiis error ipsa pariatur neque, eius eos minus?</p>`)
}
