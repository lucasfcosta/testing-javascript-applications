const environmentName = process.env.NODE_ENV;
const knex = require("knex");
const knexConfig = require("./knexfile")[environmentName];

const db = knex(knexConfig);

const closeConnection = () => db.destroy();

module.exports = {
  db,
  closeConnection
};
