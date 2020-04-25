const JSDOMEnvironment = require("jest-environment-jsdom");
const page = require("./page");

class CountPageEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(config);
    this.dom.window = page.window;
  }

  teardown() {
    this.global.jsdom = null;
    return super.teardown();
  }
}

module.exports = CountPageEnvironment;
