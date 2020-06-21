import React from "react";
import nock from "nock";
import { API_ADDR } from "./constants";
import { ItemForm } from "./ItemForm.jsx";
import { render, fireEvent, waitFor } from "@testing-library/react";

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

test("invoking the onItemAdded callback", async () => {
  const onItemAdded = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <ItemForm onItemAdded={onItemAdded} />
  );

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

  await waitFor(() => expect(nock.isDone()).toBe(true));

  expect(onItemAdded.mock.calls).toHaveLength(1);
  expect(onItemAdded.mock.calls[0]).toEqual(["cheesecake", 2]);
});
