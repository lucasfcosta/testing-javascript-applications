const { calculateCartPrice } = require("./calculateCartPrice");

test("calculating total values", () => {
  expect(calculateCartPrice([1, 1, 2, 3])).toBe(7);
  expect(calculateCartPrice([3, 5, 8])).toBe(16);
  expect(calculateCartPrice([13, 21])).toBe(34);
  expect(calculateCartPrice([55])).toBe(55);
});
