const { calculateCartPrice } = require("./calculateCartPrice");

test("calculating total values", () => {
  expect(calculateCartPrice([1, 1, 2, 3])).toBe(7);
});
