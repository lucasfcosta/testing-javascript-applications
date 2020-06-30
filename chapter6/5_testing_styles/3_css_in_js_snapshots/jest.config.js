module.exports = {
  snapshotSerializers: ["jest-emotion"],
  setupFilesAfterEnv: [
    "<rootDir>/setupJestDom.js",
    "<rootDir>/setupJestEmotion.js",
    "<rootDir>/setupGlobalFetch.js"
  ]
};
