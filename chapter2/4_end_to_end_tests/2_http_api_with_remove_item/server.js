const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

let carts = new Map();

router.get("/carts/:username/items", ctx => {
  const cart = carts.get(ctx.params.username);
  cart ? (ctx.body = cart) : (ctx.status = 404);
});

router.post("/carts/:username/items/:item", ctx => {
  const { username, item } = ctx.params;
  const newItems = (carts.get(username) || []).concat(item);
  carts.set(username, newItems);
  ctx.body = newItems;
});

router.delete("/carts/:username/items/:item", ctx => {
  const { username, item } = ctx.params;
  const newItems = (carts.get(username) || []).filter(i => i !== item);
  carts.set(username, newItems);
  ctx.body = newItems;
});

app.use(router.routes());

// This method is designed especifically for testability.
// Because we keep `carts` in memory, we must reset it back
// to its inital state by deleting all items in it.
// If you were dealing with a database, you'd have to do
// something similar in your tests by ensuring the database
// is reset to its initial state before each test.
const resetState = () => {
  carts = new Map();
};

module.exports = {
  app: app.listen(3000),
  resetState
};
