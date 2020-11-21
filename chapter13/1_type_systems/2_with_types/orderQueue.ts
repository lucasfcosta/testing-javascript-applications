type OrderItems = { 0: string } & Array<string>;

type Order = {
  status: "in progress" | "done";
  items: OrderItems;
};

export type DoneOrder = Order & { status: "done" };

export const state: { deliveries: Array<Order> } = {
  deliveries: []
};

export const addToDeliveryQueue = (order: DoneOrder) => {
  state.deliveries.push(order);
};
