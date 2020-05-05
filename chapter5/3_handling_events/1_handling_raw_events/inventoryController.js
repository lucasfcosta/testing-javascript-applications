const data = { inventory: {} };

const addItem = (itemName, quantity) => {
  const currentQuantity = data.inventory[itemName] || 0;
  data.inventory[itemName] = currentQuantity + quantity;
  return data.inventory;
};

module.exports = { data, addItem };
