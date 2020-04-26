const serverAddr = "http://localhost:3000";

const getItems = async () => {
  const response = await fetch(`${serverAddr}/inventory`);
  return await response.json();
};

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
