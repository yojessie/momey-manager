// catagories
function generateSpendCatagory() {
  const spendCatagories = [
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
  ]
  for (let i of spendCatagories) {
    const option = document.createElement('option')
    option.value = `${i}`
    option.text = `${i}`
    spendCatagory.appendChild(option)
  }
}

function generateIncomeCatagory() {
  const IncomeCatagories = ['용돈', '금융수입', '외주/알바', '기타수입']
  for (let i of IncomeCatagories) {
    const option = document.createElement('option')
    option.value = `${i}`
    option.text = `${i}`
    spendCatagory.appendChild(option)
  }
}

// calendar modal
function openCalendarModal() {
  generateCalendar(nowFullDate)
  overlay.classList.toggle('visually-hidden')
  calendarModal.classList.toggle('visually-hidden')
}
calendarIcon.addEventListener('click', openCalendarModal)

// star icon (unexpected spend)
function checkStarColor() {
  spendStar.classList.toggle('red')
}
spendStar.addEventListener('click', checkStarColor)

// check empty inputs
function checkEmptyInput() {
  if (
    spendExpense.value !== '' &&
    spendCatagory.value !== '' &&
    spendTitle.value !== ''
  ) {
    spendSaveButton.removeAttribute('disabled')
  } else {
    spendSaveButton.setAttribute('disabled', '')
  }
}
spendExpense.addEventListener('keyup', checkEmptyInput)
spendCatagory.addEventListener('change', checkEmptyInput)
spendTitle.addEventListener('keyup', checkEmptyInput)

// limit the number of characters
function limitSpendTitleByte() {
  spendTitle.removeAttribute('readonly')

  const titleValue = spendTitle.value
  const maxByte = 20
  let totalByte = 0
  let count = 0

  for (let i = 0; i < titleValue.length; i++) {
    totalByte += titleValue.charCodeAt(i) > 128 ? 2 : 1
    count++

    if (totalByte > maxByte) {
      spendTitle.value = titleValue.slice(0, count - 1)
      spendTitle.setAttribute('readonly', '')
    }
  }
}
spendTitle.addEventListener('keyup', limitSpendTitleByte)

// reset all input values in modal
// 추가 혹은 수정되었던 modal 속성들 전부 리셋
function resetModalInput() {
  spendDate.innerText = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}`
  spendExpense.value = ''
  spendCatagory.value = ''
  spendCatagory.style.color = 'rgba(61, 67, 75, 0.3)'
  spendTitle.value = ''
  spendMemo.value = ''
  spendStar.classList.remove('red')
  spendStar.parentElement.classList.remove('visually-hidden')
  spendDeleteButton.classList.add('visually-hidden')
  spendSaveButton.setAttribute('disabled', '')
  spendSaveButton.className = 'spend-modal-save-button button button-green'
}

// save spend data
// 저장된 spend list array를 로컬에 저장
function saveSpend() {
  localStorage.setItem('spendList', JSON.stringify(spends))
}

function getDateId() {
  const month = selectedMonth.toString().padStart(2, '0')
  const date = selectedDate.toString().padStart(2, '0')
  const fullDate = selectedYear + month + date

  return parseInt(fullDate)
}

function submitSpendList(e) {
  e.preventDefault()

  const spendList = {
    id: Date.now(),
    date: spendDate.innerText,
    dateId: getDateId(),
    expense: spendExpense.value,
    catagory: spendCatagory.value,
    title: spendTitle.value,
    memo: spendMemo.value,
    star: spendStar.classList.contains('red'),
  }

  spends.push(spendList)
  spends.sort((a, b) => b.dateId - a.dateId)
  saveSpend()

  generateSpendList(spendList)
  closeSpendModal()
}

spendSaveButton.addEventListener('click', submitSpendList)
