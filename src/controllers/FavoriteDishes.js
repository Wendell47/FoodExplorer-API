const knex = require("../database/knex")

class FavoriteDishesController{
    async create(request, response){
        
        const {id} = request.params 
        
        const user_id = request.user.id

        const dish = await knex("products").where({id}).first()

        if(!dish){

            return response.json("prato inexistente")
        }

        await knex("favoriteDishes").insert({
            fav_dish_name: dish.title,
            user_id,
            product_id: dish.id,
        })
        
        return response.json("Criado prato favorito com sucesso");
    }
   
    async show(request, response){
          
        const user_id = request.user.id

        const FavoriteDishes = await knex("favoriteDishes").where({user_id})

        if(!FavoriteDishes){

            return response.json("prato inexistente")
        }
  
        return response.json(FavoriteDishes);
    }

    async delete(request, response){
          
        const user_id = request.user.id
        const {id} = request.params 

        const FavoriteDishes = await knex("favoriteDishes").where({id})

        if(!FavoriteDishes){

            return response.json("prato inexistente")
        }
        
        await knex("favoriteDishes").where({id}).delete()

        return response.json("removido como favorito");
    }
   
}
module.exports = FavoriteDishesController