const pool = require("./instancePool");
const instance = pool.getInstance(process.env.JEST_WORKER_ID);
const { setState, getState, decrement } = instance;

test("decrementing the state 10 times", () => {
  setState(0);
  for (let i = 0; i < 10; i++) {
    decrement();
  }

  expect(getState()).toBe(-10);
});
