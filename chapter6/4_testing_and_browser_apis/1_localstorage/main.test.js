const fs = require("fs");
const initialHtml = fs.readFileSync("./index.html");
const { screen, getByText, fireEvent } = require("@testing-library/dom");

beforeEach(() => localStorage.clear());

beforeEach(() => {
  document.body.innerHTML = initialHtml;

  // You must execute main.js again so that it can attach the
  // event listener to the form every time the body changes.
  // Here you must use `jest.resetModules` because otherwise
  // Jest will have cached `main.js` and it will _not_ run again.
  jest.resetModules();
  require("./main");
});

test("persists items between sessions", () => {
  const itemField = screen.getByPlaceholderText("Item name");
  fireEvent.input(itemField, {
    target: { value: "cheesecake" },
    bubbles: true
  });

  const quantityField = screen.getByPlaceholderText("Quantity");
  fireEvent.input(quantityField, { target: { value: "6" }, bubbles: true });

  const submitBtn = screen.getByText("Add to inventory");
  fireEvent.click(submitBtn);

  const itemListBefore = document.getElementById("item-list");
  expect(itemListBefore.childNodes).toHaveLength(1);
  expect(
    getByText(itemListBefore, "cheesecake - Quantity: 6")
  ).toBeInTheDocument();

  // This is equivalent to reloading the page
  document.body.innerHTML = initialHtml;
  jest.resetModules();
  require("./main");

  const itemListAfter = document.getElementById("item-list");
  expect(itemListAfter.childNodes).toHaveLength(1);
  expect(
    getByText(itemListAfter, "cheesecake - Quantity: 6")
  ).toBeInTheDocument();
});

describe("adding items", () => {
  test("updating the item list", () => {
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
