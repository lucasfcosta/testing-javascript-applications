exports.up = knex => {
  return knex.schema.alterTable("carts_items", table => {
    table.timestamp("updatedAt");
  });
};

exports.down = knex => {
  return knex.schema.alterTable("carts_items", table => {
    table.dropColumn("updatedAt");
  });
};
