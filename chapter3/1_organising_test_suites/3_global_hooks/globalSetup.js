const setup = () => {
  global._accessibleOnTeardown = "Look, I was set on the setup file";
  console.log("\nsetup executed\n");
};

module.exports = setup;
