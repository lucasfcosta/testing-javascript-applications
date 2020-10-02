module.exports = {
  test: {
    client: "sqlite3",
    connection: { filename: "./test.sqlite" },
    useNullAsDefault: true
  },
  development: {
    client: "sqlite3",
    connection: { filename: "./dev.sqlite" },
    useNullAsDefault: true
  }
};
