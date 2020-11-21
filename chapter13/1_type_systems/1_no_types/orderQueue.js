const state = {
  deliveries: []
};

const addToDeliveryQueue = order => {
  if (order.status !== "done") {
    throw new Error("Can't add unfinished orders to the delivery queue.");
  }
  state.deliveries.push(order);
};

module.exports = { state, addToDeliveryQueue };
