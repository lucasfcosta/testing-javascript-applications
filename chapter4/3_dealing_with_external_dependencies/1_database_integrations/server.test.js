const { db, closeConnection } = require("./dbConnection");
const request = require("supertest");
const { app } = require("./server.js");
const { hashPassword } = require("./authenticationController.js");

afterAll(() => app.close());

beforeEach(() => db("users").truncate());
beforeEach(() => db("carts_items").truncate());
beforeEach(() => db("inventory").truncate());

const username = "test_user";
const password = "a_password";
const validAuth = Buffer.from(`${username}:${password}`).toString("base64");
const authHeader = `Basic ${validAuth}`;
const createUser = async () => {
  return await db("users").insert({
    username,
    email: "test_user@example.org",
    passwordHash: hashPassword(password)
  });
};

describe("add items to a cart", () => {
  beforeEach(createUser);

  test("adding available items", async () => {
    await db("inventory").insert({ itemName: "cheesecake", quantity: 3 });
    const response = await request(app)
      .post("/carts/test_user/items")
      .set("authorization", authHeader)
      .send({ item: "cheesecake", quantity: 3 })
      .expect(200)
      .expect("Content-Type", /json/);

    const newItems = [{ itemName: "cheesecake", quantity: 3 }];
    expect(response.body).toEqual(newItems);

    const { quantity: inventoryCheesecakes } = await db
      .select()
      .from("inventory")
      .where({ itemName: "cheesecake" })
      .first();
    expect(inventoryCheesecakes).toEqual(0);

    const finalCartContent = await db
      .select("carts_items.itemName", "carts_items.quantity")
      .from("carts_items")
      .join("users", "users.id", "carts_items.userId")
      .where("users.username", "test_user");

    expect(finalCartContent).toEqual(newItems);
  });

  test("adding unavailable items", async () => {
    const response = await request(app)
      .post("/carts/test_user/items")
      .set("authorization", authHeader)
      .send({ item: "cheesecake", quantity: 1 })
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      message: "cheesecake is unavailable"
    });

    const finalCartContent = await db
      .select("carts_items.itemName", "carts_items.quantity")
      .from("carts_items")
      .join("users", "users.id", "carts_items.userId")
      .where("users.username", "test_user");
    expect(finalCartContent).toEqual([]);
  });
});

describe("removing items from a cart", () => {
  let userId;
  beforeEach(async () => {
    userId = (await createUser())[0];
  });

  test("removing existing items", async () => {
    await db("carts_items").insert({
      userId,
      itemName: "cheesecake",
      quantity: 1
    });

    const response = await request(app)
      .del("/carts/test_user/items/cheesecake")
      .set("authorization", authHeader)
      .expect(200)
      .expect("Content-Type", /json/);

    const expectedFinalContent = [{ itemName: "cheesecake", quantity: 0 }];

    expect(response.body).toEqual(expectedFinalContent);

    const finalCartContent = await db
      .select("carts_items.itemName", "carts_items.quantity")
      .from("carts_items")
      .join("users", "users.id", "carts_items.userId")
      .where("users.username", "test_user");
    expect(finalCartContent).toEqual(expectedFinalContent);

    const { quantity: inventoryCheesecakes } = await db
      .select()
      .from("inventory")
      .where({ itemName: "cheesecake" })
      .first();
    expect(inventoryCheesecakes).toEqual(1);
  });

  test("removing non-existing items", async () => {
    await db("inventory").insert({
      itemName: "cheesecake",
      quantity: 0
    });

    const response = await request(app)
      .del("/carts/test_user/items/cheesecake")
      .set("authorization", authHeader)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      message: "cheesecake is not in the cart"
    });

    const { quantity: inventoryCheesecakes } = await db
      .select()
      .from("inventory")
      .where({ itemName: "cheesecake" })
      .first();
    expect(inventoryCheesecakes).toEqual(0);
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

    const savedUser = await db
      .select("email", "passwordHash")
      .from("users")
      .where({ username: "test_user" })
      .first();

    expect(savedUser).toEqual({
      email: "test_user@example.org",
      passwordHash: hashPassword("a_password")
    });
  });

  test("creating a duplicate account", async () => {
    await createUser();

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
