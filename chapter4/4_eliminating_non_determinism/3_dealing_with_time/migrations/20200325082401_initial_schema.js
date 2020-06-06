exports.up = async knex => {
  await knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("username");
    table.unique("username");
    table.string("email");
    table.string("passwordHash");
  });

  await knex.schema.createTable("carts_items", table => {
    table.integer("userId").references("users.id");
    table.string("itemName");
    table.unique("itemName");
    table.integer("quantity");
  });

  await knex.schema.createTable("inventory", table => {
    table.increments("id");
    table.string("itemName");
    table.unique("itemName");
    table.integer("quantity");
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("carts_items");
  await knex.schema.dropTable("inventory");
};
