//const pow = require("./pow_recursive");
const pow = require("./pow_loop");

test("calculates powers", () => {
  expect(pow(2, 0)).toBe(1);
  expect(pow(2, -3)).toBe(0.125);
  expect(pow(2, 2)).toBe(4);
  expect(pow(2, 5)).toBe(32);
  expect(pow(0, 5)).toBe(0);
  expect(pow(1, 4)).toBe(1);
});
