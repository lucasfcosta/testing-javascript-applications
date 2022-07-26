const nock = require("nock");
const { API_ADDR, addItem, data } = require("./inventoryController");

describe("addItem", async () => {
  test("adding new items to the inventory", () => {
    // Respond to all post requests
    // to POST /inventory/:itemName
    nock(API_ADDR)
      .post(/inventory\/.*$/)
      .reply(200);

    await addItem("cheesecake", 5);
    expect(data.inventory.cheesecake).toBe(5);
  });

  test("sending requests when adding new items", async () => {
    nock(API_ADDR)
      .post("/inventory/cheesecake", JSON.stringify({ quantity: 5 }))
      .reply(200);

    await addItem("cheesecake", 5);

    if (!nock.isDone())
      throw new Error("POST /inventory/cheesecake was not reached");
  });
});
