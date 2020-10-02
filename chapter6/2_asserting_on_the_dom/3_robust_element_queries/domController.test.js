const fs = require("fs");
const initialHtml = fs.readFileSync("./index.html");

const { updateItemList } = require("./domController");

beforeEach(() => {
  document.body.innerHTML = initialHtml;
});

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

  test("adding a paragraph indicating what was the update", () => {
    const inventory = { cheesecake: 5, "apple pie": 2 };
    updateItemList(inventory);
    const paragraphs = Array.from(document.querySelectorAll("p"));
    const updateParagraphs = paragraphs.filter(p => {
      return p.innerHTML.includes("The inventory has been updated");
    });

    expect(updateParagraphs).toHaveLength(1);
    expect(updateParagraphs[0].innerHTML).toBe(
      `The inventory has been updated - ${JSON.stringify(inventory)}`
    );
  });
});
