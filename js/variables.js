// GLOBAL
const moneyInputs = document.querySelectorAll('.money-input input')
const selects = document.querySelectorAll('.details.select')

// GNB
const gnbSettingButton = document.querySelector('.gnb-setting')
const gnbButton = document.querySelector('.gnb-title')
const gnbTitle = document.querySelector('.gnb-title h2')
const gnbTitleChevron = document.querySelector('.gnb-title i')
const gnbMenu = document.querySelector('.gnb-menu')
const monthlyExpense = gnbMenu.querySelector('.monthly-expense')
const totalExpense = gnbMenu.querySelector('.total-expense')
const totalSaving = gnbMenu.querySelector('.total-saving')
const fixedExpense = gnbMenu.querySelector('.fixed-expense')
const preparingPage = document.querySelector('.preparing')

// INTRO
const introPage = document.querySelector('.intro')
const introPlusButton = document.querySelector('.intro-plus-button')

// SETTING
const settingPage = document.querySelector('.setting')
const startDaySelect = document.querySelector('.setting-input-group select')
const budgetInput = document.querySelector('.setting .money-input input')
const settingSubtxt = document.querySelector('.setting .subtxt')
const startButton = document.querySelector('.setting-start-button')

// SPEND
const spendPage = document.querySelector('.spend')
const totalSpendText = document.querySelector('.spend-summary .title')
const spendTerm = document.querySelector('.spend-summary .term')
const budgetText = document.querySelector('.spend-summary .budget span')
const addIncomeButton = document.querySelector('.spend-summary .budget button')
const addSpendButton = document.querySelector('.spend-add-button')
const spendEmpty = document.querySelector('.spend-empty')
const spendListDiv = document.querySelector('.spend-list')

// SPEND MODAL
let spendListData = []
let indexOfTargetList = null
const savedSpendListData = JSON.parse(localStorage.getItem('spendListData'))
const spendModal = document.querySelector('.spend-modal')
const modalInputGroup = document.querySelector(
  '.spend-modal-content .input-group'
)
const spendModalTitle = modalInputGroup.querySelector('h3')
const spendDate = modalInputGroup.querySelector('.spend-date span')
const calendarIcon = modalInputGroup.querySelector('.spend-date button')
const spendMoney = modalInputGroup.querySelector('.spend-expense')
const spendCatagory = modalInputGroup.querySelector('.spend-catagory')
const spendTitle = modalInputGroup.querySelector('.spend-title')
const spendMemo = modalInputGroup.querySelector('.spend-memo')
const spendStar = modalInputGroup.querySelector('.spend-star i')
const spendDeleteButton = document.querySelector('.spend-list-delete-button')
const spendSaveButton = document.querySelector('.spend-modal-save-button')
const modalCloseButton = document.querySelector('.spend-modal-close-button')
const budgetSaveButton = document.querySelector(
  '.spend-modal-save-button.add-income'
)

// CALENDAR
const calendarModal = document.querySelector('.calendar')
const calendarTitle = document.querySelector('.calendar-title h3')
const calendarPrevButton = document.querySelector(
  '.calendar-title .prev-button'
)
const calendarNextButton = document.querySelector(
  '.calendar-title .next-button'
)
const calendarContent = document.querySelector('.calendar-content .date')
const calendarDoneButton = document.querySelector('.calendar-done-button')

// OVERLAY
const overlay = document.querySelector('.overlay')

// CALENDAR DATE VARIABLES
const nowFullDate = new Date()
const nowYear = nowFullDate.getFullYear()

const nowMonth = nowFullDate.getMonth() + 1
let nextMonth = nowMonth + 1
if (nowMonth == 12) nextMonth = 1

const nowDate = nowFullDate.getDate()

const weekDay = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
]
const nowDay = weekDay[nowFullDate.getDay()]

let selectedYear = nowYear
let selectedMonth = nowMonth
let selectedDate = nowDate
