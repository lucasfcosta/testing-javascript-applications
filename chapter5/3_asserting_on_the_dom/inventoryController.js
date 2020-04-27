const inventory = { items: [] };

const addItem = (itemName, quantity) => {
  inventory.items.push({ itemName, quantity });
  return inventory;
};

module.exports = { inventory, addItem };
