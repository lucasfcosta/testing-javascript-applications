const data = { inventory: {} };

const addItem = (itemName, quantity) => {
  const currentQuantity = data.inventory[itemName] || 0;
  data.inventory[itemName] = currentQuantity + quantity;
};

module.exports = { data, addItem };
