const { inventory, addToInventory } = require("./inventoryController");

jest.mock("./logger");

beforeEach(() => inventory.clear());

describe("addToInventory", () => {
  test("passing valid arguments", () => {
    addToInventory("cheesecake", 2);
  });

  test("passing invalid arguments", () => {
    try {
      addToInventory("cheesecake", "should throw");
    } catch (e) {
      // ...
    }
  });
});
