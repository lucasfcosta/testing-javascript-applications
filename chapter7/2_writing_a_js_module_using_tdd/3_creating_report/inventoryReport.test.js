const fs = require("fs");
const {
  generateItemRow,
  generateTotalRow,
  createInventoryValuesReport
} = require("./inventoryReport");

describe("generateItemRow", () => {
  test("generating an item's row", () => {
    expect(generateItemRow({ name: "macaroon", quantity: 12, price: 3 })).toBe(
      "macaroon,12,3,36"
    );
    expect(
      generateItemRow({ name: "cheesecake", quantity: 6, price: 12 })
    ).toBe("cheesecake,6,12,72");
    expect(generateItemRow({ name: "apple pie", quantity: 5, price: 15 })).toBe(
      "apple pie,5,15,75"
    );
  });

  test("ommitting soldout items", () => {
    expect(generateItemRow({ name: "macaroon", quantity: 0, price: 3 })).toBe(
      null
    );
    expect(
      generateItemRow({ name: "cheesecake", quantity: 0, price: 12 })
    ).toBe(null);
  });

  test("ommitting free items", () => {
    expect(
      generateItemRow({ name: "plastic cups", quantity: 99, price: 0 })
    ).toBe(null);
    expect(generateItemRow({ name: "napkins", quantity: 200, price: 0 })).toBe(
      null
    );
  });
});

describe("generateTotalRow", () => {
  test("generating a total row", () => {
    const items = [
      { name: "apple pie", quantity: 3, price: 15 },
      { name: "plastic cups", quantity: 0, price: 55 },
      { name: "macaroon", quantity: 12, price: 3 },
      { name: "cheesecake", quantity: 0, price: 12 }
    ];

    expect(generateTotalRow(items)).toBe("Total,,,81");
    expect(generateTotalRow(items.slice(1))).toBe("Total,,,36");
    expect(generateTotalRow(items.slice(3))).toBe("Total,,,0");
  });
});

describe("createInventoryValuesReport", () => {
  test("creating reports", () => {
    const items = [
      { name: "apple pie", quantity: 3, price: 15 },
      { name: "cheesecake", quantity: 2, price: 12 },
      { name: "macaroon", quantity: 20, price: 3 }
    ];

    createInventoryValuesReport(items);
    expect(fs.readFileSync("/tmp/inventoryValues.csv", "utf8")).toBe(
      "apple pie,3,15,45\ncheesecake,2,12,24\nmacaroon,20,3,60\nTotal,,,129"
    );

    createInventoryValuesReport(items.slice(1));
    expect(fs.readFileSync("/tmp/inventoryValues.csv", "utf8")).toBe(
      "cheesecake,2,12,24\nmacaroon,20,3,60\nTotal,,,84"
    );

    createInventoryValuesReport(items.slice(2));
    expect(fs.readFileSync("/tmp/inventoryValues.csv", "utf8")).toBe(
      "macaroon,20,3,60\nTotal,,,60"
    );
  });
});
