const { generateItemRow, generateTotalRow } = require("./inventoryReport");

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
