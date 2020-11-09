const { getInventory } = require("./inventoryController");

test("generatedAt in the past", () => {
  const result = getInventory();
  const currentTime = Date.now() + 1;
  const isPastTimestamp = result.generatedAt.getTime() <= currentTime;
  expect(isPastTimestamp).toBe(true);
});
