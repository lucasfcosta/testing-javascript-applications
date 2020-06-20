const fs = require("fs");

const inventory = [
  { item: "cheesecake", quantity: 8, price: 22 },
  { item: "carrot cake", quantity: 3, price: 18 },
  { item: "macaroon", quantity: 40, price: 6 },
  { item: "chocolate cake", quantity: 12, price: 17 }
];

module.exports.generateReport = items => {
  const lines = items.map(({ item, quantity, price }) => {
    return `${item} - Quantity: ${quantity} - Value: ${price * quantity}`;
  });
  const totalValue = items.reduce((sum, { price }) => {
    return sum + price;
  }, 0);

  const content = lines.concat(`Total value: ${totalValue}`).join("\n");
  fs.writeFileSync("/tmp/report.txt", content);
};

module.exports.generateReport(inventory);
