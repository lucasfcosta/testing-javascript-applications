import React from "react";
import nock from "nock";
import { ItemForm } from "./ItemForm.jsx";
import { render, fireEvent } from "@testing-library/react";

const API_ADDR = "http://localhost:3000";

test("form's elements", () => {
  const { getByText, getByPlaceholderText } = render(<ItemForm />);
  expect(getByPlaceholderText("Item name")).toBeInTheDocument();
  expect(getByPlaceholderText("Quantity")).toBeInTheDocument();
  expect(getByText("Add item")).toBeInTheDocument();
});

test("sending requests", () => {
  const { getByText, getByPlaceholderText } = render(<ItemForm />);

  nock(API_ADDR)
    .post("/inventory/cheesecake", JSON.stringify({ quantity: 2 }))
    .reply(200);

  fireEvent.change(getByPlaceholderText("Item name"), {
    target: { value: "cheesecake" }
  });
  fireEvent.change(getByPlaceholderText("Quantity"), {
    target: { value: "2" }
  });
  fireEvent.click(getByText("Add item"));

  expect(nock.isDone()).toBe(true);
});
