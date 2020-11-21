"use strict";
exports.__esModule = true;
exports.addToDeliveryQueue = exports.state = void 0;
exports.state = {
  deliveries: []
};
var addToDeliveryQueue = function(order) {
  exports.state.deliveries.push(order);
};
exports.addToDeliveryQueue = addToDeliveryQueue;
