class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(item) {
    this.items.push(item);
  }
}

module.exports = Cart;
