// change number to currency
function toCurrency(e) {
  let value = e.target.value

  value = parseInt(value.replaceAll(',', ''))
  let formatValue = value.toLocaleString('ko-KR')
  e.target.value = formatValue

  if (isNaN(parseInt(value))) {
    e.target.value = ''
  }
}

moneyInputs.forEach((i) => i.addEventListener('keyup', toCurrency))

// change select color
function handleSelectColor(e) {
  e.target.style.color = '#3d434b'
}

selects.forEach((i) => i.addEventListener('change', handleSelectColor))

// catagories
const catagories = {
  spend: [
    '식비',
    '커피/간식',
    '술/유흥',
    '생활용품',
    '뷰티/미용',
    '의료/건강',
    '패션/의류',
    '전자제품',
    '문화/여가',
    '여행',
    '교육비',
    '교통비',
    '주거/통신',
    '반려동물',
    '자녀/육아',
    '경조/선물',
  ],
  income: ['용돈', '금융수입', '외주/알바', '기타수입'],
}

function generateCatagory(sort) {
  const placeholder =
    '<option value="" disabled selected>카테고리 (필수)</option>'
  spendCatagory.innerHTML = placeholder

  for (let i of sort) {
    const option = document.createElement('option')
    option.value = `${i}`
    option.text = `${i}`
    spendCatagory.appendChild(option)
  }
}
