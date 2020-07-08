const calculateCartPrice = prices => {
  return prices.reduce((sum, price) => {
    return sum + price;
  }, 0);
};

module.exports = { calculateCartPrice };
