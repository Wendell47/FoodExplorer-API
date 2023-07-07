const knex = require("../database/knex")

class CategoryController{
    async create(request, response){
        const {category_name} = request.body

        const user_id = request.user.id

           await knex("categories")
            .insert({
                category_name,
                user_id
            })


            return response.json(`${category_name} cadastrado com sucesso`)
    }

    async index(request, response){
      
      
          const categories = await knex("categories")
          


            return response.json({categories})
    }
}




module.exports = CategoryController