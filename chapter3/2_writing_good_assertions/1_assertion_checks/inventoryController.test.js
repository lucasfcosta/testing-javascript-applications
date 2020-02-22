const { inventory, addToInventory } = require("./inventoryController");

beforeEach(() => inventory.set("cheesecake", 0));

test("cancels operation for invalid quantities", () => {
  expect.hasAssertions();

  try {
    addToInventory("cheesecake", "not a number");
  } catch (e) {
    expect(inventory.get("cheesecake")).toBe(0);
  }
});
