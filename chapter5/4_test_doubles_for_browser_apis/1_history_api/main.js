const {
  handleAddItem,
  checkFormValues,
  handleUndo,
  handlePopstate
} = require("./domController");

const form = document.getElementById("add-item-form");
form.addEventListener("submit", handleAddItem);
form.addEventListener("input", checkFormValues);

const undoButton = document.getElementById("undo-button");
undoButton.addEventListener("click", handleUndo);

window.addEventListener("popstate", handlePopstate);

// Run `checkFormValues` once to see if the initial state is valid
checkFormValues();
