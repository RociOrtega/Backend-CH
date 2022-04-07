const { promises: fs } = require('fs')

class Container {
    constructor(filename) {
        this.filename = filename;
    }

    async save(product){

        let totalProducts = await this.getAll();    
        let id = 1;
        if(totalProducts.length > 0 ){
            let finalIndex = totalProducts.length - 1;
            id = (totalProducts[finalIndex].id) + 1;
        }
        const addProduct = {...product, id: id};
        totalProducts.push(addProduct);
        try{
            await fs.writeFile(`${this.filename}`,JSON.stringify(totalProducts, null, 2));
            console.log(`El producto id: ${id} se ha guardado...`);
        }catch(err){
            throw new Error(`Algo ha ocurrido mientras se guardaba tu producto: ${err}. Intente nuevamente...`);
        }
    }

    async getById(id){
        const totalProducts = await this.getAll();
        try{
            let findProduct = totalProducts.find(product => product.id == id);
            return findProduct; 
        }catch(error){
            console.log(`Error al buscar el producto por ID: ${error}. Intente nuevamente...`); 
        }        
    }
    async getByRandomId(){
        const totalProducts = await this.getAll();
        try{
            let id = Math.floor(Math.random() * (totalProducts.length)) + 1;
            let findRamdomProduct = totalProducts.find(product => product.id == id);
            return findRamdomProduct; 
        }catch(error){
            console.log(`Error al buscar el producto por ID: ${error}. Intente nuevamente...`); 
        }        
    }
    async getAll() {
        try {
        const totalProducts = await fs.readFile(this.filename, 'utf-8');
        return JSON.parse(totalProducts);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        const totalProducts = await this.getAll();
        const findProduct = totalProducts.findIndex(product => product.id == id);
        if (findProduct != -1) {
            totalProducts.splice(findProduct, 1);
        }else{
            throw new Error(`No se encontró el producto con el id: ${id}`);
        }
        try{
            await fs.writeFile(this.filename, JSON.stringify(totalProducts, null, 2));
        }catch(error){
            throw new Error(`Error al borrar el producto: ${error}`);
        }
    }

    async deleteAll() {
        await fs.writeFile(this.filename, JSON.stringify([], null, 2))
    }
}

module.exports = Container;