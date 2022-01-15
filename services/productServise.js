const  boom  = require('@hapi/boom');
const faker= require('faker')


class ProductService {

constructor(){
  this.products=[];
  this.generate();


}

async generate(){

  const limit = 100;
  for (let i = 0; i < limit ; i++) {

    this.products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      image: faker.image.imageUrl(),
      isBlock:faker.datatype.boolean()
    });


  }
}

async create(data){
const newProduct={
  id: faker.datatype.uuid(),
  ...data

}
this.products.push(newProduct)
return newProduct;

}

async find(){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {

      resolve (this.products);
    }, 4000);
  })
}

async findOne(id){
 const product = this.products.find(item => item.id === id)
if(!product){
  throw boom.notFound('product not found t')
}
if (product.isBlock) {
  throw boom.conflict('product is block')
}

return product
}

async uptate(id,changes){
 const index = this.products.findIndex(item => item.id === id);
  if (index === -1) {
    throw  boom.notFound("porduct not found")
  }
    let data= this.products[index];
  this.products[index]={
    ...data,
    ...changes
  };
  return this.products[index]
}

async delete(id){
  const index = this.products.findIndex(item => item.id === id);
  if (index === -1) {
    throw new Error('product not found')
  }
  this.products.splice(index,1)
return {id}
}

}


module.exports = ProductService
