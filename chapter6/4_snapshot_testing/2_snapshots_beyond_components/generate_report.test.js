const fs = require("fs");
const { generateReport } = require("./generate_report");

test("generating a .txt report", () => {
  const inventory = [
    { item: "cheesecake", quantity: 8, price: 22 },
    { item: "carrot cake", quantity: 3, price: 18 },
    { item: "macaroon", quantity: 40, price: 6 },
    { item: "chocolate cake", quantity: 12, price: 17 }
  ];

  generateReport(inventory);
  const report = fs.readFileSync("/tmp/report.txt", "utf-8");
  expect(report).toMatchSnapshot();
});
