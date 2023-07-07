
exports.up = knex => knex.schema.createTable("categories", table =>{
    table.increments("id");
    table.text("category_name").notNullable()

    table.integer("user_id").references("id").inTable("users")
    
 });
 
 exports.down = knex => knex.schema.dropTable("tags")