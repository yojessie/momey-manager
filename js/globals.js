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

// 계산된 소비, 예산 합계 표시
function showTotalSpendSummary() {
  const totalSpendMoney = parseInt(localStorage.getItem('totalSpend'))
  const totalIncomeMoney = parseInt(localStorage.getItem('totalIncome'))
  let newBudget = parseInt(localStorage.getItem('budget')) + totalIncomeMoney

  totalSpendText.innerText = `${totalSpendMoney.toLocaleString('ko-KR')}원`
  budgetText.innerText = `이번달 예산 : ${newBudget.toLocaleString('ko-KR')}원`

  showSpendBar(totalSpendMoney, newBudget)
}

// 예산 대비 소비금액 계산해서 바 그래프에 표시
function showSpendBar(totalSpendMoney, newBudget) {
  const spendBar = document.querySelector('.spend-summary .bar-active')

  const percentWidth = (totalSpendMoney / newBudget) * 100
  spendBar.style.width = `${percentWidth}%`
  spendBar.className = 'bar-active'

  if (percentWidth > 80) {
    spendBar.classList.add('red-bar')
  } else if (percentWidth > 50) {
    spendBar.classList.add('yellow-bar')
  } else {
    spendBar.classList.add('green-bar')
  }
}

// 금액 데이터 타입 정리 함수
// function moneyValueType(value, func, key) {
//   if (func == 'set') {
//     return localStorage.setItem(key, value.replaceAll(',', ''))
//   } else if (func == 'get') {
//     return parseInt(localStorage.getItem(key))
//   } else if (func == 'innerText') {
//     return value.toLocaleString('ko-KR')
//   }
// }
