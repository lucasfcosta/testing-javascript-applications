module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./dev.sqlite" },
    useNullAsDefault: true
  }
};
