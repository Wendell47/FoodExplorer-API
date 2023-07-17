const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class DishesImageController{

async update(request,response){

    const user_id = request.user.id
    
    const {id} = request.params

    const imageFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex("users")
    .where({id: user_id}).first()

    const product = await knex("products")
    .where({id}).first()

       if(!user){
        throw new AppError("Somente usuários autenticados podem mudar a imagem do produto", 401)
    }
    
    if(product.Image){
        await diskStorage.deleteFile(product.Image)
    }


    const filename = await diskStorage.saveFile(imageFilename)
    product.Image = filename
    


    await knex("products").update(product).where({id})

    return response.json(product);
}

    
}

module.exports= DishesImageController