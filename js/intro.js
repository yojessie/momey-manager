// show intro-setting
function showIntroSetting() {
  introGuide.forEach((i) => i.classList.toggle('visually-hidden'))
  introSettding.classList.toggle('visually-hidden')
}

introAddButon.addEventListener('click', showIntroSetting)

// add start-day options
for (let i = 1; i <= 30; i++) {
  const option = document.createElement('option')
  option.value = `${i}`
  option.text = `${i}일`
  startDaySelect.appendChild(option)
}

// change color of select
function changeColor() {
  startDaySelect.style.color = '#3d434b'
}

startDaySelect.addEventListener('change', changeColor)

// activate the start button
const introBudgetInput = document.querySelector(
  '.intro-setting .money-input input'
)

function activeStartButton() {
  if (startDaySelect.value !== '' && introBudgetInput.value !== '') {
    const alertText = document.querySelector('.intro-alert-text')

    if (introBudgetInput.value < 1000) {
      alertText.classList.remove('visually-hidden')
      alertText.innerText = '1,000원 이상의 예산을 설정해주세요'
      startButton.setAttribute('disabled', '')
      return
    }
    alertText.classList.add('visually-hidden')
    startButton.removeAttribute('disabled')
  }
}
startDaySelect.addEventListener('change', activeStartButton)
introBudgetInput.addEventListener('keyup', activeStartButton)

// set budget data and switch screens
function setBudgetData() {
  localStorage.setItem('startDay', startDaySelect.value)
  localStorage.setItem('budget', introBudgetInput.value)

  generateSpendSummary()
}

function generateSpendSummary() {
  let savedStartDay = localStorage.getItem('startDay')
  let savedEndDay = savedStartDay - 1
  let savedBudget = localStorage.getItem('budget')

  if (savedStartDay == 1) {
    savedEndDay = new Date(nowYear, nowMonth, 0).getDate()
    nextMonth = nowMonth
  }

  totalSpend.innerText = `0원`
  spendTerm.innerText = `${nowMonth}월 ${savedStartDay}일 - ${nextMonth}월 ${savedEndDay}일`
  budget.innerText = `이번달 예산 : ${savedBudget}원`

  introPage.classList.toggle('visually-hidden')
  spendPage.classList.toggle('visually-hidden')
}

// switch screens
if (localStorage.getItem('budget') == null) {
  startButton.addEventListener('click', setBudgetData)
} else {
  generateSpendSummary()
}
