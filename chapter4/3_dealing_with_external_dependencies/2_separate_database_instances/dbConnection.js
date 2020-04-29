const knex = require("knex");
const knexConfig = require("./knexfile").development;

const db = knex(knexConfig);

const closeConnection = () => db.destroy();

module.exports = {
  db,
  closeConnection
};
