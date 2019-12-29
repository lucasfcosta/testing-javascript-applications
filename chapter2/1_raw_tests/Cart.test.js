const Cart = require("./Cart.js");

const cart = new Cart();
cart.addToCart("cheesecake");

const hasOneItem = cart.items.length === 1;
const hasACheesecake = cart.items[0] === "cheesecake";

if (hasOneItem && hasACheesecake) {
  console.log("The addToCart function can add an item to the cart");
} else {
  const actualContent = cart.items.join(", ");

  console.error("The addToCart function didn't do what we expect!");
  console.error(`Here is the actual content of the cart: ${actualContent}`);

  throw new Error("Test failed!");
}
