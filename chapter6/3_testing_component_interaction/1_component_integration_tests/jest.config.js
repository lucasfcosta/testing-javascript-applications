module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>/setupJestDom.js",
    "<rootDir>/setupGlobalFetch.js",
    "<rootDir>/failOnPropTypesWarning.js"
  ]
};
