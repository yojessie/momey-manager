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
function openSpendPage() {
  settingPage.classList.add('visually-hidden')
  spendPage.classList.remove('visually-hidden')
}

function generateSpendSummary() {
  const savedStartDay = localStorage.getItem('startDay')
  let savedEndDay = savedStartDay - 1
  const savedBudget = parseInt(localStorage.getItem('budget'))

  if (savedStartDay == 1) {
    savedEndDay = new Date(nowYear, nowMonth, 0).getDate()
    nextMonth = nowMonth
  }

  totalSpendText.innerText = `0원`
  spendTerm.innerText = `${nowMonth}월 ${savedStartDay}일 - ${nextMonth}월 ${savedEndDay}일`
  budgetText.innerText = `이번달 예산 : ${savedBudget.toLocaleString(
    'ko-KR'
  )}원`
  showTotalSpendSummary()
  openSpendPage()
  gnbSettingButton.removeAttribute('disabled')
}

function saveSettingValues(e) {
  e.preventDefault()

  localStorage.setItem('startDay', startDaySelect.value)
  localStorage.setItem('budget', budgetInput.value.replaceAll(',', ''))

  if (spendListData.length == 0) {
    localStorage.setItem('totalSpend', 0)
    localStorage.setItem('totalIncome', 0)
  }

  generateSpendSummary()
}
startButton.addEventListener('click', saveSettingValues)

if (localStorage.getItem('budget') !== null) {
  // startButton.addEventListener('click', saveSettingValues)
  introPage.classList.add('visually-hidden')
  generateSpendSummary()
}

// 설정 아이콘 클릭 시
function handleSettingPage() {
  if (settingPage.classList.contains('visually-hidden')) {
    openSettingPage()
  } else {
    closeSettingPage()
  }
}

function openSettingPage() {
  addStartDayOptionse()
  const savedStartDay = parseInt(localStorage.getItem('startDay'))
  const savedBudget = parseInt(localStorage.getItem('budget'))

  startDaySelect.value = savedStartDay
  startDaySelect.style.color = '#3d434b'
  budgetInput.value = savedBudget.toLocaleString('ko-KR')

  startButton.innerText = '수정하기'
  settingSubtxt.innerText = '월 시작일이나 예산을 수정할 수 있어요'

  spendPage.classList.add('visually-hidden')
  settingPage.classList.remove('visually-hidden')
}

function closeSettingPage() {
  spendPage.classList.remove('visually-hidden')
  settingPage.classList.add('visually-hidden')
}

gnbSettingButton.addEventListener('click', handleSettingPage)
