// change to currency in bedget input
function toCurrency(e) {
  let value = e.target.value

  if (isNaN(parseInt(value))) {
    value = ''
  }

  value = parseInt(value.replaceAll(',', ''))
  let formatValue = value.toLocaleString('ko-KR')
  e.target.value = formatValue
}

budgetInputs.forEach((i) => i.addEventListener('keyup', toCurrency))
