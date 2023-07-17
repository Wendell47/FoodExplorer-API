exports.up = knex => knex.schema.createTable("CartItens", table =>{
    table.increments("id");
    table.text("title")
    table.integer("quantity")
    table.integer("price")
    table.integer("product_id").references("id").inTable("products").onDelete("CASCADE")
    table.integer("user_id").references("id").inTable("users")
    table.timestamp('created_at').default(knex.fn.now())
 });
 
 exports.down = knex => knex.schema.dropTable("CartItens")