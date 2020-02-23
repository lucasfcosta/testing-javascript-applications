const inventory = new Map();

const getInventory = () => {
  const contentArray = Array.from(inventory.entries());
  const contents = contentArray.reduce((contents, [name]) => {
    return Object.assign({ [name]: 1000 }, contents);
  }, {});

  return { ...contents, generatedAt: new Date() };
};

module.exports = { inventory, getInventory };
