// show intro-setting
const addButton = document.querySelector('.intro-add')
const introFirst = document.querySelector('.intro-guide')
const introSecond = document.querySelector('.intro-setting')

function showIntroSetting() {
  introFirst.classList.toggle('visually-hidden')
  introSecond.classList.toggle('visually-hidden')
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

// from number to currency in bedget input
const budgetInput = document.querySelector('.intro-setting .input')

function toCurrency(e) {
  let value = e.target.value
  value = Number(value.replaceAll(',', ''))
  let formatValue = value.toLocaleString('ko-KR')
  budgetInput.value = formatValue
}

budgetInput.addEventListener('keyup', toCurrency)
