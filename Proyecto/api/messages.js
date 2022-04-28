const { promises: fs } = require('fs');
class Message{
  constructor(filename){
    this.filename = filename;
  }
  async getAll(){
    try{
      const messages = await fs.readFile(`${this.filename}`,'utf-8');
      return JSON.parse(messages)   
    }catch(err){
      console.log(`error al leer los mensajes: ${err}`)
      return [];
    }
  }    
  async save(message){
    let messages = await this.getAll()
    const newMessage = message 
    messages.push(newMessage)               
    try{
      await fs.writeFile(`${this.filename}`,JSON.stringify(messages, null, 2));
      console.log("Mensaje guardado con exito")
    }catch(err){throw new Error(`error al procesar guardado del Mensaje: ${err}`);}
  } 
  deleteAll(){
    fs.unlink(`${this.filename}`, err => {
      err 
      ? console.log(`error al borrar archivo: ${err}`)
      : console.log(`Archivo borrado con exito`)
    })
  }   
}

module.exports = Message;