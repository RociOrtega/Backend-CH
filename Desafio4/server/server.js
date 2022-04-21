const express = require('express');
const { Router } = express;

const app = express();
const PORT = 8080;
app.use('/api/products', productsRouter);
app.use(express.static('../public'));

const ProductsFromApi = require('../api/products.js');
const productsFromApi = new ProductsFromApi(); 

const productsRouter = new Router();
productsRouter.use(express.json());
productsRouter.use(express.urlencoded({ extended: true }));

productsRouter.get('/', (req,res) => {
    let totalProducts = productsFromApi.getAll()
    res.json(totalProducts) 
})
productsRouter.post('/', (req,res) => {
    const id = productsFromApi.save(req.body)
    res.json(id)
})
productsRouter.get('/:id', (req,res) => {
    const id = req.params.id;
    let product = productsFromApi.getByID(id)
    res.json(product) 
})
productsRouter.put('/:id', (req,res) => {
    const id = req.params.id;
    const product = req.body
    productsFromApi.updateByID(id, product)
    res.json('Tu producto se ha actualizado con éxito')
})
productsRouter.delete('/:id', (req,res) => {
    const id = req.params.id;
    productsFromApi.deleteByID(id)
    res.json('Tu producto se ha eliminado con éxito')
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http corriendo en el puerto ${server.address().port}`);
})
server.on('error', (err) => console.log(`Error en servidor: ${err}`))