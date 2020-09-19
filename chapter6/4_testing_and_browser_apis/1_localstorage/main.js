const {
  handleAddItem,
  checkFormValues,
  updateItemList
} = require("./domController");

const { data } = require("./inventoryController");

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);
form.addEventListener("input", checkFormValues);

// Run `checkFormValues` once to see if the initial state is valid
checkFormValues();

// Restore the inventory when the page loads
const storedInventory = JSON.parse(localStorage.getItem("inventory"));

if (storedInventory) {
  data.inventory = storedInventory;
  updateItemList(data.inventory);
}
