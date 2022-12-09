// open modal functions
// 소비내역, 예산 추가 모달 열기
function openAddModal() {
  if (this == addButton) {
    spendModalTitle.innerText = '소비 내역'
    generateSpendCatagory()
  }
  if (this == addBudgetButton) {
    spendModalTitle.innerText = '예산 추가'
    spendExpense.setAttribute('placeholder', '추가 금액(필수)')
    generateIncomeCatagory()
    spendStar.parentElement.classList.add('visually-hidden')
    spendSaveButton.classList.add('add-budget')
  }
  spendDate.innerText = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}`
  spendModal.classList.remove('visually-hidden')
}
addButton.addEventListener('click', openAddModal)
addBudgetButton.addEventListener('click', openAddModal)

// 소비내역 수정, 삭제 모달 열기
function openSpendModifyModal(e) {
  const targetList = e.target.closest('.spend-list-item')
  if (targetList) {
    savedSpendList.forEach((i) => {
      if (i.id == targetList.id) {
        spendDate.innerText = i.date
        spendExpense.value = i.expense
        spendCatagory.value = i.catagory
        spendTitle.value = i.title
        spendMemo.value = i.memo
        if (i.star) spendStar.classList.add('red')
      }
    })
    generateSpendCatagory()
    spendModalTitle.innerText = '소비 내역'
    spendCatagory.style.color = '#3d434b'
    spendDeleteButton.classList.remove('visually-hidden')
    spendSaveButton.removeAttribute('disabled')
    spendSaveButton.classList.add('modify-spend')
    spendModal.classList.remove('visually-hidden')
  }
}
spendListDiv.addEventListener('click', openSpendModifyModal)

// close modal
// 모달 닫기 버튼은 소비추가, 예산추가, 내용수정 모두 동일.
function closeSpendModal() {
  spendModal.classList.add('visually-hidden')
  resetModalInput()
}
modalCloseButton.addEventListener('click', closeSpendModal)

// calculate total spend
// 로컬에 값이 저장되면 expense를 받아와 spend-summary 영역에 반영
function calcTotalSpend(expenseValue) {
  const expenseNum = parseInt(expenseValue.replaceAll(',', ''))
  totalSpendMoney += expenseNum
  totalSpend.innerText = `${totalSpendMoney.toLocaleString('ko-KR')}원`

  const spendBar = document.querySelector('.spend-summary .bar-active')
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
// 새로운 소비내역 작성 후 저장시 리스트 생성
function generateSpendList(spendList) {
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

    const oldOl = document.querySelectorAll('.spend-list-day')
    if (oldOl.length == 0) {
      spendListDiv.appendChild(newOl)
      spendEmpty.classList.add('visually-hidden')
    } else {
      for (let i of oldOl) {
        if (newOl.id > i.id) {
          spendListDiv.insertBefore(newOl, i)
          return
        }
      }
      spendListDiv.appendChild(newOl)
    }
  } else {
    ol.appendChild(contentList)
  }

  // calculate total expense
  calcTotalSpend(spendList.expense)
}
const savedSpendList = JSON.parse(localStorage.getItem('spendList'))

// 새로고침 시 저장된 데이터로 리스트 생성 or 데이터 없으면 empty 화면 출력
if (savedSpendList == null) {
  spendEmpty.classList.remove('visually-hidden')
} else {
  spendEmpty.classList.add('visually-hidden')
  spends = savedSpendList
  savedSpendList.forEach(generateSpendList)
}
