const db = require("knex")(require("./knexfile").development);

const closeConnection = () => db.destroy();

module.exports = {
  db,
  closeConnection
};
