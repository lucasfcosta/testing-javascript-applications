const calculateCartPrice = (prices, discountPercentage) => {
  const total = prices.reduce((sum, price) => {
    return sum + price;
  }, 0);

  return discountPercentage
    ? ((100 - discountPercentage) / 100) * total
    : total;
};

module.exports = { calculateCartPrice };
