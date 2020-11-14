const inventory = new Map();

const addToInventory = (item, n) => {
  if (typeof n !== "number") throw new Error("quantity must be a number");
  const currentQuantity = inventory.get(item) || 0;
  const newQuantity = currentQuantity + n;
  inventory.set(item, newQuantity);
  return newQuantity;
};

const getInventory = () => {
  const contentArray = Array.from(inventory.entries());
  const contents = contentArray.reduce((contents, [name, quantity]) => {
    return { ...contents, [name]: quantity };
  }, {});

  // To make the tests in this folder pass, update this
  // line so that it doesn't set the new Date's year to 3000.
  return { ...contents, generatedAt: new Date(new Date().setYear(3000)) };
};

module.exports = { inventory, addToInventory, getInventory };
