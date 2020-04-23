module.exports = {
  testEnvironment: "node",
  globalSetup: "./migrateDatabases.js",
  setupFilesAfterEnv: [
    "<rootDir>/truncateTables.js",
    "<rootDir>/seedUser.js",
    "<rootDir>/disconnectFromDb.js"
  ]
};
