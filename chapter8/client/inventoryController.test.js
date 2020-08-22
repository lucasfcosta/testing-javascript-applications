const nock = require("nock");
const { API_ADDR, addItem, data } = require("./inventoryController");
const { start, stop } = require("./testSocketServer");
const { client, connect } = require("./socket");

afterEach(() => {
  if (!nock.isDone()) {
    nock.cleanAll();
    throw new Error("Not all mocked endpoints received requests.");
  }
});

describe("addItem", () => {
  beforeEach(() => (data.inventory = {}));

  test("adding new items to the inventory", () => {
    // Respond to all post requests
    // to POST /inventory/:itemName
    nock(API_ADDR)
      .post(/inventory\/.*$/)
      .reply(200);

    addItem("cheesecake", 5);
    expect(data.inventory.cheesecake).toBe(5);
  });

  test("sending requests when adding new items", () => {
    nock(API_ADDR)
      .post("/inventory/cheesecake", JSON.stringify({ quantity: 5 }))
      .reply(200);

    addItem("cheesecake", 5);
  });

  test("updating the application's history", () => {
    nock(API_ADDR)
      .post(/inventory\/.*$/)
      .reply(200);

    addItem("cheesecake", 5);

    expect(history.state).toEqual({ inventory: { cheesecake: 5 } });
  });

  describe("live-updates", () => {
    beforeAll(start);

    beforeAll(async () => {
      nock.cleanAll();
      await connect();
    });

    afterAll(stop);

    test("sending a x-socket-client-id header", () => {
      const clientId = client.id;

      nock(API_ADDR, { reqheaders: { "x-socket-client-id": clientId } })
        .post(/inventory\/.*$/)
        .reply(200);

      addItem("cheesecake", 5);
    });
  });
});
