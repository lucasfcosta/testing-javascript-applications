const generateItemRow = ({ name, quantity, price }) => {
  if (quantity === 0 || price === 0) return null;
  return `${name},${quantity},${price},${price * quantity}`;
};

module.exports = { generateItemRow };
