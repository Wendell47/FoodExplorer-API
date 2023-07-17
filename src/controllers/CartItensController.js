const knex = require("../database/knex")

class CartItensController{

async create(request, response){
        
    const {title,quantity, price, product_id} = request.body 
    
    const user_id = request.user.id


    await knex("CartItens").insert({
        title,
        price,
        quantity,
        product_id,
        user_id
    })



    return response.json("Produto cadastrado com sucesso");
}

async show(request, response){

    const user_id = request.user.id

    const CartItem = await knex("CartItens").where({user_id})

    return response.json(CartItem)
}

async delete(request, response){
          

    const {id} = request.params 

    const cartItem = await knex("CartItens").where({id}).first()

    if(!cartItem){

        return response.json("prato inexistente")
    }
    
    await knex("CartItens").where({id}).delete()

    return response.json("removido como favorito");
}

}

module.exports = CartItensController