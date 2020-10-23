const { db } = require("./dbConnection");
const { addItemToCart, monitorStaleItems } = require("./cartController");
const { hashPassword } = require("./authenticationController");
const { user: globalUser } = require("./userTestUtils");
const FakeTimers = require("@sinonjs/fake-timers");

const fs = require("fs");

describe("addItemToCart", () => {
  beforeEach(() => {
    fs.writeFileSync("tmplogs.out", "");
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

    const logs = fs.readFileSync("tmplogs.out", "utf-8");
    expect(logs).toContain(
      `cheesecake added to ${globalUser.username}'s cart\n`
    );
  });
});

const withRetries = async fn => {
  // Capture the assertion error since Jest does not export it
  const JestAssertionError = (() => {
    try {
      expect(false).toBe(true);
    } catch (e) {
      return e.constructor;
    }
  })();

  try {
    await fn();
  } catch (e) {
    if (e.constructor === JestAssertionError) {
      // Wait 100ms before retrying
      await new Promise(resolve => setTimeout(resolve, 100));
      await withRetries(fn);
    } else {
      throw e;
    }
  }
};

describe("timers", () => {
  const hoursInMs = n => 1000 * 60 * 60 * n;

  let clock;
  beforeEach(() => {
    clock = FakeTimers.install({ toFake: ["Date", "setInterval"] });
  });

  afterEach(() => {
    clock = clock.uninstall();
  });

  test("removing stale items", async () => {
    await db("inventory").insert({ itemName: "cheesecake", quantity: 1 });
    await addItemToCart(globalUser.username, "cheesecake");

    clock.tick(hoursInMs(4));
    timer = monitorStaleItems();
    clock.tick(hoursInMs(2));

    await withRetries(async () => {
      const finalCartContent = await db
        .select()
        .from("carts_items")
        .join("users", "users.id", "carts_items.userId")
        .where("users.username", globalUser.username);

      expect(finalCartContent).toEqual([]);
    });

    await withRetries(async () => {
      const inventoryContent = await db
        .select("itemName", "quantity")
        .from("inventory");

      expect(inventoryContent).toEqual([
        { itemName: "cheesecake", quantity: 1 }
      ]);
    });
  });
});
