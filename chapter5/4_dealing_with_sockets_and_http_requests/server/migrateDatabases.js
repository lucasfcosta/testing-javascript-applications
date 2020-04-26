const environmentName = process.env.NODE_ENV || "test";
const environmentConfig = require("./knexfile")[environmentName];
const db = require("knex")(environmentConfig);

module.exports = async () => {
  // Migrate the database to the latest state
  await db.migrate.latest();

  // Close the connection to the database so that tests won't hang
  await db.destroy();
};
