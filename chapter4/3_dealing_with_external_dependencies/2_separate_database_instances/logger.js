const fs = require("fs");

const logger = {
  log: msg => fs.appendFileSync("tmplogs.out", msg + "\n")
};

module.exports = logger;
