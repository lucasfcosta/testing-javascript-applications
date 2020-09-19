const { pickMostExpensive } = require("./pickMostExpensive");

test("picking the most expensive cart", () => {
  expect(pickMostExpensive([[3, 2, 1, 4], [5], [50]])).toEqual([50]);
  expect(pickMostExpensive([[2, 8, 9], [0], [20]])).toEqual([20]);
  expect(pickMostExpensive([[0], [0], [0]])).toEqual([0]);
  expect(pickMostExpensive([[], [5], []])).toEqual([5]);
});

test("null for an empty cart array", () => {
  expect(pickMostExpensive([])).toEqual(null);
});
