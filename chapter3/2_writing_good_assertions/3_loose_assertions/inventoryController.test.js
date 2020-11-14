const { inventory, addToInventory } = require("./inventoryController");

beforeEach(() => {
  inventory.forEach((value, key) => inventory.delete(key));
});

test("returned value", () => {
  const result = addToInventory("cheesecake", 2);
  expect(typeof result).toBe("number");
});
