// activate start button
function activeStartButton() {
  if (startDaySelect.value !== '' && budgetInput.value !== '') {
    const alertText = document.querySelector('.setting .alert')

    if (budgetInput.value < 1000) {
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
budgetInput.addEventListener('keyup', activeStartButton)

// set budget data and switch screens
function switchIntroSpend() {
  settingPage.classList.add('visually-hidden')
  spendPage.classList.remove('visually-hidden')
}

function generateSpendSummary() {
  const savedStartDay = localStorage.getItem('startDay')
  let savedEndDay = savedStartDay - 1
  const savedBudget = localStorage.getItem('budget')

  if (savedStartDay == 1) {
    savedEndDay = new Date(nowYear, nowMonth, 0).getDate()
    nextMonth = nowMonth
  }

  totalSpendText.innerText = `0원`
  spendTerm.innerText = `${nowMonth}월 ${savedStartDay}일 - ${nextMonth}월 ${savedEndDay}일`
  budgetText.innerText = `이번달 예산 : ${savedBudget}원`

  switchIntroSpend()
}

function saveSettingValues(e) {
  e.preventDefault()

  localStorage.setItem('startDay', startDaySelect.value)
  localStorage.setItem('budget', budgetInput.value)
  localStorage.setItem('totalSpend', 0)

  generateSpendSummary()
}

if (localStorage.getItem('budget') == null) {
  startButton.addEventListener('click', saveSettingValues)
} else {
  introPage.classList.add('visually-hidden')
  generateSpendSummary()
}
