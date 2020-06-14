import React from "react";
import nock from "nock";
import { App } from "./App.jsx";
import { render, act, waitFor } from "@testing-library/react";

const API_ADDR = "http://localhost:3000";

jest.mock("./ItemList.jsx", () => {
  const { ItemList } = jest.requireActual("./ItemList.jsx");
  const FakeItemList = jest.fn(({ itemList }) => (
    <div data-testid="fake-item-list">{JSON.stringify(itemList)}</div>
  ));
  FakeItemList.propTypes = ItemList.propTypes;
  return { ItemList: FakeItemList };
});

beforeEach(() => {
  nock(API_ADDR)
    .get("/inventory")
    .reply(200, { cheesecake: 2, croissant: 5, macaroon: 96 });
});

afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});

test("renders the appropriate header", () => {
  const { getByText } = render(<App />);
  expect(getByText("Inventory Contents")).toBeInTheDocument();
});

test("rendering the server's list of items", async () => {
  const { getByTestId } = render(<App />);

  await waitFor(() => {
    const FakeItemList = getByTestId("fake-item-list");
    expect(FakeItemList.textContent).toEqual(
      JSON.stringify({ cheesecake: 2, croissant: 5, macaroon: 96 })
    );
  });
});
