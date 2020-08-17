const nock = require("nock");
const fs = require("fs");
const initialHtml = fs.readFileSync("./index.html");
const { getByText } = require("@testing-library/dom");
const { data } = require("./inventoryController");
const { start, stop, sendMsg } = require("./testSocketServer");

const { handleAddItemMsg, connect } = require("./socket");

beforeEach(() => {
  document.body.innerHTML = initialHtml;
});

beforeEach(() => {
  data.inventory = {};
});

describe("handleAddItemMsg", () => {
  test("updating the inventory and the item list", () => {
    handleAddItemMsg({ itemName: "cheesecake", quantity: 6 });

    expect(data.inventory).toEqual({ cheesecake: 6 });
    const itemList = document.getElementById("item-list");
    expect(itemList.childNodes).toHaveLength(1);
    expect(getByText(itemList, "cheesecake - Quantity: 6")).toBeInTheDocument();
  });
});

describe("handling real messages", () => {
  beforeAll(start);

  beforeAll(async () => {
    nock.cleanAll();
    await connect();
  });

  afterAll(stop);

  test("handling add_item messages", async () => {
    sendMsg("add_item", { itemName: "cheesecake", quantity: 6 });

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(data.inventory).toEqual({ cheesecake: 6 });
    const itemList = document.getElementById("item-list");
    expect(itemList.childNodes).toHaveLength(1);
    expect(getByText(itemList, "cheesecake - Quantity: 6")).toBeInTheDocument();
  });
});
