const { inventory, removeFromInventory } = require("./inventoryController");
const logger = require("./logger");

const carts = new Map();

const addItemToCart = (username, item) => {
  removeFromInventory(item);
  const newItems = (carts.get(username) || []).concat(item);

  if (!compliesToItemLimit(newItems)) {
    inventory.set(item, inventory.get(item) + 1);
    const limitError = new Error(
      "You can't have more than three units of an item in your cart"
    );
    limitError.code = 400;
    throw limitError;
  }

  carts.set(username, newItems);
  logger.log(`${item} added to ${username}'s cart`);
  return newItems;
};

const compliesToItemLimit = cart => {
  const unitsPerItem = cart.reduce((itemMap, itemName) => {
    const quantity = (itemMap[itemName] || 0) + 1;
    return { ...itemMap, [itemName]: quantity };
  }, {});

  return Object.values(unitsPerItem).every(quantity => quantity <= 3);
};

module.exports = { addItemToCart, carts, compliesToItemLimit };
