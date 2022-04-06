const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/message', (req, res) => {
    res.json({
        message: 'Hello World'
    })    
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http corriendo en el puerto ${server.address().port}`);
})
server.on('error', (err) => console.log(`Error en servidor: ${err}`))
