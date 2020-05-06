const { handleAddItem, checkFormValues } = require("./domController");

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);
form.addEventListener("input", checkFormValues);

// Run `checkFormValues` once to see if the initial state is valid
checkFormValues();
