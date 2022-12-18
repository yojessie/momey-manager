gnbTitle.innerText = '이달의 소비'

function handleGnbMenu() {
  gnbMenu.classList.toggle('visually-hidden')
  if (gnbMenu.classList.contains('visually-hidden')) {
    gnbTitleChevron.style.rotate = '0deg'
  } else {
    gnbTitleChevron.style.rotate = '180deg'
  }
  if (this == monthlyExpense) {
    gnbTitle.innerText = this.innerText
    preparingPage.classList.add('visually-hidden')
  }
}
gnbButton.addEventListener('click', handleGnbMenu)
monthlyExpense.addEventListener('click', handleGnbMenu)

function openPreparing() {
  gnbTitle.innerText = this.innerText
  preparingPage.classList.remove('visually-hidden')
  handleGnbMenu()
}
totalExpense.addEventListener('click', openPreparing)
totalSaving.addEventListener('click', openPreparing)
fixedExpense.addEventListener('click', openPreparing)
