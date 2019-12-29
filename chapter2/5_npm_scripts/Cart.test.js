const Cart = require("./Cart.js");

test("The addToCart function can add an item to the cart", () => {
  const cart = new Cart();
  cart.addToCart("cheesecake");

  expect(cart.items).toEqual(["cheesecake"]);
});

test("The addToCart function can add an item to the cart", () => {
  const cart = new Cart();
  cart.addToCart("cheesecake");
  cart.removeFromCart("cheesecake");

  expect(cart.items).toEqual([]);
});
