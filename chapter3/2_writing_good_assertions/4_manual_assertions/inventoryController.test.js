const { getInventory } = require("./inventoryController");

// This test _will_ fail.
// Here I'm trying to demonstrate Jest's output
// when an assertion like `.toBe(true)` fails.
test("generatedAt in the past", () => {
  const result = getInventory();
  const currentTime = Date.now() + 1;
  const isPastTimestamp = result.generatedAt.getTime() <= currentTime;
  expect(isPastTimestamp).toBe(true);
});
