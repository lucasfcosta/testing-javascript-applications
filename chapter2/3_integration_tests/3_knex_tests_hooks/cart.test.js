const { db, closeConnection } = require("./dbConnection");
const { createCart, addItem } = require("./cart");

beforeEach(async () => {
  await db("carts_items").truncate();
  await db("carts").truncate();
});

afterAll(async () => await closeConnection());

test("createCart creates a cart for a username", async () => {
  const [cartId] = await createCart("Lucas da Costa");
  const result = await db.select().from("carts");
  expect(result).toEqual([{ id: cartId, username: "Lucas da Costa" }]);
});

test("createCart creates a cart for a username", async () => {
  const [cartId] = await createCart("Lucas da Costa");
  await addItem(cartId, "cheesecake");
  const result = await db.select().from("carts_items");
  expect(result).toEqual([{ cartId, itemName: "cheesecake" }]);
});
