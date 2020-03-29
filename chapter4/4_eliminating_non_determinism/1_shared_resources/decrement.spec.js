const { getState, setState, decrement } = require("./countModule");

test("decrementing the state 10 times", () => {
  setState(0);
  for (let i = 0; i < 10; i++) {
    decrement();
  }

  expect(getState()).toBe(-10);
});
