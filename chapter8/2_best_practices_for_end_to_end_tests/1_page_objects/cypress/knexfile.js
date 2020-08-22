module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "../../server/dev.sqlite" },
    useNullAsDefault: true
  },
  cypress: {
    client: "sqlite3",
    connection: { filename: "../../server/cypress.sqlite" },
    useNullAsDefault: true
  }
};
