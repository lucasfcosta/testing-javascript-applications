import { state, addToDeliveryQueue, DoneOrder } from "./orderQueue";

test("adding finished items to the queue", () => {
  state.deliveries = [];
  const newOrder: DoneOrder = {
    items: ["cheesecake"],
    status: "done"
  };
  addToDeliveryQueue(newOrder);
  expect(state.deliveries).toEqual([newOrder]);
});
