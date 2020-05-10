const {
  handleAddItem,
  checkFormValues,
  handleUndo,
  handlePopstate,
  updateItemList
} = require("./domController");

const { data } = require("./inventoryController");

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);
form.addEventListener("input", checkFormValues);

const undoButton = document.getElementById("undo-button");
undoButton.addEventListener("click", handleUndo);

window.addEventListener("popstate", handlePopstate);

// Run `checkFormValues` once to see if the initial state is valid
checkFormValues();

// Restore the inventory when the page loads
const storedInventory = JSON.parse(localStorage.getItem("inventory"));

if (storedInventory) {
  data.inventory = storedInventory;
  updateItemList(data.inventory);
}
