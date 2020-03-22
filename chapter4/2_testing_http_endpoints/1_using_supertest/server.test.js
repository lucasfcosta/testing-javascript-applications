const request = require("supertest");
const { app } = require("./server.js");
const { inventory } = require("./inventoryController.js");
const { carts } = require("./cartController.js");

afterAll(() => app.close());

afterEach(() => inventory.clear());
afterEach(() => carts.clear());

describe("add items to a cart", () => {
  test("adding available items", async () => {
    inventory.set("cheesecake", 3);
    const response = await request(app)
      .post("/carts/test_user/items")
      .send({ item: "cheesecake", quantity: 3 })
      .expect(200)
      .expect("Content-Type", /json/);

    const newItems = ["cheesecake", "cheesecake", "cheesecake"];
    expect(response.body).toEqual(newItems);
    expect(inventory.get("cheesecake")).toEqual(0);
    expect(carts.get("test_user")).toEqual(newItems);
  });

  test("adding unavailable items", async () => {
    carts.set("test_user", []);
    const response = await request(app)
      .post("/carts/test_user/items")
      .send({ item: "cheesecake", quantity: 1 })
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      message: "cheesecake is unavailable"
    });
    expect(carts.get("test_user")).toEqual([]);
  });
});

describe("removing items from a cart", () => {
  test("removing existing items", async () => {
    carts.set("test_user", ["cheesecake"]);
    const response = await request(app)
      .del("/carts/test_user/items/cheesecake")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual([]);
    expect(carts.get("test_user")).toEqual([]);
    expect(inventory.get("cheesecake")).toEqual(1);
  });

  test("removing non-existing items", async () => {
    inventory.set("cheesecake", 0);
    carts.set("test_user", []);
    const response = await request(app)
      .del("/carts/test_user/items/cheesecake")
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      message: "cheesecake is not in the cart"
    });
    expect(inventory.get("cheesecake")).toEqual(0);
  });
});
