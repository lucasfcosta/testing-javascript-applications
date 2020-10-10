exports.up = async knex => {
  await knex.schema.createTable("carts", table => {
    table.increments("id");
    table.string("username");
  });

  await knex.schema.createTable("carts_items", table => {
    table.integer("cartId").references("carts.id");
    table.string("itemName");
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("carts");
  await knex.schema.dropTable("carts_items");
};
