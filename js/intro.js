// show intro-setting
const addButton = document.querySelector('.intro-add')
const introGuide = document.querySelectorAll('.intro-guide')
const introSettding = document.querySelector('.intro-setting')

function showIntroSetting() {
  introGuide.forEach((i) => i.classList.toggle('visually-hidden'))
  introSettding.classList.toggle('visually-hidden')
}

addButton.addEventListener('click', showIntroSetting)

// add start-day options
const introSelect = document.querySelector('.intro-setting .select')

for (let i = 1; i <= 30; i++) {
  const option = document.createElement('option')
  option.value = `${i}`
  option.text = `${i}일`
  introSelect.appendChild(option)
}

// change color of select
function changeColor() {
  introSelect.style.color = '#3d434b'
}

introSelect.addEventListener('change', changeColor)

// change to currency in bedget input
const budgetInput = document.querySelector('.intro-setting .input')

function toCurrency(e) {
  let value = e.target.value
  value = Number(value.replaceAll(',', ''))
  let formatValue = value.toLocaleString('ko-KR')
  budgetInput.value = formatValue
}

budgetInput.addEventListener('keyup', toCurrency)

// set budget data
const startButton = document.querySelector('.intro-start-button')
const intro = document.querySelector('.intro')
const spend = document.querySelector('.spend')

function showSpend() {
  intro.classList.toggle('visually-hidden')
  spend.classList.toggle('visually-hidden')
}

startButton.addEventListener('click', showSpend)
