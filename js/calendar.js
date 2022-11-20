// global variables
const date = new Date()
const nowYear = date.getFullYear()

const nowMonth = date.getMonth() + 1
let nextMonth = nowMonth + 1
if (nowMonth == 12) nextMonth = 1

const nowDate = date.getDate()

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

const calendarContent = document.querySelector('.calendar-content .date')
const calendarTitle = document.querySelector('.calendar-title h3')

let selectedYear = nowYear
let selectedMonth = nowMonth
let selectedDate = nowDate

// calendar modal
function generateCalendar(date) {
  selectedYear = date.getFullYear()
  selectedMonth = date.getMonth() + 1
  selectedDate = date.getDate()

  // title
  calendarTitle.innerText = `${selectedYear}년 ${selectedMonth}월`

  // content
  const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay()
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate()

  let dateTemplate = ''

  for (let i = 0; i < firstDay; i++) {
    dateTemplate += `<div></div>`
  }
  for (let i = 1; i <= lastDay; i++) {
    const getDay = new Date(selectedYear, selectedMonth - 1, i).getDay()
    if (nowMonth == selectedMonth && nowDate == i) {
      dateTemplate += `<div class='today selected'>${i}</div>`
    } else if (getDay == 0) {
      dateTemplate += `<div class='sun'>${i}</div>`
    } else if (getDay == 6) {
      dateTemplate += `<div class='sat'>${i}</div>`
    } else {
      dateTemplate += `<div>${i}</div>`
    }
  }

  calendarContent.innerHTML = dateTemplate
}

generateCalendar(date)

// prev and next month
const prevButton = document.querySelector('.calendar-title .prev-button')
const nextButton = document.querySelector('.calendar-title .next-button')

function toPrevMonth() {
  generateCalendar(new Date(date.setMonth(date.getMonth() - 1)))
}
function toNextMonth() {
  generateCalendar(new Date(date.setMonth(date.getMonth() + 1)))
}

prevButton.addEventListener('click', toPrevMonth)
nextButton.addEventListener('click', toNextMonth)

// select date
function selectDate(e) {
  const calendarContentDiv = document.querySelectorAll(
    '.calendar-content .date div'
  )
  calendarContentDiv.forEach((i) => i.classList.remove('selected'))
  e.target.classList.add('selected')
  selectedDate = e.target.innerText
}

calendarContent.addEventListener('click', selectDate)

// done button
const calendarModal = document.querySelector('.calendar')
const doneButton = document.querySelector('.calendar-done-button')
const spendDate = document.querySelector('.calendar-button span')

function closeCalendar() {
  let selectedDay =
    weekDay[new Date(selectedYear, selectedMonth - 1, selectedDate).getDay()]
  spendDate.innerText = `${selectedYear}년 ${selectedMonth}월 ${selectedDate}일 ${selectedDay}`

  calendarModal.classList.toggle('visually-hidden')
  overlay.classList.toggle('visually-hidden')
}

doneButton.addEventListener('click', closeCalendar)
