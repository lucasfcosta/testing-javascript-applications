const fs = require("fs");
document.body.innerHTML = fs.readFileSync("./index.html");

const { updateItemList } = require("./domController");

describe("updateItemList", () => {
  test("updates the DOM with the inventory items", () => {
    const inventory = {
      cheesecake: 5,
      "apple pie": 2,
      "carrot cake": 6
    };
    updateItemList(inventory);

    const itemList = document.getElementById("item-list");
    expect(itemList.childNodes).toHaveLength(3);

    // The `childNodes` property has a `length`, but it's _not_ an Array
    const nodesText = Array.from(itemList.childNodes).map(
      node => node.innerHTML
    );
    expect(nodesText).toContain("cheesecake - Quantity: 5");
    expect(nodesText).toContain("apple pie - Quantity: 2");
    expect(nodesText).toContain("carrot cake - Quantity: 6");
  });
});
