module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "../server/dev.sqlite" },
    useNullAsDefault: true
  }
};
