
const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")
class DishesController{
    async create(request, response){
        
        const {title,category, price, description,tags} = request.body 
        
        const user_id = request.user.id

        const imageFilename = request.file.filename

       const diskStorage = new DiskStorage()

        const filename = await diskStorage.saveFile(imageFilename)

        const [product_id] = await knex("products").insert({
            title,
            Image: filename,
            category,
            price,
            description, 
            user_id
        })
        
        const tagsInsert = tags.map(name =>{

            return{
                name,
                product_id,
                user_id 
            }
        })

        await knex("tags").insert(tagsInsert)

        return response.json("Produto cadastrado com sucesso");
    }
    async update(request, response){
        const {title, category, price, description, tags} = request.body  
        const {id} = request.params

        
        const dishes = await knex("products").where({id}).first()

          
            dishes.title = title ?? dishes.title;
            dishes.description = description ?? dishes.description;
            dishes.price = price ?? dishes.price;
            dishes.category = category ?? dishes.category
           // dishes.updated_at = knex.fn.now()

           await knex("products").where({id}).update(dishes)
           await knex("products").where({id}).update('updated_at', knex.fn.now())

             console.log(dishes)
           
            const tagsInsert = tags.map(name =>{
                
                return{
               product_id: id,
               name,
               user_id: dishes.user_id
            }
            })

        console.log(tagsInsert)
        
        await knex("tags").where({product_id: id}).delete();
     
        await knex("tags").where({product_id: id}).insert(tagsInsert);

        

        return response.json(dishes)
    }
    async show (request,response){
        const {id} = request.params

        const products = await knex("products").where({id}).first()
        const tags = await knex("tags").where({product_id: id}).orderBy("name")
        const categories = await knex("categories")

        return response.json({
            ...products,
             tags,
             categories
        })
    }
    async delete(request,response){
        const {id} = request.params

        await knex("products").where({id}).delete()

        return response.json("Produto Apagado")
    }

    async index(request, response){

        const {title, tags} = request.query
    
        let products

        if(tags){

            const filterTags = tags.split(',').map( tag => tag.trim())

            products = await knex("products")
            .select([
                "products.id",
                "products.title",
                "products.description",
                "products.category",
                "products.price",
                "products.Image",
            ])
            .whereLike("products.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("products","products.id", "tags.product_id")
            .orderBy("products.title")
            
        }
                   
        else{
            products = await knex("products")
          
            .whereLike("title",`%${title}%`)
            .orderBy("title")
            .groupBy("title")
            .distinct()
        }
        
        const userTags = await knex("tags")
        

        const productsWithTags = products.map(product =>{
        
            const productTags = userTags.filter(tag => tag.product_id === product.id)

            return {
                ...product,
               tags: productTags, 
            }
        })

        return response.json(productsWithTags)

    }
}

module.exports = DishesController