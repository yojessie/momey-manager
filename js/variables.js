// GNB
const gnbTitle = document.querySelector('.gnb-title h2')

// INTRO
const introAddButon = document.querySelector('.intro-add')
const introGuide = document.querySelectorAll('.intro-guide')
const introSettding = document.querySelector('.intro-setting')

const introPage = document.querySelector('.intro')
const startDaySelect = document.querySelector('.intro-setting .select')
const budgetInputs = document.querySelectorAll('.money-input input')
const startButton = document.querySelector('.intro-start-button')

// SPEND
const spendPage = document.querySelector('.spend')
// SPEND-summary
const totalSpend = document.querySelector('.spend-summary-title')
let totalSpendMoney = 0
const spendTerm = document.querySelector('.spend-summary-term')
const budget = document.querySelector('.spend-summary-budget span')
const addButton = document.querySelector('.spend .spend-add-button')

const spendEmpty = document.querySelector('.spend-empty')
const spendListDiv = document.querySelector('.spend-list')
// SPEND-add-modal
let spends = []
const addModal = document.querySelector('.modal')
const modalCloseButton = document.querySelector('.modal-add .modal-add-close')

const modalTitle = document.querySelector('.modal-add-content h3')
const calendarIcon = document.querySelector('.calendar-button button')
const starIcon = document.querySelector('.star-button i')
const addSaveButton = document.querySelector('.modal-add-save-button')

// OVERLAY
const overlay = document.querySelector('.overlay')
