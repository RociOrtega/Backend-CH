const express = require('express');
const app = express();
const Container = require('./Container');
const products = new Container('products.txt');

app.get('/products', (req, res) => {
    products.getAll().then(totalProducts => res.send(totalProducts))
})

app.get('/randomProducts', (req, res) => {
    products.getByRandomId().then(product => res.send(product))
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log('Servidor http en el puerto 8080');
});

server.on('error', (err) => {console.log(`Error en el servidor ${err}`)});