const { inventory, addToInventory } = require("./inventoryController");

beforeEach(() => inventory.set("cheesecake", 0));

test("cancels operation for invalid quantities", () => {
  expect(() => addToInventory("cheesecake", "not a number")).not.toThrow();
  expect(inventory.get("cheesecake")).toBe(0);
  expect(Array.from(inventory.entries())).toHaveLength(1);
});
