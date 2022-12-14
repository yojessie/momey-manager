//// 모달 제어 관련 함수
// 소비내역 추가 모달 열기
function openAddSpendModal() {
  generateCatagory(catagories.spend)
  spendModalTitle.innerText = '소비 내역'
  spendDate.innerText = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}`
  spendModal.classList.remove('visually-hidden')
}
addSpendButton.addEventListener('click', openAddSpendModal)

// 예산추가 모달 열기
function openAddIncomeModal() {
  generateCatagory(catagories.income)
  spendModalTitle.innerText = '예산 추가'
  spendDate.innerText = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}`
  spendMoney.setAttribute('placeholder', '추가 금액(필수)')
  spendStar.parentElement.classList.add('visually-hidden')
  spendSaveButton.classList.add('add-income')
  spendModal.classList.remove('visually-hidden')
}
addIncomeButton.addEventListener('click', openAddIncomeModal)

// 리스트 클릭 시 수정 모달 열기
function openModifyModal(e) {
  const targetList = e.target.closest('.spend-list-item')
  const savedSpendListData = JSON.parse(localStorage.getItem('spendListData'))

  if (targetList) {
    if (targetList.classList.contains('income')) {
      openAddIncomeModal()
    } else {
      openAddSpendModal()
    }

    savedSpendListData.forEach((i) => {
      if (i.id == targetList.id) {
        spendDate.innerText = i.date
        spendMoney.value = i.money
        spendCatagory.value = i.catagory
        spendTitle.value = i.title
        spendMemo.value = i.memo
        if (i.star) spendStar.classList.add('red')

        indexOfTargetList = savedSpendListData.indexOf(i)
      }
    })
  }

  spendCatagory.style.color = '#3d434b'
  spendDeleteButton.classList.remove('visually-hidden')
  spendSaveButton.removeAttribute('disabled')
  spendSaveButton.classList.add('modify')
}
spendListDiv.addEventListener('click', openModifyModal)

// 모달 내 인풋 채우면 저장버튼 활성화
function activeModalSaveButton() {
  if (
    spendMoney.value !== '' &&
    spendCatagory.value !== '' &&
    spendTitle.value !== ''
  ) {
    spendSaveButton.removeAttribute('disabled')
  } else {
    spendSaveButton.setAttribute('disabled', '')
  }
}
spendMoney.addEventListener('keyup', activeModalSaveButton)
spendCatagory.addEventListener('change', activeModalSaveButton)
spendTitle.addEventListener('keyup', activeModalSaveButton)

// 모달 닫기 및 리셋
function closeSpendModal() {
  spendModal.classList.add('visually-hidden')
  resetModal()
}
modalCloseButton.addEventListener('click', closeSpendModal)

function resetModal() {
  spendDate.innerText = `${nowYear}년 ${nowMonth}월 ${nowDate}일 ${nowDay}`
  spendMoney.value = ''
  spendCatagory.value = ''
  spendCatagory.style.color = 'rgba(61, 67, 75, 0.3)'
  spendTitle.value = ''
  spendMemo.value = ''
  spendStar.classList.remove('red')
  spendStar.parentElement.classList.remove('visually-hidden')
  spendDeleteButton.classList.add('visually-hidden')
  spendSaveButton.setAttribute('disabled', '')
  spendSaveButton.className = 'spend-modal-save-button button button-green'
  selectedYear = nowYear
  selectedMonth = nowMonth
  selectedDate = nowDate
}

//// 모달 데이터 저장 및 수정 관련 함수
// 리스트 추가 함수
function addSpendList() {
  const listData = {
    id: Date.now(),
    section: 'spend',
    date: spendDate.innerText,
    dateId: getDateId(),
    money: spendMoney.value,
    catagory: spendCatagory.value,
    title: spendTitle.value,
    memo: spendMemo.value,
    star: spendStar.classList.contains('red'),
  }
  if (spendSaveButton.classList.contains('add-income')) {
    listData.section = 'income'
  }
  spendListData.push(listData)
  spendListData.sort((a, b) => b.dateId - a.dateId)
  saveSpendList()

  generateSpendList(listData)
  plusTotalMoney(listData.money)
}

// 리스트 수정 함수
function modifySpendList() {
  const targetList = spendListData[indexOfTargetList]

  const listData = {
    id: targetList.id,
    section: targetList.section,
    date: spendDate.innerText,
    dateId: getDateId(),
    money: spendMoney.value,
    catagory: spendCatagory.value,
    title: spendTitle.value,
    memo: spendMemo.value,
    star: spendStar.classList.contains('red'),
  }

  const targetMoney = parseInt(targetList.money.replaceAll(',', ''))
  const newMoney = parseInt(listData.money.replaceAll(',', ''))
  if (targetMoney > newMoney) {
    const calcAmouunt = targetMoney - newMoney
    minusTotalMoney(calcAmouunt.toString())
  } else if (targetMoney < newMoney) {
    const calcAmouunt = newMoney - targetMoney
    plusTotalMoney(calcAmouunt.toString())
  }

  spendListData[indexOfTargetList] = listData
  saveSpendList()

  const savedSpendListData = JSON.parse(localStorage.getItem('spendListData'))
  spendListDiv.innerHTML = ''
  savedSpendListData.forEach(generateSpendList)
}

// 리스트 삭제 함수
function deleteSpendList() {
  minusTotalMoney(spendListData[indexOfTargetList].money)
  spendListData.splice(indexOfTargetList, 1)
  saveSpendList()

  const savedSpendListData = JSON.parse(localStorage.getItem('spendListData'))
  spendListDiv.innerHTML = ''
  savedSpendListData.forEach(generateSpendList)
  closeSpendModal()

  if (spendListData.length == 0) {
    spendEmpty.classList.remove('visually-hidden')
  }
}
spendDeleteButton.addEventListener('click', deleteSpendList)

// spendListData array를 로컬에 저장
function saveSpendList() {
  localStorage.setItem('spendListData', JSON.stringify(spendListData))
}

// 날짜정보의 타입을 숫자로 바꿔주는 함수
function getDateId() {
  const month = selectedMonth.toString().padStart(2, '0')
  const date = selectedDate.toString().padStart(2, '0')
  const fullDate = selectedYear + month + date

  return parseInt(fullDate)
}

// 리스트 생성
function generateSpendList(listData) {
  const contentList = document.createElement('li')
  contentList.className = 'spend-list-item'
  contentList.id = listData.id

  const button = document.createElement('button')
  button.setAttribute('type', 'button')

  const template = `
    <div class="content">
      <div class="catagory">${listData.catagory}</div>
      <div class="title">
        <span>${listData.title}</span>
        <i class="icon-star"></i>
      </div>
      <span class="money">${listData.money}원</span>
    </div>
    <span class="memo">${listData.memo}</span>`

  const blueTemplate = `
    <div class="content">
      <div class="catagory blue-text blue-border">${listData.catagory}</div>
      <div class="title">
        <span class="blue-text">${listData.title}</span>
        <i class="icon-star"></i>
      </div>
      <span class="money blue-text">+ ${listData.money}원</span>
    </div>
    <span class="memo">${listData.memo}</span>`

  if (listData.section == 'income') {
    contentList.classList.add('income')
    button.innerHTML = blueTemplate
  } else {
    button.innerHTML = template
  }

  contentList.appendChild(button)

  // check star button
  const star = contentList.querySelector('.title  i')
  if (!listData.star) star.style.display = 'none'

  // create new ol or insert old ol
  const ol = document.getElementById(listData.dateId)

  if (ol == null) {
    const newOl = document.createElement('ol')
    newOl.className = 'spend-list-day'
    newOl.id = listData.dateId

    const titleList = document.createElement('li')
    titleList.className = 'spend-list-title'
    titleList.innerText = listData.date

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
}

// 저장하기 버튼 클릭 이벤트
function submitSpendList(e) {
  e.preventDefault()

  if (this.classList.contains('modify')) {
    modifySpendList()
  } else {
    addSpendList()
  }
  closeSpendModal()
}
spendSaveButton.addEventListener('click', submitSpendList)

// spend-summary 영역 total 금액 더하기
function plusTotalMoney(moneyValue) {
  let totalSpendMoney = parseInt(localStorage.getItem('totalSpend'))
  let totalIncomeMoney = parseInt(localStorage.getItem('totalIncome'))

  if (spendSaveButton.classList.contains('add-income')) {
    totalIncomeMoney += parseInt(moneyValue.replaceAll(',', ''))
    localStorage.setItem('totalIncome', totalIncomeMoney)
  } else {
    totalSpendMoney += parseInt(moneyValue.replaceAll(',', ''))
    localStorage.setItem('totalSpend', totalSpendMoney)
  }
  showTotalSpendSummary()
}

// spend-summary 영역 total 금액 빼기
function minusTotalMoney(moneyValue) {
  let totalSpendMoney = parseInt(localStorage.getItem('totalSpend'))
  let totalIncomeMoney = parseInt(localStorage.getItem('totalIncome'))

  if (spendSaveButton.classList.contains('add-income')) {
    totalIncomeMoney -= parseInt(moneyValue.replaceAll(',', ''))
    localStorage.setItem('totalIncome', totalIncomeMoney)
  } else {
    totalSpendMoney -= parseInt(moneyValue.replaceAll(',', ''))
    localStorage.setItem('totalSpend', totalSpendMoney)
  }
  showTotalSpendSummary()
}

// 새로고침 시 저장된 데이터로 리스트 생성 or 데이터 없으면 empty 화면 출력
if (savedSpendListData == null || savedSpendListData.length == 0) {
  spendEmpty.classList.remove('visually-hidden')
} else {
  spendEmpty.classList.add('visually-hidden')
  spendListData = savedSpendListData
  savedSpendListData.forEach(generateSpendList)
  showTotalSpendSummary()
}

//// 서브함수
// 캘린더 아이콘 클릭 시 캘린더 모달 열기
function openCalendarModal() {
  generateCalendar(nowFullDate)
  overlay.classList.remove('visually-hidden')
  calendarModal.classList.remove('visually-hidden')
}
calendarIcon.addEventListener('click', openCalendarModal)

// 모달 내 별 버튼 클릭 이벤트
function activeStarButton() {
  spendStar.classList.toggle('red')
}
spendStar.addEventListener('click', activeStarButton)

// 모달 내 타이틀 인풋 글자수 제한 (최대 20바이트)
function limitSpendTitleByte() {
  spendTitle.removeAttribute('readonly')

  const titleValue = spendTitle.value
  const maxByte = 20
  let totalByte = 0
  let count = 0

  for (let i = 0; i < titleValue.length; i++) {
    totalByte += titleValue.charCodeAt(i) > 128 ? 2 : 1
    count++

    if (totalByte > maxByte) {
      spendTitle.value = titleValue.slice(0, count - 1)
      spendTitle.setAttribute('readonly', '')
    }
  }
}
spendTitle.addEventListener('keyup', limitSpendTitleByte)
