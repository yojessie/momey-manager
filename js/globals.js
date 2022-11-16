// change to currency in bedget input
const budgetInput = document.querySelector('.money-input input')

function toCurrency(e) {
  let value = e.target.value

  if (isNaN(parseInt(value))) {
    value = ''
  }

  value = Number(value.replaceAll(',', ''))
  let formatValue = value.toLocaleString('ko-KR')
  budgetInput.value = formatValue
}

budgetInput.addEventListener('keyup', toCurrency)

// calander
const date = new Date()
// year
const nowYear = date.getFullYear()
// month
const nowMonth = date.getMonth() + 1
let nextMonth = nowMonth + 1
if (nowMonth == 12) nextMonth = 1
// date
const nowDate = date.getDate()
// day
const weekDay = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
]
const nowDay = weekDay[date.getDay()]
