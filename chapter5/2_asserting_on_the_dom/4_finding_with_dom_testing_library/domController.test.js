const fs = require("fs");
const initialHtml = fs.readFileSync("./index.html");
const { getByText, screen } = require("@testing-library/dom");

const { updateItemList } = require("./domController");

describe("updateItemList", () => {
  beforeEach(() => {
    document.body.innerHTML = initialHtml;
  });

  test("updates the DOM with the inventory items", () => {
    const inventory = {
      cheesecake: 5,
      "apple pie": 2,
      "carrot cake": 6
    };
    updateItemList(inventory);

    const itemList = document.getElementById("item-list");
    expect(itemList.childNodes).toHaveLength(3);

    expect(getByText(itemList, "cheesecake - Quantity: 5")).toBeTruthy();
    expect(getByText(itemList, "apple pie - Quantity: 2")).toBeTruthy();
    expect(getByText(itemList, "carrot cake - Quantity: 6")).toBeTruthy();
  });

  test("adding a paragraph indicating what was the update", () => {
    const inventory = { cheesecake: 5, "apple pie": 2 };
    updateItemList(inventory);

    expect(
      screen.getByText(
        `The inventory has been updated - ${JSON.stringify(inventory)}`
      )
    ).toBeTruthy();
  });
});
