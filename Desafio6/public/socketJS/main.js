const socket = io.connect();

socket.on("products", async products => {
  const promiseHTML = await makeATable(products)
  const html = promiseHTML
  document.getElementById("products").innerHTML = html
})

function addProduct(e){
  const product = {
    title: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value
  }
  socket.emit("new-product", product)
  document.getElementById("addProductByForm").reset()
  return false
}
function makeATable(products){
  return fetch("table/table.hbs")
    .then(response => response.text())
    .then(template => {
      const html = Handlebars.compile(template)({
        products,
        thereIsProducts: products.length
      })
      return html
    })
}

const inputUsername = document.getElementById("inputUsername")
const inputMessage = document.getElementById("inputMessage")

const sendMessageForm = document.getElementById("sendMessageForm")
sendMessageForm.addEventListener("submit", e => {
  let date = new Date()
  const dateTime = `${
    date.getDate().toString().padStart(2, "0")}-${date.getMonth().toString().padStart(2, "0")}-${date.getFullYear().toString().padStart(4, "0")} ${
    date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")} 
    `
  const message = {
    username: inputUsername.value,
    dateTime,
    message: inputMessage.value
  }
  socket.emit("new-message", message)
  return false
})
socket.on("messages", messages => {
  makeATable(messages)
})
function makeAList(messages){
  const htmlTag = messages.map((message,index) => { 
    return (`<div>
      <strong>
        ${message.username}
      </strong>
      <span>
        [${message.dateTime}]
      </span> :
      <em>${message.message}</em>
    </div>`)
  }).join("")
  document.getElementById("messages").innerHTML = htmlTag
}