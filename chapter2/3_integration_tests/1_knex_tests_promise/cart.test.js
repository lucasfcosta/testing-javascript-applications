const { db, closeConnection } = require("./dbConnection");
const { createCart } = require("./cart");

test("createCart creates a cart for a username", async () => {
  await db("carts").truncate();
  const [cartId] = await createCart("Lucas da Costa");
  const result = await db.select().from("carts");
  expect(result).toEqual([{ id: cartId, username: "Lucas da Costa" }]);
  await closeConnection();
});
