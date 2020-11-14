const { inventory, getInventory } = require("./inventoryController");

test("inventory contents", () => {
  inventory
    .set("cheesecake", 1)
    .set("macarroon", 3)
    .set("croissant", 3)
    .set("eclaire", 7);
  const result = getInventory();

  expect(result).toEqual({
    cheesecake: 1,
    macarroon: 3,
    croissant: 3,
    eclaire: 7,
    generatedAt: expect.any(Date)
  });
});
