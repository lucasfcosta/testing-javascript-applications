const serverAddr = "http://localhost:3000";

const getItems = async () => {
  const response = await fetch(`${serverAddr}/inventory`);
  return await response.json();
};

const addItem = async itemName => {
  const response = await fetch(`${serverAddr}/inventory/${itemName}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: 1 })
  });

  return await response.json();
};

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", async e => {
  // Prevent the page from reloading as it would by default
  e.preventDefault();

  const itemName = document.getElementById("item-name").value;
  await addItem(itemName);
  updateItemList();
});

const updateItemList = async () => {
  const items = await getItems("test");

  const inventoryList = window.document.getElementById("item-list");

  // Clears the list
  inventoryList.innerHTML = "";

  items.forEach(item => {
    const listItem = window.document.createElement("li");
    listItem.innerText = `${item.itemName} - Quantity: ${item.quantity}`;
    inventoryList.appendChild(listItem);
  });
};

// This runs when the page loads
updateItemList();
