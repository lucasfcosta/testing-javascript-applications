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

beforeAll(() => jest.spyOn(logger, "info").mockImplementation(jest.fn()));
beforeAll(() => jest.spyOn(logger, "error").mockImplementation(jest.fn()));

afterEach(() => jest.resetAllMocks());

describe("addToInventory", () => {
  beforeEach(() => {
    jest
      .spyOn(process, "memoryUsage")
      .mockReturnValue({ rss: 123456, heapTotal: 1, heapUsed: 2, external: 3 });
  });

  test("logging new items", () => {
    addToInventory("cheesecake", 2);

    expect(logger.info.mock.calls).toHaveLength(1);

    const firstCallArgs = logger.info.mock.calls[0];
    const [firstArg, secondArg] = firstCallArgs;

    expect(firstArg).toEqual({
      item: "cheesecake",
      quantity: 2,
      memoryUsage: 123456
    });
    expect(secondArg).toEqual("item added to the inventory");
  });

  test("logging errors", () => {
    try {
      addToInventory("cheesecake", "not a number");
    } catch (e) {
      // No-op
    }

    expect(logger.error.mock.calls).toHaveLength(1);

    const firstCallArgs = logger.error.mock.calls[0];
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

    expect(logger.info.mock.calls).toHaveLength(1);

    const firstCallArgs = logger.info.mock.calls[0];
    const [firstArg, secondArg] = firstCallArgs;

    expect(firstArg).toEqual({ contents: { cheesecake: 2 } });
    expect(secondArg).toEqual("inventory items fetched");
  });
});
