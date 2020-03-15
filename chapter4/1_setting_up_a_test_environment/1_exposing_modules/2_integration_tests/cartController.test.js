const { inventory } = require("./inventoryController");
const { carts, addItemToCart } = require("./cartController");
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
      const expectedError = new Error(`cheesecake is unavailable`);
      expectedError.code = 400;

      expect(e).toEqual(expectedError);
    }

    expect(carts.get("test_user")).toEqual([]);
    expect.assertions(2);
  });

  test("logging added items", () => {
    carts.set("test_user", []);
    inventory.set("cheesecake", 1);

    addItemToCart("test_user", "cheesecake");

    const logs = fs.readFileSync("/tmp/logs.out", "utf-8");
    expect(logs).toContain("cheesecake added to test_user's cart\n");
  });
});
