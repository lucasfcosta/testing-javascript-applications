const { db, closeConnection } = require("./dbConnection");
const { createCart } = require("./cart");

test("createCart creates a cart for a username", done => {
  db("carts")
    .truncate()
    .then(() => createCart("Lucas da Costa"))
    .then(() => db.select("username").from("carts"))
    .then(result => {
      expect(result).toEqual([{ username: "Lucas da Costa" }]);
    })
    .then(closeConnection)
    .then(done);
});
