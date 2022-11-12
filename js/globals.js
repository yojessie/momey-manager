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
