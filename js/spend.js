// open and close add modal
function handleModal() {
  generateCalendar(date)
  addModal.classList.toggle('visually-hidden')
}

addButton.addEventListener('click', handleModal)
modalCloseButton.addEventListener('click', handleModal)

// calculate total spend
function calTotalSpend(expenseValue) {
  const expenseNum = parseInt(expenseValue.replaceAll(',', ''))
  totalSpendMoney += expenseNum
  totalSpend.innerText = `${totalSpendMoney.toLocaleString('ko-KR')}원`

  const spendBar = document.querySelector('.spend-summary-bar-active')
  const savedBudget = parseInt(
    localStorage.getItem('budget').replaceAll(',', '')
  )
  const percentWidth = (totalSpendMoney / savedBudget) * 100
  spendBar.style.width = `${percentWidth}%`

  if (percentWidth > 80) {
    spendBar.classList.add('bar-red')
  } else if (percentWidth > 50) {
    spendBar.classList.add('bar-yellow')
  } else {
    spendBar.classList.add('bar-green')
  }
}

// generate spend list
function generateSpendList(spendList) {
  calTotalSpend(spendList.expense)

  const contentList = document.createElement('li')
  contentList.className = 'spend-list-item'
  contentList.id = spendList.id

  const button = document.createElement('button')
  button.setAttribute('type', 'button')

  const template = `
    <div class="content">
      <div class="catagory">${spendList.catagory}</div>
      <div class="title">
        <span>${spendList.title}</span>
        <i class="icon-star"></i>
      </div>
      <span class="expense">${spendList.expense}원</span>
    </div>
    <span class="memo">${spendList.memo}</span>`

  button.innerHTML = template
  contentList.appendChild(button)

  // check star button
  const star = contentList.querySelector('.title  i')
  if (!spendList.star) star.style.display = 'none'

  // create new ol or insert old ol
  const ol = document.getElementById(spendList.dateId)

  if (ol == null) {
    const newOl = document.createElement('ol')
    newOl.className = 'spend-list-day'
    newOl.id = spendList.dateId

    const titleList = document.createElement('li')
    titleList.className = 'spend-list-title'
    titleList.innerText = spendList.date

    newOl.appendChild(titleList)
    newOl.appendChild(contentList)
    spendListDiv.appendChild(newOl)

    spendEmpty.classList.add('visually-hidden')
  } else {
    ol.appendChild(contentList)
  }
}

const savedSpendList = JSON.parse(localStorage.getItem('spendList'))

if (savedSpendList == null) {
  spendEmpty.classList.remove('visually-hidden')
} else {
  spendEmpty.classList.add('visually-hidden')
  spends = savedSpendList
  savedSpendList.forEach(generateSpendList)
}
