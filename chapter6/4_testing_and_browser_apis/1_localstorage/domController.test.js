const fs = require("fs");
const initialHtml = fs.readFileSync("./index.html");
const { getByText, screen } = require("@testing-library/dom");

const {
  updateItemList,
  handleAddItem,
  checkFormValues
} = require("./domController");

beforeEach(() => {
  document.body.innerHTML = initialHtml;
});

describe("updateItemList", () => {
  beforeEach(() => localStorage.clear());

  test("updates the DOM with the inventory items", () => {
    const inventory = {
      cheesecake: 5,
      "apple pie": 2,
      "carrot cake": 6
    };
    updateItemList(inventory);

    const itemList = document.getElementById("item-list");
    expect(itemList.childNodes).toHaveLength(3);

    expect(getByText(itemList, "cheesecake - Quantity: 5")).toBeInTheDocument();
    expect(getByText(itemList, "apple pie - Quantity: 2")).toBeInTheDocument();
    expect(
      getByText(itemList, "carrot cake - Quantity: 6")
    ).toBeInTheDocument();
  });

  test("highlighting in red elements whose quantity is below five", () => {
    const inventory = { cheesecake: 5, "apple pie": 2, "carrot cake": 6 };
    updateItemList(inventory);

    expect(screen.getByText("apple pie - Quantity: 2")).toHaveStyle({
      color: "red"
    });
  });

  test("adding a paragraph indicating what was the update", () => {
    const inventory = { cheesecake: 5, "apple pie": 2 };
    updateItemList(inventory);

    expect(
      screen.getByText(
        `The inventory has been updated - ${JSON.stringify(inventory)}`
      )
    ).toBeTruthy();
  });

  test("updates the localStorage with the inventory", () => {
    const inventory = { cheesecake: 5, "apple pie": 2 };
    updateItemList(inventory);

    expect(localStorage.getItem("inventory")).toEqual(
      JSON.stringify(inventory)
    );
  });

  test("does not update the inventory when passing null", () => {
    localStorage.setItem("inventory", JSON.stringify({ cheesecake: 5 }));
    updateItemList(null);

    expect(localStorage.getItem("inventory")).toEqual(
      JSON.stringify({ cheesecake: 5 })
    );
  });
});

describe("handleAddItem", () => {
  test("adding items to the page", () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        elements: {
          name: { value: "cheesecake" },
          quantity: { value: "6" }
        }
      }
    };

    handleAddItem(event);

    // Checking if the form's default reload is prevent
    expect(event.preventDefault.mock.calls).toHaveLength(1);

    const itemList = document.getElementById("item-list");
    expect(getByText(itemList, "cheesecake - Quantity: 6")).toBeInTheDocument();
  });
});

describe("checkFormValues", () => {
  test("entering valid item values", () => {
    document.querySelector(`input[name="name"]`).value = "cheesecake";
    document.querySelector(`input[name="quantity"]`).value = "1";
    checkFormValues();
    expect(screen.getByText("Add to inventory")).toBeEnabled();
  });

  test("entering invalid item names", () => {
    document.querySelector(`input[name="name"]`).value = "invalid";
    document.querySelector(`input[name="quantity"]`).value = "1";
    checkFormValues();
    expect(screen.getByText("Add to inventory")).toBeDisabled();

    document.querySelector(`input[name="name"]`).value = "cheesecake";
    document.querySelector(`input[name="quantity"]`).value = "";
    checkFormValues();
    expect(screen.getByText("Add to inventory")).toBeDisabled();
  });
});
