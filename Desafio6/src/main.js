const express = require('express');
const app = express();
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');
const httpServer = new HttpServer(app);
const socketIo = new Socket(httpServer);

const ProductsDoc = require("../api/products")
const productsApi = new ProductsDoc('products.txt')
const MessagesDoc = require("../api/messages")
const messagesApi = new MessagesDoc('messages.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("../public"))

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname})
})
socketIo.on("connection", async socket => {
  console.log("New client connected")
  const products = await productsApi.getAll()
  socket.emit("products", products)
  socket.on("new-product", async product => {
    await productsApi.save(product)
    const products = await productsApi.getAll()
    socketIo.socket.emit("products", products)
  })
  const messages = await messagesApi.getAll()
  socket.emit("messages", messages)
  socket.on("new-message", async message => {
    await messagesApi.save(message)
    const messages = await messagesApi.getAll().then(messages => messages)
    socketIo.socket.emit("messages", messages)
  })
})

const PORT = 8080
const server = httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${server.address().port}`)
})
server.on("error", err => {
  console.log(err)
})
