const { db } = require("./dbConnection");

afterAll(() => db.destroy());
