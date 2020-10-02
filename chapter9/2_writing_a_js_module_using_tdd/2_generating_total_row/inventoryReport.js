const generateItemRow = ({ name, quantity, price }) => {
  if (quantity === 0 || price === 0) return null;
  return `${name},${quantity},${price},${price * quantity}`;
};

const generateTotalRow = items => {
  const total = items.reduce(
    (t, { price, quantity }) => t + price * quantity,
    0
  );
  return `Total,,,${total}`;
};

module.exports = { generateItemRow, generateTotalRow };
