const pool = require("./instancePool");
const instance = pool.getInstance(process.env.JEST_WORKER_ID);
const { setState, getState, increment } = instance;

test("incrementing the state 10 times", () => {
  setState(0);
  for (let i = 0; i < 10; i++) {
    increment();
  }

  expect(getState()).toBe(10);
});
