// title(spend)
modalTitle.innerText = '소비 내역'

// date input
spendDate.innerText = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}`

// calendar modal
function openCalendarModal() {
  overlay.classList.toggle('visually-hidden')
  calendarModal.classList.toggle('visually-hidden')
}

calendarIcon.addEventListener('click', openCalendarModal)

// catagories
const catagorySelect = document.querySelector('.spend-catagories')
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
  catagorySelect.appendChild(option)
}

// change color of select
function handleSelectColor() {
  catagorySelect.style.color = '#3d434b'
}

catagorySelect.addEventListener('change', handleSelectColor)

// star icon (unexpected spend)
function checkStar() {
  starIcon.classList.toggle('red')
}

starIcon.addEventListener('click', checkStar)

// activate save button
const spendExpense = document.querySelector('.spend-expense')
const spendCatagory = document.querySelector('.spend-catagories')
const spendTitle = document.querySelector('.spend-title')

function activeSaveButton() {
  if (
    spendExpense.value !== '' &&
    spendCatagory.value !== '' &&
    spendTitle.value !== ''
  ) {
    addSaveButton.removeAttribute('disabled')
  } else {
    addSaveButton.setAttribute('disabled', '')
  }
}

spendExpense.addEventListener('keyup', activeSaveButton)
spendCatagory.addEventListener('change', activeSaveButton)
spendTitle.addEventListener('keyup', activeSaveButton)

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

// save spend data
function saveSpend() {
  localStorage.setItem('spendList', JSON.stringify(spends))
}

function submitSpendList() {
  const date = document.querySelector('.input-group .calendar-button span')
  const expense = document.querySelector('.spend-expense')
  const catagory = document.querySelector('.spend-catagories')
  const title = document.querySelector('.spend-title')
  const memo = document.querySelector('.spend-memo')
  const star = document.querySelector('.star-button i')

  const spendList = {
    id: Date.now(),
    date: date.innerText,
    dateId: `${selectedYear}-${selectedMonth}-${selectedDate}`,
    expense: expense.value,
    catagory: catagory.value,
    title: title.value,
    memo: memo.value,
    star: star.classList.contains('red'),
  }

  spends.push(spendList)
  saveSpend()

  spendDate.innerText = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}`
  expense.value = ''
  catagory.value = ''
  catagorySelect.style.color = 'rgba(61, 67, 75, 0.3)'
  title.value = ''
  memo.value = ''
  star.classList.remove('red')
  addSaveButton.setAttribute('disabled', '')

  generateSpendList(spendList)
}

function handleSaveButton(e) {
  e.preventDefault()
  submitSpendList()
  handleModal()
}

addSaveButton.addEventListener('click', handleSaveButton)
