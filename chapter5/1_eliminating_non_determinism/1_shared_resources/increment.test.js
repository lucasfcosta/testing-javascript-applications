const { getState, setState, increment } = require("./countModule");

test("incrementing the state 10 times", () => {
  setState(0);
  for (let i = 0; i < 10; i++) {
    increment();
  }

  expect(getState()).toBe(10);
});
