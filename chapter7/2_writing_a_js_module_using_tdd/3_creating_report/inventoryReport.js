const fs = require("fs");

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

const createInventoryValuesReport = items => {
  const itemRows = items.map(generateItemRow).join("\n");
  const totalRow = generateTotalRow(items);
  const reportContents = itemRows + "\n" + totalRow;
  fs.writeFileSync("/tmp/inventoryValues.csv", reportContents);
};

module.exports = {
  generateItemRow,
  generateTotalRow,
  createInventoryValuesReport
};
