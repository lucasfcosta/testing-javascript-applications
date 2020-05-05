const { handleAddItem, handleItemName } = require("./domController");

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);

const itemInput = document.querySelector(`input[name="name"]`);
itemInput.addEventListener("input", handleItemName);
