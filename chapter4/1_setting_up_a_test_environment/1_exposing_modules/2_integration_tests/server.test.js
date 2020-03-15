const { app } = require("./server.js");
const { inventory } = require("./inventoryController.js");
const { carts } = require("./cartController.js");

const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

afterAll(() => app.close());

afterEach(() => inventory.clear());
afterEach(() => carts.clear());

describe("add items to a cart", () => {
  test("adding available items", async () => {
    inventory.set("cheesecake", 1);
    const response = await fetch(
      `${apiRoot}/carts/test_user/items/cheesecake`,
      { method: "POST" }
    );

    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual(["cheesecake"]);
    expect(inventory.get("cheesecake")).toEqual(0);
    expect(carts.get("test_user")).toEqual(["cheesecake"]);
  });

  test("adding unavailable items", async () => {
    carts.set("test_user", []);
    const response = await fetch(
      `${apiRoot}/carts/test_user/items/cheesecake`,
      { method: "POST" }
    );

    expect(response.status).toEqual(400);
    expect(await response.json()).toEqual({
      message: "cheesecake is unavailable"
    });
    expect(carts.get("test_user")).toEqual([]);
  });
});

describe("removing items from a cart", () => {
  test("removing existing items", async () => {
    carts.set("test_user", ["cheesecake"]);
    const response = await fetch(
      `${apiRoot}/carts/test_user/items/cheesecake`,
      { method: "DELETE" }
    );

    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual([]);
    expect(carts.get("test_user")).toEqual([]);
    expect(inventory.get("cheesecake")).toEqual(1);
  });

  test("removing non-existing items", async () => {
    inventory.set("cheesecake", 0);
    carts.set("test_user", []);
    const response = await fetch(
      `${apiRoot}/carts/test_user/items/cheesecake`,
      { method: "DELETE" }
    );

    expect(response.status).toEqual(400);
    expect(await response.json()).toEqual({
      message: "cheesecake is not in the cart"
    });
    expect(inventory.get("cheesecake")).toEqual(0);
  });
});
