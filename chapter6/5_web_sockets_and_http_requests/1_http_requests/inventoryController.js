const data = { inventory: {} };

const API_ADDR = "http://127.0.0.1:3000";

const addItem = async (itemName, quantity) => {
  const currentQuantity = data.inventory[itemName] || 0;
  data.inventory[itemName] = currentQuantity + quantity;

  await fetch(`${API_ADDR}/inventory/${itemName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity })
  });

  return data.inventory;
};

module.exports = { API_ADDR, data, addItem };
