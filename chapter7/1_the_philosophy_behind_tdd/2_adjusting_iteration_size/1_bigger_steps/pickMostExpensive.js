const { calculateCartPrice } = require("./calculateCartPrice");

const pickMostExpensive = carts => {
  let mostExpensivePrice = 0;
  let mostExpensiveCart = null;

  for (let i = 0; i < carts.length; i++) {
    const currentCart = carts[i];
    const currentCartPrice = calculateCartPrice(currentCart);
    if (currentCartPrice >= mostExpensivePrice) {
      mostExpensivePrice = currentCartPrice;
      mostExpensiveCart = currentCart;
    }
  }

  return mostExpensiveCart;
};

module.exports = { pickMostExpensive };
