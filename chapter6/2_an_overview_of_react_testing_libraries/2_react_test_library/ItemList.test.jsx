import React from "react";
import { ItemList } from "./ItemList.jsx";
import { render } from "@testing-library/react";

test("list items", () => {
  const itemList = { cheesecake: 2, croissant: 5, macaroon: 96 };
  const { getByText } = render(<ItemList itemList={itemList} />);

  const listElement = document.querySelector("ul");
  expect(listElement.childElementCount).toBe(3);
  expect(getByText("cheesecake - Quantity: 2")).toBeInTheDocument();
  expect(getByText("croissant - Quantity: 5")).toBeInTheDocument();
  expect(getByText("macaroon - Quantity: 96")).toBeInTheDocument();
});
