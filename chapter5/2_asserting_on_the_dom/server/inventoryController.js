const { db } = require("./dbConnection");

const removeFromInventory = async itemName => {
  const inventoryEntry = await db
    .select()
    .from("inventory")
    .where({ itemName })
    .first();

  if (!inventoryEntry || inventoryEntry.quantity === 0) {
    const err = new Error(`${itemName} is unavailable`);
    err.code = 400;
    throw err;
  }

  await db("inventory")
    .decrement("quantity")
    .where({ itemName });
};

module.exports = { removeFromInventory };
