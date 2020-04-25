const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./index.html");

const { incrementCount, data } = require("./main");

describe("incrementCount", () => {
  test("incrementing the count", () => {
    data.count = 0;
    incrementCount();
    expect(data.count).toBe(1);
  });
});
