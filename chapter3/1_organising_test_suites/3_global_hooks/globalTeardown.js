const teardown = () => {
  console.log(`The value set on setup was: ${global._accessibleOnTeardown}`);
  console.log("teardown executed");
};

module.exports = teardown;
