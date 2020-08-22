const data = { inventory: {} };

const API_ADDR = "http://localhost:3000";

const addItem = (itemName, quantity) => {
  const { client } = require("./socket");
  const currentQuantity = data.inventory[itemName] || 0;
  data.inventory[itemName] = currentQuantity + quantity;

  fetch(`${API_ADDR}/inventory/${itemName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-socket-client-id": client.id
    },
    body: JSON.stringify({ quantity })
  });

  return data.inventory;
};

module.exports = { API_ADDR, data, addItem };
