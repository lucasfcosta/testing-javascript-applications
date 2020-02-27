const logger = require("./logger");
const {
  inventory,
  addToInventory,
  getInventory
} = require("./inventoryController");

// Clearing the inventory before each test
beforeEach(() => {
  inventory.forEach((value, key) => inventory.delete(key));
});

afterEach(() => jest.resetAllMocks());

jest.mock("./logger");

describe("addToInventory", () => {
  beforeEach(() => {
    jest
      .spyOn(process, "memoryUsage")
      .mockReturnValue({ rss: 123456, heapTotal: 1, heapUsed: 2, external: 3 });
  });

  test("logging new items", () => {
    addToInventory("cheesecake", 2);

    expect(logger.logInfo.mock.calls).toHaveLength(1);

    const firstCallArgs = logger.logInfo.mock.calls[0];
    const [firstArg, secondArg] = firstCallArgs;

    expect(firstArg).toEqual({
      item: "cheesecake",
      quantity: 2,
      memoryUsage: 123456
    });
    expect(secondArg).toEqual("item added to the inventory");
  });

  test("logging logErrors", () => {
    try {
      addToInventory("cheesecake", "not a number");
    } catch (e) {
      // No-op
    }

    expect(logger.logError.mock.calls).toHaveLength(1);

    const firstCallArgs = logger.logError.mock.calls[0];
    const [firstArg, secondArg] = firstCallArgs;

    expect(firstArg).toEqual({ quantity: "not a number" });
    expect(secondArg).toEqual(
      "could not add item to inventory because quantity was not a number"
    );
  });
});

describe("getInventory", () => {
  test("logging fetches", () => {
    inventory.set("cheesecake", 2);
    getInventory("cheesecake", 2);

    expect(logger.logInfo.mock.calls).toHaveLength(1);

    const firstCallArgs = logger.logInfo.mock.calls[0];
    const [firstArg, secondArg] = firstCallArgs;

    expect(firstArg).toEqual({ contents: { cheesecake: 2 } });
    expect(secondArg).toEqual("inventory items fetched");
  });
});
