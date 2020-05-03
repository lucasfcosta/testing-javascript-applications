const { addItem, data } = require("./inventoryController");
const { updateItemList } = require("./domController");

addItem("cheesecake", 3);
addItem("apple pie", 8);
addItem("carrot cake", 7);

updateItemList(data.inventory);
