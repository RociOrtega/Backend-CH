const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const ProductsFromApi = require('./api/products.js')
const productsFromApi = new ProductsFromApi()

app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
  })
)

app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/products', (req, res) => {
  const totalProducts = productsFromApi.getAll()
  const thereIsProducts = totalProducts.length > 0 ? true : false
  const thereIsNoProducts = totalProducts.length > 0 ? false : true
  res.render('main', { 
    totalProducts: totalProducts, 
    productsExists: thereIsProducts,
    productsNotExists: thereIsNoProducts,
    title: 'Vista de productos'
  })
})
/*app.post('/', (req, res) => {
  const newProduct = productsFromApi.save(req.body)
  res.render('main', { newProduct: newProduct, productsExists: true })
})*/

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor http corriendo en el puerto ${server.address().port}`);
})
server.on('error', (err) => console.log(`Error en servidor: ${err}`))