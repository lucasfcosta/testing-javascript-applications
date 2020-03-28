const fs = require("fs");

const logger = {
  log: msg => fs.appendFileSync("/tmp/logs.out", msg + "\n")
};

module.exports = logger;
