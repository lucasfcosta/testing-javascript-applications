class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(item) {
    if (item) {
      this.items.push(item);
    }
  }
}

module.exports = Cart;
