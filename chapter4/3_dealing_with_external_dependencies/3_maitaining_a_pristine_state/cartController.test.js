const { db } = require("./dbConnection");
const { addItemToCart } = require("./cartController");
const { hashPassword } = require("./authenticationController");
const { user: globalUser } = require("./userTestUtils");

const fs = require("fs");

describe("addItemToCart", () => {
  beforeEach(() => {
    fs.writeFileSync("./tmp/logs.out", "utf-8");
  });

  test("adding unavailable items to cart", async () => {
    await db("inventory").insert({ itemName: "cheesecake", quantity: 0 });

    try {
      await addItemToCart(globalUser.username, "cheesecake");
    } catch (e) {
      const expectedError = new Error("cheesecake is unavailable");
      expectedError.code = 400;

      expect(e).toEqual(expectedError);
    }

    const finalCartContent = await db
      .select("carts_items.*")
      .from("carts_items")
      .join("users", "users.id", "carts_items.userId")
      .where("users.username", globalUser.username);

    expect(finalCartContent).toEqual([]);
    expect.assertions(2);
  });

  test("adding items above limit to cart", async () => {
    await db("inventory").insert({ itemName: "cheesecake", quantity: 1 });
    await db("carts_items").insert({
      userId: globalUser.id,
      itemName: "cheesecake",
      quantity: 3
    });

    try {
      await addItemToCart(globalUser.username, "cheesecake");
    } catch (e) {
      const expectedError = new Error(
        "You can't have more than three units of an item in your cart"
      );
      expectedError.code = 400;
      expect(e).toEqual(expectedError);
    }

    const finalCartContent = await db
      .select("carts_items.itemName", "carts_items.quantity")
      .from("carts_items")
      .join("users", "users.id", "carts_items.userId")
      .where("users.username", globalUser.username);

    expect(finalCartContent).toEqual([{ itemName: "cheesecake", quantity: 3 }]);
    expect.assertions(2);
  });

  test("logging added items", async () => {
    await db("inventory").insert({ itemName: "cheesecake", quantity: 1 });
    await db("carts_items").insert({
      userId: globalUser.id,
      itemName: "cheesecake",
      quantity: 1
    });

    await addItemToCart(globalUser.username, "cheesecake");

    const logs = fs.readFileSync("./tmp/logs.out", "utf-8");
    expect(logs).toContain(
      `cheesecake added to ${globalUser.username}'s cart\n`
    );
  });
});
