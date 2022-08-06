const { db, closeConnection } = require("./dbConnection");
const { createCart } = require("./cart");

test("createCart creates a cart for a username", async () => {
  await db("carts").truncate();
  await createCart("Lucas da Costa");
  const result = await db.select("username").from("carts");
  await closeConnection();
  expect(result).toEqual([{ username: "Lucas da Costa" }]);
});
