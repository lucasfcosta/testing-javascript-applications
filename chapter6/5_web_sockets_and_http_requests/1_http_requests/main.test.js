const nock = require("nock");
const fs = require("fs");
const initialHtml = fs.readFileSync("./index.html");
const { screen, getByText, fireEvent } = require("@testing-library/dom");
const { API_ADDR } = require("./inventoryController");

const { clearHistoryHook, detachPopstateHandlers } = require("./testUtils.js");

beforeEach(clearHistoryHook);

beforeEach(() => localStorage.clear());

beforeEach(async () => {
  document.body.innerHTML = initialHtml;

  jest.spyOn(window, "addEventListener");

  // You must execute main.js again so that it can attach the
  // event listener to the form every time the body changes.
  // Here you must use `jest.resetModules` because otherwise
  // Jest will have cached `main.js` and it will _not_ run again.
  jest.resetModules();

  nock(API_ADDR)
    .get("/inventory")
    .replyWithError({ code: 500 });
  await require("./main");  
});

afterEach(detachPopstateHandlers);

afterEach(() => {
  if (!nock.isDone()) {
    nock.cleanAll();
    throw new Error("Not all mocked endpoints received requests.");
  }
});

test("persists items between sessions", async () => {
  nock(API_ADDR)
    .post(/inventory\/.*$/)
    .reply(200);

  nock(API_ADDR)
    .get("/inventory")
    .replyWithError({ code: 500 });

  const itemField = screen.getByPlaceholderText("Item name");
  const submitBtn = screen.getByText("Add to inventory");
  fireEvent.input(itemField, {
    target: { value: "cheesecake" },
    bubbles: true
  });

  const quantityField = screen.getByPlaceholderText("Quantity");
  fireEvent.input(quantityField, { target: { value: "6" }, bubbles: true });

  fireEvent.click(submitBtn);

  const itemListBefore = document.getElementById("item-list");
  expect(itemListBefore.childNodes).toHaveLength(1);
  expect(
    getByText(itemListBefore, "cheesecake - Quantity: 6")
  ).toBeInTheDocument();

  // This is equivalent to reloading the page
  document.body.innerHTML = initialHtml;
  jest.resetModules();

  await require("./main");

  const itemListAfter = document.getElementById("item-list");
  expect(itemListAfter.childNodes).toHaveLength(1);
  expect(
    getByText(itemListAfter, "cheesecake - Quantity: 6")
  ).toBeInTheDocument();
});

describe("adding items", () => {
  test("updating the item list", () => {
    nock(API_ADDR)
      .post(/inventory\/.*$/)
      .reply(200);

    const itemField = screen.getByPlaceholderText("Item name");
    const submitBtn = screen.getByText("Add to inventory");
    fireEvent.input(itemField, {
      target: { value: "cheesecake" },
      bubbles: true
    });

    const quantityField = screen.getByPlaceholderText("Quantity");
    fireEvent.input(quantityField, { target: { value: "6" }, bubbles: true });

    fireEvent.click(submitBtn);

    const itemList = document.getElementById("item-list");
    expect(getByText(itemList, "cheesecake - Quantity: 6")).toBeInTheDocument();
  });

  test("sending a request to update the item list", () => {
    nock(API_ADDR)
      .post("/inventory/cheesecake", JSON.stringify({ quantity: 6 }))
      .reply(200);

    const submitBtn = screen.getByText("Add to inventory");
    const itemField = screen.getByPlaceholderText("Item name");
    fireEvent.input(itemField, {
      target: { value: "cheesecake" },
      bubbles: true
    });

    const quantityField = screen.getByPlaceholderText("Quantity");
    fireEvent.input(quantityField, { target: { value: "6" }, bubbles: true });

    fireEvent.click(submitBtn);

    if (!nock.isDone())
      throw new Error("POST /inventory/cheesecake was not reached");
  });

  test("undo to one item", done => {
    // You must specify the encoded URL here because
    // nock struggles with encoded urls
    nock(API_ADDR)
      .post("/inventory/carrot%20cake")
      .reply(200);

    nock(API_ADDR)
      .post("/inventory/cheesecake")
      .reply(200);

    const itemField = screen.getByPlaceholderText("Item name");
    const quantityField = screen.getByPlaceholderText("Quantity");
    const submitBtn = screen.getByText("Add to inventory");

    fireEvent.input(itemField, {
      target: { value: "cheesecake" },
      bubbles: true
    });
    fireEvent.input(quantityField, { target: { value: "6" }, bubbles: true });
    fireEvent.click(submitBtn);

    fireEvent.input(itemField, {
      target: { value: "carrot cake" },
      bubbles: true
    });
    fireEvent.input(quantityField, { target: { value: "5" }, bubbles: true });
    fireEvent.click(submitBtn);

    window.addEventListener("popstate", () => {
      const itemList = document.getElementById("item-list");
      expect(itemList.children).toHaveLength(1);
      expect(
        getByText(itemList, "cheesecake - Quantity: 6")
      ).toBeInTheDocument();
      done();
    });

    fireEvent.click(screen.getByText("Undo"));
  });

  test("undo to empty list", done => {
    nock(API_ADDR)
      .post(/inventory\/.*$/)
      .reply(200);

    const itemField = screen.getByPlaceholderText("Item name");
    const submitBtn = screen.getByText("Add to inventory");
    fireEvent.input(itemField, {
      target: { value: "cheesecake" },
      bubbles: true
    });

    const quantityField = screen.getByPlaceholderText("Quantity");
    fireEvent.input(quantityField, { target: { value: "6" }, bubbles: true });

    fireEvent.click(submitBtn);

    expect(history.state).toEqual({ inventory: { cheesecake: 6 } });

    window.addEventListener("popstate", () => {
      const itemList = document.getElementById("item-list");
      expect(itemList).toBeEmpty();
      done();
    });

    fireEvent.click(screen.getByText("Undo"));
  });
});

describe("item name validation", () => {
  test("entering valid item names ", () => {
    const itemField = screen.getByPlaceholderText("Item name");

    fireEvent.input(itemField, {
      target: { value: "cheesecake" },
      bubbles: true
    });

    expect(screen.getByText("cheesecake is valid!")).toBeInTheDocument();
  });

  test("entering invalid item names ", () => {
    const itemField = screen.getByPlaceholderText("Item name");

    fireEvent.input(itemField, { target: { value: "book" }, bubbles: true });

    expect(screen.getByText("book is not a valid item.")).toBeInTheDocument();
  });
});
