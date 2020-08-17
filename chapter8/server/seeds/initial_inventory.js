exports.seed = async knex => {
  await knex("inventory").del();
  return knex("inventory").insert([
    { itemName: "cheesecake", quantity: 8 },
    { itemName: "apple pie", quantity: 2 },
    { itemName: "carrot cake", quantity: 5 }
  ]);
};
