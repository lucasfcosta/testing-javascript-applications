const { addItem, data } = require("./inventoryController");

describe("addItem", () => {
  test("adding new items to the inventory", () => {
    data.inventory.items = [];
    addItem("cheesecake", 5);
    expect(data.inventory.cheesecake).toBe(5);
  });
});
