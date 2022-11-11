const introAddButon = document.querySelector('.intro-add')
const introGuide = document.querySelectorAll('.intro-guide')
const introSettding = document.querySelector('.intro-setting')

const startDaySelect = document.querySelector('.intro-setting .select')
// declared at globals.js
// const budgetInput = document.querySelector('.money-input input')

const startButton = document.querySelector('.intro-start-button')
const introPage = document.querySelector('.intro')
const spendPage = document.querySelector('.spend')

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
function activeStartButton() {
  if (startDaySelect.value !== '' && budgetInput.value !== '') {
    const alertText = document.querySelector('.intro-alert-text')

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

// set budget data
// value값을 로컬에 저장
// 페이지 전환

function showSpend() {
  introPage.classList.toggle('visually-hidden')
  spendPage.classList.toggle('visually-hidden')

  console.log(startDaySelect.value)
  console.log(budgetInput.value)
}

startButton.addEventListener('click', showSpend)

// set user-data in local
