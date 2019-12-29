class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(item) {
    this.items.push(item);
  }

  removeFromCart(item) {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      if (currentItem === item) {
        this.items.splice(i, 1);
      }
    }
  }
}

module.exports = Cart;
