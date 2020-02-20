const { app, inventory, carts } = require("./server");
const fetch = require("isomorphic-fetch");

const apiRoot = "http://localhost:3000";

const addItem = (username, item) => {
  return fetch(`${apiRoot}/carts/${username}/items/${item}`, {
    method: "POST"
  });
};

describe("addItem", () => {
  const targetUser = "lucas";
  beforeEach(() => carts.delete(targetUser));
  beforeEach(() => inventory.set("cheesecake", 1));

  test("correct response", async () => {
    const addItemResponse = await addItem("lucas", "cheesecake");
    expect(await addItemResponse.json()).toEqual(["cheesecake"]);
  });

  test("inventory update", async () => {
    await addItem("lucas", "cheesecake");
    expect(inventory.get("cheesecake")).toBe(0);
  });

  test("cart update", async () => {
    await addItem("lucas", "cheesecake");
    expect(carts.get("lucas")).toEqual(["cheesecake"]);
  });

  test("soldout items", async () => {
    inventory.set("cheesecake", 0);
    const failedAddItem = await addItem("lucas", "cheesecake");
    expect(failedAddItem.status).toBe(404);
  });
});

afterAll(() => app.close());
