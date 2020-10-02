const { connect } = require("./socket");

const {
  handleAddItem,
  checkFormValues,
  handleUndo,
  handlePopstate,
  updateItemList
} = require("./domController");

const { API_ADDR, data } = require("./inventoryController");

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);
form.addEventListener("input", checkFormValues);

const undoButton = document.getElementById("undo-button");
undoButton.addEventListener("click", handleUndo);

window.addEventListener("popstate", handlePopstate);

// Run `checkFormValues` once to see if the initial state is valid
checkFormValues();

const loadInitialData = async () => {
  try {
    const inventoryResponse = await fetch(`${API_ADDR}/inventory`);
    data.inventory = await inventoryResponse.json();
    return updateItemList(data.inventory);
  } catch (e) {
    // Restore the inventory if the request fails
    const storedInventory = JSON.parse(localStorage.getItem("inventory"));

    if (storedInventory) {
      data.inventory = storedInventory;
      updateItemList(data.inventory);
    }
  }
};

connect();

module.exports = loadInitialData();
