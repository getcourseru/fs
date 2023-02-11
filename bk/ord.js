const PARAMS = parseURL()
//alias

function parseURL() {
    const params = {}

    const url = new URL(document.location.href)
    const { pathname, searchParams } = url
    
    params.pathname = pathname.split('/')
    /*if (params.pathname.includes('editor')) {
    	const $pg = document.querySelector('.lite-page')
        $pg.innerHTML = ''
        return
    }*/
    
    for (let [name, value] of searchParams) {
        params[`${name}`] = value
    }
	
    const i = params.pathname.indexOf('ord')
    params.folder = params.pathname[i + 1]
    if (!params.alias) {
    	params.alias = params.pathname[i + 2]
    }
	
    params.referrer = document.referrer ? document.referrer : false

    return params
}

const { alias, folder } = PARAMS

if (alias) {
    fetch(`https://getcourseru.github.io/fs/${folder}/prc.json`)
        .then(response => response.json())
        .then(data => getOffer(data))
} else {
    showNotification()
}

function getOffer(data) {
    const [product,] = data.filter(item => item.alias == PARAMS.alias)

    if (product) {
        const { offer } = product
        renderForm(product)

        if (document.querySelector(`.form-position-offer-${offer}`)) {
            const $offer = document.querySelector(`.form-position-offer-${offer.offer}`)
            $offer.checked = true
            renderForm(product)
        } else {
            console.log(`check offer IDs`)
        }
	    
	return
    }
	
    showNotification()
}

function renderForm(product) {
    const { title, price } = product
    const $container = document.querySelector('.form-content .builder');
    const $btn = $container.querySelector('.f-btn');

    $container.insertAdjacentHTML('afterbegin', 
        `<div class='prod'>
            <p class='prod__title'>${title}</p>
        </div>`);

    $btn.innerText = 'Оплатить';
    $btn.parentElement.insertAdjacentHTML('beforebegin', 
        `<div class='price'>
            <div class='price__text'>К оплате:<span id='price'>${price}</span>₽</div>
        </div>`
    );
	
    addPlaceholder()
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
                    <a href='${PARAMS.referrer ? PARAMS.referrer : `https://englishshow.ru/knigi`}'>Вернуться</a>
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
