class Cart {
  constructor() {
    this.items = [];
  }

  addToCart(item) {
    this.items.push(item);
  }

  removeFromCart(item) {
    const { items } = this;
    for (let i = 0; i < items.length; i++) {
      const currentItem = items[i];
      if (currentItem === item) {
        items.splice(i, 1);
      }
    }
  }
}

module.exports = Cart;
