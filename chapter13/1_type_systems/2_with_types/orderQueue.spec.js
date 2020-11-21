"use strict";
exports.__esModule = true;
var orderQueue_1 = require("./orderQueue");
test("adding finished items to the queue", function() {
  orderQueue_1.state.deliveries = [];
  var newOrder = {
    items: ["cheesecake"],
    status: "done"
  };
  orderQueue_1.addToDeliveryQueue(newOrder);
  expect(orderQueue_1.state.deliveries).toEqual([newOrder]);
});
