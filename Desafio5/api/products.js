const { promises: fs } = require('fs');
class Container{
  constructor(){
    this.id = 0;
    this.products = [
      {
        "id": 1,
        "name": "Producto 1",
        "price": 123.45,
        "image": "url",
      },
      {
        "id": 2,
        "name": "Producto 2",
        "price": 567.89,
        "image": "url"
      },
      {
        "id": 3,
        "name": "Producto 3",
        "price": 987.65,
        "image": "url",
      },
      {
        "id": 4,
        "name": "Producto 4",
        "price": 543.21,
        "image": "url",
      }
    ];
  }
  getAll(){
    try{
      const totalProducts =  this.products;
        return totalProducts   
    }catch(err){
      console.log(`error al leer los productos: ${err}`)
      return [];
    }
  }    
  save(product){
    const totalProducts = this.getAll()
    let ids = 1;
    if(totalProducts.length > 0 ){
      ids = totalProducts.length + 1;
    }
    const newProduct = {...product, id: ids}                
    this.products.push(newProduct)
    return ids;
  }
  getByID(id){         
    const totalProducts = this.getAll()
    const index = totalProducts.findIndex(item => item.id == id)
    if (index == -1) {
      throw new Error(`Error al obtener producto con id: ${id}... Inténtalo nuevamente`)
    }
    return this.products[index] 
  }
  updateByID(id, newProduct){
    const totalProducts = this.getAll()
    const index = totalProducts.findIndex(item => item.id == id)
    if (index == -1) {
      throw new Error(`Error al obtener producto con id: ${id}... Inténtalo nuevamente`)
    }
    this.products[index] = {...newProduct, id: totalProducts[index].id}
  }
  deleteAll(){
    this.products = [];
  }
  async deleteByID(id){
    const totalProducts = this.getAll()
    const index = totalProducts.findIndex(item => item.id == id)
    if (index == -1) {
      throw new Error(`Error al obtener producto con id: ${id}... Inténtalo nuevamente`)
    }
    this.products.splice(index, 1)
  }
}

module.exports = Container;