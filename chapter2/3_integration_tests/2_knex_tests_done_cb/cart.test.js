const { db, closeConnection } = require("./dbConnection");
const { createCart } = require("./cart");

test("createCart creates a cart for a username", done => {
  db("carts")
    .truncate()
    .then(() => createCart("Lucas da Costa"))
    .then(([cartId]) => {
      return Promise.all([db.select().from("carts"), cartId]);
    })
    .then(([result, cartId]) => {
      expect(result).toEqual([{ id: cartId, username: "Lucas da Costa" }]);
    })
    .then(closeConnection)
    .then(done);
});
