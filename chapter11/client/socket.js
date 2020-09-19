const { API_ADDR, data } = require("./inventoryController");
const { updateItemList } = require("./domController");

const client = { id: null };

const io = require("socket.io-client");

const handleAddItemMsg = ({ itemName, quantity }) => {
  const currentQuantity = data.inventory[itemName] || 0;
  data.inventory[itemName] = currentQuantity + quantity;
  return updateItemList(data.inventory);
};

const connect = () => {
  return new Promise(resolve => {
    const socket = io(API_ADDR);

    socket.on("connect", () => {
      client.id = socket.id;
      resolve(socket);
    });

    socket.on("add_item", handleAddItemMsg);
  });
};

module.exports = { client, connect, handleAddItemMsg };
