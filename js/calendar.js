// title
const calendarTitle = document.querySelector('.calendar-title h3')
calendarTitle.innerText = `${nowMonth}월`

//content
const calendarContent = document.querySelector('.calendar-content .date')
let template = ''

for (let i = 1; i < 31; i++) {
  template += `<div>${i}</div>`
}

calendarContent.innerHTML = template
