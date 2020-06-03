const app = require("./server");
const fetch = require("isomorphic-fetch");
const { inventory, getInventory } = require("./inventoryController");

const apiRoot = "http://localhost:3000";

const sendGetInventoryRequest = () => {
  return fetch(`${apiRoot}/inventory`, { method: "GET" });
};

test("fetching inventory", async () => {
  inventory.set("cheesecake", 1).set("macarroon", 2);
  const getInventoryResponse = await sendGetInventoryRequest("lucas");
  const expected = { ...getInventory(), generatedAt: expect.anything() };

  expect(await getInventoryResponse.json()).toEqual(expected);
});

afterAll(() => app.close());
