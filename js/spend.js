// open and close add modal
const addButton = document.querySelector('.spend .spend-add-button')
const modalCloseButton = document.querySelector('.modal-add .modal-add-close')
const addModal = document.querySelector('.modal')

function handleModal() {
  addModal.classList.toggle('visually-hidden')
}

addButton.addEventListener('click', handleModal)
modalCloseButton.addEventListener('click', handleModal)
