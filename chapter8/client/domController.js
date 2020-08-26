const { API_ADDR, addItem, data } = require("./inventoryController");

const updateItemList = inventory => {
  if (inventory === null) return;

  localStorage.setItem("inventory", JSON.stringify(inventory));

  const inventoryList = window.document.getElementById("item-list");

  // Clears the list
  inventoryList.innerHTML = "";

  Object.entries(inventory).forEach(async ([itemName, quantity]) => {
    const listItem = window.document.createElement("li");
    const listLink = window.document.createElement("a");
    listItem.appendChild(listLink);

    const recipeResponse = await fetch(`${API_ADDR}/inventory/${itemName}`);
    const recipeList = (await recipeResponse.json()).recipes;
    const randomRecipe = Math.floor(Math.random() * recipeList.length - 1) + 1;
    listLink.innerHTML = `${itemName} - Quantity: ${quantity}`;
    listLink.href = recipeList[randomRecipe].href;

    if (quantity < 5) {
      listItem.className = "almost-soldout";
    }

    inventoryList.appendChild(listItem);
  });

  const inventoryContents = JSON.stringify(inventory);
  const p = window.document.createElement("p");
  p.innerHTML = `[${new Date().toISOString()}] The inventory has been updated - ${inventoryContents}`;

  window.document.body.appendChild(p);
};

const handleAddItem = event => {
  // Prevent the page from reloading as it would by default
  event.preventDefault();

  const { name, quantity } = event.target.elements;
  addItem(name.value, parseInt(quantity.value, 10));

  history.pushState({ inventory: { ...data.inventory } }, document.title);

  updateItemList(data.inventory);
};

window.handleAddItem = (name, quantity) => {
  const e = {
    preventDefault: () => {},
    target: {
      elements: {
        name: { value: name },
        quantity: { value: quantity }
      }
    }
  };

  return handleAddItem(e);
};

const validItems = ["cheesecake", "apple pie", "carrot cake"];
const checkFormValues = () => {
  const itemName = document.querySelector(`input[name="name"]`).value;
  const quantity = document.querySelector(`input[name="quantity"]`).value;

  const itemNameIsEmpty = itemName === "";
  const itemNameIsInvalid = !validItems.includes(itemName);
  const quantityIsEmpty = quantity === "";

  const errorMsg = window.document.getElementById("error-msg");
  if (itemNameIsEmpty) {
    errorMsg.innerHTML = "";
  } else if (itemNameIsInvalid) {
    errorMsg.innerHTML = `${itemName} is not a valid item.`;
  } else {
    errorMsg.innerHTML = `${itemName} is valid!`;
  }

  const submitButton = document.querySelector(`button[type="submit"]`);
  if (itemNameIsEmpty || itemNameIsInvalid || quantityIsEmpty) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

const handleUndo = () => {
  if (history.state === null) return;
  history.back();
};

const handlePopstate = () => {
  data.inventory = history.state ? history.state.inventory : {};
  updateItemList(data.inventory);
};

module.exports = {
  updateItemList,
  handleAddItem,
  checkFormValues,
  handleUndo,
  handlePopstate
};
