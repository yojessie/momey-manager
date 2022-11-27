// title(spend)
modalTitle.innerText = '소비 내역'

// date input
// const spendDate = document.querySelector('.calendar-button span')
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

  generateSpendList(spendList)
}

function handleSaveButton(e) {
  e.preventDefault()
  submitSpendList()
  handleModal()
}

addSaveButton.addEventListener('click', handleSaveButton)
