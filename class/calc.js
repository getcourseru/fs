let PRICES
//lessonDuration teacherType packageType courseType
const inputValues = {}

const $options = document.querySelector('.options');
const $cards = document.querySelector('.cards');

function getInputValues() {
    const checked = $options.querySelectorAll('input:checked')
    checked.forEach(input => inputValues[`${input.name}`] = input.value)
}

$options.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT') {
    getPrices(PRICES)
    const a = getPrices(PRICES)
    const b = calcCardValues(a)
    renderCards(b)
  };
});

class Card {
  constructor(lessonCount, price, lessonPrice) {
    this.lessonCount = lessonCount
    this.price = price
    this.lessonPriceDefault = lessonPrice
    this.lessonPrice = Math.round(price / lessonCount)
    this.discount = Math.round((this.lessonPrice - this.lessonPriceDefault) / this.lessonPriceDefault * 100)
    this.profit = this.lessonPriceDefault * lessonCount - this.price
  }
}

fetch(`https://getcourseru.github.io/fs/class/price.json`)
    .then(response => response.json())
    .then(data => getPrices(data))
    .then(prices => calcCardValues(prices))
    .then(cards => renderCards(cards))

function getPrices(data) {
  getInputValues()

	if (!PRICES) {
		PRICES = data
	}

	const { lessonDuration, teacherType, packageType, courseType } = inputValues
	const filteredPrices = PRICES.filter(item => item.lessonDuration == lessonDuration && item.teacherType === teacherType && item.courseType === courseType)

    if (filteredPrices.length > 0 && filteredPrices[0][`${packageType}`]) {
        return filteredPrices[0][`${packageType}`]
    }
  
	return []
}

function calcCardValues(items) {

  if (items.length === 0) {
    return []
  }

  const cards = []
  const [item,] = items.filter(item => item.lessonPrice)
  const lessonPrice = item ? item.lessonPrice : items[0].price / items[0].lessonCount
  
  items.forEach((item) => {
    const { lessonCount, price } = item
    const card = new Card (lessonCount, price, lessonPrice)
    cards.push(card)
  })
  
  return cards
}

function renderCards(items) {

  if (items.length === 0) {
    $cards.innerHTML = '<p>Для выбранных параметров нет предложений</p>'
    return
  }

  $cards.innerHTML = ''
  const $list = document.createElement('ul');$list.classList.add('cards__list');
  
  items.forEach((item) => {
    const $card = document.createElement('li'); $card.classList.add('card');
    const $cardheader = document.createElement('div'); $cardheader.classList.add('card__header');
    const $cardbody = document.createElement('div'); $cardbody.classList.add('card__body');
    const $cardfooter = document.createElement('div'); $cardfooter.classList.add('card__footer');
    
    //
    const lessonTitle = item.lessonCount === 24 ? `урока` : `уроков`;
    const typeTitle = inputValues.type === `packages` 
      ? `пакет` 
      :  item.lessonCount < 24 ? `абонемент на 1 месяц` : `абонемент на 3 месяца`

    //lessonDuration teacherType packageType courseType
    const payLink = new URL('https://englishshow.pro/order/class')
    payLink.searchParams.append('lessonDuration', inputValues.lessonDuration)
    payLink.searchParams.append('teacherType', inputValues.teacherType)
    payLink.searchParams.append('packageType', inputValues.packageType)
    payLink.searchParams.append('courseType', inputValues.courseType)
    payLink.searchParams.append('lessonCount', item.lessonCount)

    const payLinkTitle = inputValues.packageType === `pkgs` ? `пакет` : `абонемент`;
    //
    
    $cardheader.innerHTML = item.discount < 0 
      ? `<div class="lesson-count">${item.lessonCount} ${lessonTitle}</div><div class="discount"><div class="percent"><span>${item.discount}</span>%</div></div>`
      : `<div class="lesson-count">${item.lessonCount} ${lessonTitle}</div>`;

    const cardBodyContent = `<div class="lesson-price"><span>${item.lessonPrice}</span> руб/урок</div><div class="price"><span>${item.price}</span> рублей/${typeTitle}</div><a class="link" href="${payLink}" target="_blank"><span>Выбрать ${payLinkTitle}</span></a>`
    
    $cardbody.innerHTML = items[0].lessonPriceDefault !== items[0].lessonPrice
      ? `<div class='default-price'>${item.lessonPriceDefault} руб/урок</div>${cardBodyContent}`
      : `${cardBodyContent}`;
    
    $cardfooter.innerHTML = item.profit > 0 
      ? `<div class="profit">Экономия: <span>${item.profit}</span> рублей</div>`
      : ``;
    
    $card.append($cardheader);
    $card.append($cardbody);
    $card.append($cardfooter);
    $list.append($card);
  })

  if (items.length < 6) {
    const $item = document.createElement('li');
    $item.classList.add('card', 'form');
    $list.append($item)
  };

  $cards.append($list)
}
