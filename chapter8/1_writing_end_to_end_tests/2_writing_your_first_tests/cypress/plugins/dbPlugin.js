const { db } = require("../dbConnection");

const dbPlugin = (on, config) => {
  on(
    "task",
    {
      emptyDb: () => db("inventory").truncate(),
      seedItem: itemRow => db("inventory").insert(itemRow)
    },
    config
  );

  return config;
};

module.exports = dbPlugin;
