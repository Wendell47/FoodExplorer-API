
const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")


class ProductsController{
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
               product_id,
               name,
               user_id 
            }
        })

        

        await knex("tags").insert(tagsInsert)

        return response.json("Produto cadastrado com sucesso");
    }
    async update(request, response){
        const {category} = request.body  

        const {product_id} = request.params

        const product = await knex("products").where({id: product_id}).first()
        const [category_name] = await knex("categories").where({category_name: category})

        product.category = category_name.category_name

        await knex("products").update(product).where({id:product_id})

        return response.json(product)
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

        const {title, tags, category} = request.query
        const user_id = request.user.id

        let products

        if(tags){

            const filterTags = tags.split(',').map( tag => tag.trim())

            products = await knex("tags")
            .select([
                "products.id",
                "products.title",
                "products.user_id",
            ])
            .where("products.user_id", user_id)
            .whereLike("products.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("products","products.id", "tags.product_id")
            .orderBy("products.title")

        }
        else if(category){
            
            products = await knex("categories")
            .select([
                "products.id",
                "products.title",
                "products.user_id",
                
            ])
            .where("products.category", category)
            
        }            
        else{
            products = await knex("products")
          
            .whereLike("title",`%${title}%`)
            .orderBy("title")
            .groupBy("title")
            .distinct()
        }
        
        const userTags = await knex("tags")
        .where({user_id})
        .groupBy("name")

        const productsWithTags = products.map(product =>{
        
            const productTags = userTags.filter(tag => tag.product_id === product.id)

            return {
                ...products,
               tags: productTags 
            }
        })

        return response.json(products)

    }
}

module.exports = ProductsController