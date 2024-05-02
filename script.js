let items = JSON.parse(localStorage.getItem("items"))
if(!items){
  items = []
}
//console.log(items)
const list = document.querySelector(".list")
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const activity = ["Click for edit", "Work", "Study", "Buy a coffee"]

const date = new Date()
document.querySelector(".today").textContent = `${day[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`

document.querySelector(".years").textContent = String(date.getFullYear())

function add(){
  save()
  items = items.filter(el => el).map((el, i) => el.replace(/(?<=item\s)\d*/, i))
  list.innerHTML = items.reduce((acc, cur) => acc + "\n" + cur, "")
  //console.log(array)
}
add(items)
function update(target){
  const parent = target.parentElement
  //console.log(parent.classList[1])
  items[parent.classList[1]] = parent.outerHTML
  save()
}

function save(){
  localStorage.setItem("items", JSON.stringify(items))
}

function deleted(target){
  delete items[target.parentElement.classList[1]]
  add(items)
  //console.log("delete", target.parentElement)
}

document.addEventListener("click", function(e){
  const array = [...e.target.classList]
  const target = e.target
  if(array.includes("checkbox")){
    //e.target.nextSibling.nextSibling.style.textDecoration = e.target.checked ? "line-through" : "none"
    
    target.previousSibling.previousSibling.classList.toggle("checked")
    if([...target.classList].includes("active")){
      //console.log(target.previuosSibling.previuosSibling.classList)
      //add(items)
    }
    update(target)
  }
  if(array.includes("add")){
    add(items)
    const i = items.length
    const item =
`<div class="item ${i}">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 container--delete delete">
    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
    </svg>

  <div class="text" contenteditable="true">${activity[items.length] || activity[0]}</div>
  <svg class="checkbox" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
   <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
  </svg>
</div>`
    items.push(item)
    add(items)
    //console.log(items.length)
  }
  if(array.includes("delete")){
    deleted(target)
  }
  if(array.includes("save")){
    save()
    alert("Saved items")
  }
  if(array.includes("clear")){
    items = []
    add(items)
  }
  //console.log(target)
})

document.addEventListener("input", function(e){
  const target = e.target
  const array =  [...target.classList]
  if(array.includes("text")){
    update(target)
  }
})

