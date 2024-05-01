let template = JSON.parse(localStorage.getItem("template"))
if(!template){
  saveTheme("white", "black")
  template = JSON.parse(localStorage.getItem("template"))
}
let [background, color] = template

document.body.style.backgroundColor = background
document.body.style.color = color

function saveTheme(background, color){
  localStorage.setItem("template", JSON.stringify([background, color]))
}

const templates = [
  ["black", "white"],
  ["white", "black"],
  ["yellow", "blue"],
  ["pink", "black"],
  ["red", "white"],
  ["red", "yellow"],
  ["white", "blue"],
  ["blue", "white"],
  ["pink", "white"]
]

let index = 0

document.addEventListener("click", function(e){
  const target = e.target
  const classes = [...target.classList]
  if(classes.includes("template")){
    changeTheme()
  }
})

document.addEventListener("change", function(e){
  const target = e.target
  const color = target.value
  if(target.id === "background"){
    document.body.style.backgroundColor = color
  }
  if(target.id === "color"){
    document.body.style.color = color
  }
})

function changeTheme(){
  const template = templates[index]
  background = template[0]
  color = template[1]
  document.body.style.backgroundColor = background
  document.body.style.color = color
  index = (index + 1) % templates.length
  saveTheme(background, color)
}
