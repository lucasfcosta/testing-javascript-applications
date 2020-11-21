const { state, addToDeliveryQueue } = require("./orderQueue");

test("adding unfinished orders to the queue", () => {
  state.deliveries = [];
  const newOrder = {
    items: ["cheesecake"],
    status: "in progress"
  };
  expect(() => addToDeliveryQueue(newOrder)).toThrow();
  expect(state.deliveries).toEqual([]);
});
