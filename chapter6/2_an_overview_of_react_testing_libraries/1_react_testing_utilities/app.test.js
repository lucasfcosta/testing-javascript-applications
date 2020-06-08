import React from "react";
import { App } from "./App.jsx";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen, fireEvent } from "@testing-library/dom";

const root = document.createElement("div");
document.body.appendChild(root);

test("renders the appropriate header", () => {
  act(() => {
    render(<App />, root);
  });
  expect(screen.getByText("Inventory Contents")).toBeInTheDocument();
});

test("increments the number of cheesecakes", () => {
  act(() => {
    render(<App />, root);
  });

  expect(screen.getByText("Cheesecakes: 0")).toBeInTheDocument();

  const addCheesecakeBtn = screen.getByText("Add cheesecake");
  act(() => {
    fireEvent.click(addCheesecakeBtn);
  });

  expect(screen.getByText("Cheesecakes: 1")).toBeInTheDocument();
});
