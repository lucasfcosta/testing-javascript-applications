const { inventory } = require("./inventoryController");
const {
  carts,
  addItemToCart,
  compliesToItemLimit
} = require("./cartController");
const fs = require("fs");

afterEach(() => inventory.clear());
afterEach(() => carts.clear());

describe("addItemToCart", () => {
  beforeEach(() => {
    fs.writeFileSync("/tmp/logs.out", "");
  });

  test("adding unavailable items to cart", () => {
    carts.set("test_user", []);
    inventory.set("cheesecake", 0);

    try {
      addItemToCart("test_user", "cheesecake");
    } catch (e) {
      const expectedError = new Error("cheesecake is unavailable");
      expectedError.code = 400;

      expect(e).toEqual(expectedError);
    }

    expect(carts.get("test_user")).toEqual([]);
    expect.assertions(2);
  });

  test("adding items above limit to cart", () => {
    const initialCartContent = ["cheesecake", "cheesecake", "cheesecake"];
    carts.set("test_user", initialCartContent);
    inventory.set("cheesecake", 1);

    try {
      addItemToCart("test_user", "cheesecake");
    } catch (e) {
      const expectedError = new Error(
        "You can't have more than three units of an item in your cart"
      );
      expectedError.code = 400;
      expect(e).toEqual(expectedError);
    }

    expect(carts.get("test_user")).toEqual(initialCartContent);
    expect(inventory.get('cheesecake')).toEqual(1);
    expect.assertions(3);
  });

  test("logging added items", () => {
    carts.set("test_user", []);
    inventory.set("cheesecake", 1);

    addItemToCart("test_user", "cheesecake");

    const logs = fs.readFileSync("/tmp/logs.out", "utf-8");
    expect(logs).toContain("cheesecake added to test_user's cart\n");
  });
});

describe("compliesToItemLimit", () => {
  test("returns true for cards with no more than 3 items of a kind", () => {
    const cart = ["cheesecake", "cheesecake", "almond brownie", "apple pie"];
    expect(compliesToItemLimit(cart)).toBe(true);
  });

  test("returns true for cards with no more than 3 items of a kind", () => {
    const cart = [
      "cheesecake",
      "cheesecake",
      "almond brownie",
      "cheesecake",
      "cheesecake"
    ];
    expect(compliesToItemLimit(cart)).toBe(false);
  });
});
