// change to currency in bedget input
const budgetInputs = document.querySelectorAll('.money-input input')

function toCurrency(e) {
  let value = e.target.value

  if (isNaN(parseInt(value))) {
    value = ''
  }

  value = Number(value.replaceAll(',', ''))
  let formatValue = value.toLocaleString('ko-KR')
  e.target.value = formatValue
}

budgetInputs.forEach((i) => i.addEventListener('keyup', toCurrency))

// overlay
const overlay = document.querySelector('.overlay')
