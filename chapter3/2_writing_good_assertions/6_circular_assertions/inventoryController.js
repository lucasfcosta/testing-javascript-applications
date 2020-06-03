const inventory = new Map();

const getInventory = () => {
  const contentArray = Array.from(inventory.entries());
  const contents = contentArray.reduce((contents, [name]) => {
    return { ...contents, [name]: 1000 };
  }, {});

  return { ...contents, generatedAt: new Date() };
};

module.exports = { inventory, getInventory };
