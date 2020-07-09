const { calculateCartPrice } = require("./calculateCartPrice");

test("calculating total values", () => {
  expect(calculateCartPrice([1, 1, 2, 3])).toBe(7);
  expect(calculateCartPrice([3, 5, 8])).toBe(16);
  expect(calculateCartPrice([13, 21])).toBe(34);
  expect(calculateCartPrice([55])).toBe(55);
});

test("applying a discount", () => {
  expect(calculateCartPrice([1, 2, 3], 50)).toBe(3);
  expect(calculateCartPrice([2, 5, 5], 25)).toBe(9);
  expect(calculateCartPrice([9, 21], 10)).toBe(27);
  expect(calculateCartPrice([50, 50], 100)).toBe(0);
});
