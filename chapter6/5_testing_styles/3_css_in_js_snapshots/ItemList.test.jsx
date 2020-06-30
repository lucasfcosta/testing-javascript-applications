import React from "react";
import { ItemList, generateItemText } from "./ItemList.jsx";
import { render } from "@testing-library/react";

jest.mock("react-spring/renderprops");

describe("generateItemText", () => {
  test("generating an item's text", () => {
    expect(generateItemText("cheesecake", 3)).toBe("Cheesecake - Quantity: 3");
    expect(generateItemText("apple pie", 22)).toBe("Apple pie - Quantity: 22");
  });
});

describe("ItemList Component", () => {
  test("list items", () => {
    const itemList = { cheesecake: 2, croissant: 5, macaroon: 96 };
    const { getByText } = render(<ItemList itemList={itemList} />);

    const listElement = document.querySelector("ul");
    expect(listElement.childElementCount).toBe(3);
    expect(getByText(generateItemText("cheesecake", 2))).toBeInTheDocument();
    expect(getByText(generateItemText("croissant", 5))).toBeInTheDocument();
    expect(getByText(generateItemText("macaroon", 96))).toBeInTheDocument();
  });

  test("highlighting items that are almost out of stock", () => {
    const itemList = { cheesecake: 2, croissant: 5, macaroon: 96 };

    const { getByText } = render(<ItemList itemList={itemList} />);
    const cheesecakeItem = getByText(generateItemText("cheesecake", 2));
    expect(cheesecakeItem).toHaveStyle({ color: "red" });
  });
});
