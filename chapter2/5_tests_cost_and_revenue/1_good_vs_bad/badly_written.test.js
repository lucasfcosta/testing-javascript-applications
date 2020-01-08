const { app, resetState } = require("./server");
const fetch = require("isomorphic-fetch");

test("adding items to a cart", done => {
  resetState();
  return fetch(`http://localhost:3000/carts/lucas/items`, {
    method: "GET"
  })
    .then(initialItemsResponse => {
      expect(initialItemsResponse.status).toEqual(404);
      return fetch(`http://localhost:3000/carts/lucas/items/cheesecake`, {
        method: "POST"
      }).then(response => response.json());
    })
    .then(addItemResponse => {
      expect(addItemResponse).toEqual(["cheesecake"]);
      return fetch(`http://localhost:3000/carts/lucas/items`, {
        method: "GET"
      }).then(response => response.json());
    })
    .then(finalItemsResponse => {
      expect(finalItemsResponse).toEqual(["cheesecake"]);
    })
    .then(() => {
      app.close();
      done();
    });
});
