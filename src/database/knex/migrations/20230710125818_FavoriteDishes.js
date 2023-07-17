
exports.up = knex => knex.schema.createTable("favoriteDishes", table =>{
    table.increments("id");
    table.text("dish_image")
    table.text("fav_dish_name").notNullable()
    table.integer("product_id").references("id").inTable("products").onDelete("CASCADE")
    table.integer("user_id").references("id").inTable("users")
    
 });
 
 exports.down = knex => knex.schema.dropTable("favoriteDishes")