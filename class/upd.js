const params = {}

fetch(`https://getcourseru.github.io/fs/class/price.json`)
    .then(r => r.json())
    .then(d => getOffers(d))
	.then(p => renderSomething())

function parseURL() {
    const url = new URL(document.location.href)
    const { pathname, searchParams } = url
	const [,, courseType, teacherType, packageType, lessonDuration] = pathname.split(`/`)
    
    params.courseType = courseType
    params.teacherType = teacherType
    params.packageType = packageType
    params.lessonDuration = lessonDuration
    params.lessonCount = searchParams.get(`lessonCount`) ? searchParams.get(`lessonCount`) : false
}

function getOffers(d) {
	parseURL()

    const [a,] = d.filter(item => 
        item.courseType == params.courseType && 
        item.teacherType == params.teacherType && 
        item.lessonDuration == params.lessonDuration)

    params.offers = a[`${params.packageType}`]
}

function renderSomething() {
    const { offers, lessonCount } = params
    
    if (lessonCount) {
        const [item,] = offers.filter(item => item.lessonCount == lessonCount)
		const $offer = document.querySelector(`.form-position-offer-${item.offer}`)
        $offer.checked = true
        renderForm(item)
    }

    if (!lessonCount) {
        console.log('создать кнопки')
    }
}

function renderForm(offer) {
	const $container = document.querySelector('.form-content .builder');
    const $btn = $container.querySelector('.f-btn');

	$container.insertAdjacentHTML('afterbegin', 
        `<div class='prod'>
            <p class='prod__title'>${params.packageType !== `groups` ? `Уроки с преподавателем` : `Уроки с преподавателем в группе`}</p>
            <div class='prod__desc'>
                <p>Курс: ${params.courseType === `std` ? `обычный` : `бизнес`}</p>
                <p>Тип: ${params.packageType === `pkgs` ? `пакет (не ограничен временными сроками)` : params.lessonCount > 16 ? `абонемент на 3 месяца` : `абонемент на 1 месяц`}</p>
                <p>Преподаватель: ${params.teacherType === `ru` ? `русскоязычный` : `носитель`}</p> 
                ${params.lessonCount ? <p>Количество уроков: ${params.lessonCount}</p> : ``}
                <p>Продолжительность урока: ${params.lessonDuration} минут</p>
            <div>
        </div>`);

    $btn.innerText = 'Оплатить';
    $btn.parentElement.insertAdjacentHTML('beforebegin', 
        `<div class='price'>
            <div class='price__text'>К оплате:<span id='price'>${offer.price}</span>₽</div>
        </div>`
    );
}
