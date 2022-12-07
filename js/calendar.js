// calendar modal
// 캘린더 모달을 생성하는 함수
function generateCalendar(date) {
  selectedYear = date.getFullYear()
  selectedMonth = date.getMonth() + 1
  selectedDate = date.getDate()

  calendarTitle.innerText = `${selectedYear}년 ${selectedMonth}월`

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

// prev and next month
// 캘린더 생성 함수에 월 정보를 + - 해서 넘겨주어 다른달 표시
function toPrevMonth() {
  generateCalendar(new Date(nowFullDate.setMonth(nowFullDate.getMonth() - 1)))
}
function toNextMonth() {
  generateCalendar(new Date(nowFullDate.setMonth(nowFullDate.getMonth() + 1)))
}
calendarPrevButton.addEventListener('click', toPrevMonth)
calendarNextButton.addEventListener('click', toNextMonth)

// select date
// 원하는 날짜 선택 시 작동 함수
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
// 선택한 날짜 반영 및 캘린더 닫기
function closeCalendar() {
  let selectedDay =
    weekDay[new Date(selectedYear, selectedMonth - 1, selectedDate).getDay()]
  spendDate.innerText = `${selectedYear}년 ${selectedMonth}월 ${selectedDate}일 ${selectedDay}`

  calendarModal.classList.toggle('visually-hidden')
  overlay.classList.toggle('visually-hidden')
}

calendarDoneButton.addEventListener('click', closeCalendar)
