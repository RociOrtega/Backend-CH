const express = require("express")
const app = express()

const ProductsApi = require("./api/products.js")
const apiProducts = new ProductsApi()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", "./views")

app.post('/products', (req, res) => {
  const product = req.body
  apiProducts.save(product)
  res.redirect('/')
})

app.get('/products', (req, res) => {
  const products = apiProducts.getAll()
  res.render("view", {
    products,
    thereIsProducts: products.length
  })
})

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
server.on('error', (err) => {
  console.log(`Error: ${err}`)
})