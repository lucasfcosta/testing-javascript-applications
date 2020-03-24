const request = require("supertest");
const { app } = require("./server.js");
const { inventory } = require("./inventoryController.js");
const { carts } = require("./cartController.js");
const { users, hashPassword } = require("./authenticationController.js");

afterAll(() => app.close());

afterEach(() => inventory.clear());
afterEach(() => carts.clear());
afterEach(() => users.clear());

const user = "test_user";
const password = "a_password";
const validAuth = Buffer.from(`${user}:${password}`).toString("base64");
const authHeader = `Basic ${validAuth}`;
const createUser = () => {
  users.set(user, {
    email: "test_user@example.org",
    passwordHash: hashPassword(password)
  });
};

describe("add items to a cart", () => {
  beforeEach(createUser);

  test("adding available items", async () => {
    inventory.set("cheesecake", 3);
    const response = await request(app)
      .post("/carts/test_user/items")
      .set("authorization", authHeader)
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
      .set("authorization", authHeader)
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
  beforeEach(createUser);

  test("removing existing items", async () => {
    carts.set("test_user", ["cheesecake"]);
    const response = await request(app)
      .del("/carts/test_user/items/cheesecake")
      .set("authorization", authHeader)
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
      .set("authorization", authHeader)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      message: "cheesecake is not in the cart"
    });
    expect(inventory.get("cheesecake")).toEqual(0);
  });
});

describe("create accounts", () => {
  test("creating a new account", async () => {
    const response = await request(app)
      .put("/users/test_user")
      .send({ email: "test_user@example.org", password: "a_password" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      message: "test_user created successfully"
    });

    expect(users.get("test_user")).toEqual({
      email: "test_user@example.org",
      passwordHash: hashPassword("a_password")
    });
  });

  test("creating a duplicate account", async () => {
    users.set("test_user", {
      email: "test_user@example.org",
      passwordHash: hashPassword("a_password")
    });

    const response = await request(app)
      .put("/users/test_user")
      .send({ email: "test_user@example.org", password: "a_password" })
      .expect(409)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      message: "test_user already exists"
    });
  });
});
