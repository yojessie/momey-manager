// change number to currency
function toCurrency(e) {
  let value = e.target.value

  if (isNaN(parseInt(value))) {
    value = ''
  }

  value = parseInt(value.replaceAll(',', ''))
  let formatValue = value.toLocaleString('ko-KR')
  e.target.value = formatValue
}

moneyInputs.forEach((i) => i.addEventListener('keyup', toCurrency))

// change select color
function handleSelectColor(e) {
  e.target.style.color = '#3d434b'
}

selects.forEach((i) => i.addEventListener('change', handleSelectColor))
