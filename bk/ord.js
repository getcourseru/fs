const PARAMS = parseURL()
//alias

function parseURL() {
    const params = {}

    const url = new URL(document.location.href)
    const { pathname, searchParams } = url
    
    /*if (pathname.split(`/`).includes('editor')) {
    	const $pg = document.querySelector('.lite-page')
        $pg.innerHTML = ''
        return
    }*/
    
    for (let [name, value] of searchParams) {
        params[`${name}`] = value
    }
    params.folder = pathname.split('/')
    params.folder = params.folder[params.folder.length - 1]
    console.log(params.folder)
	
    params.referrer = document.referrer ? document.referrer : false

    return params
}

const { alias } = PARAMS

if (alias) {
    fetch('https://getcourseru.github.io/fs/bk/prc.json')
        .then(response => response.json())
        .then(data => getOffer(data))
} else {
    showNotification()
}

function getOffer(data) {
    const [product,] = data.filter(item => item.alias == PARAMS.alias)

    if (product) {
        const { offer } = product

        if (document.querySelector(`.form-position-offer-${offer}`)) {
            const $offer = document.querySelector(`.form-position-offer-${offer.offer}`)
            $offer.checked = true
            addPlaceholder()
            renderForm(product)
        } else {
            console.log(`check offer IDs`)
        }  
    }
}

function renderForm(product) {
    const { title, price } = product

    const $container = document.querySelector('.form-content .builder');
    const $btn = $container.querySelector('.f-btn');

    $container.insertAdjacentHTML('afterbegin', 
        `<div class='prod'>
            <p class='prod__title'>Книги Инглиш Шоу</p>
            <div class='prod__desc'>
                <p>Название: ${title}</p>
            <div>
        </div>`);

    $btn.innerText = 'Оплатить';
    $btn.parentElement.insertAdjacentHTML('beforebegin', 
        `<div class='price'>
            <div class='price__text'>К оплате:<span id='price'>${price}</span>₽</div>
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
                    <a href='${PARAMS.referrer ? PARAMS.referrer : `https://englishshow.ru/ceny`}'>Вернуться</a>
                </div>
            </div>
        </div>`);
}

function addPlaceholder() {
    const [nameInput,] = document.getElementsByName('formParams[full_name]');
    nameInput.placeholder = `Имя`;
    const [emailInput,] = document.getElementsByName('formParams[email]');
    emailInput.placeholder = `Email`;
    const [phoneInput,] = document.getElementsByName('formParams[phone]');
    phoneInput.placeholder = `Телефон`;
}
