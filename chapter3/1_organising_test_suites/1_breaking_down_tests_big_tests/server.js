const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const carts = new Map();
const inventory = new Map();

router.post("/carts/:username/items/:item", ctx => {
  const { username, item } = ctx.params;
  if (!inventory.get(item)) {
    ctx.status = 404;
    return;
  }

  inventory.set(item, inventory.get(item) - 1);
  const newItems = (carts.get(username) || []).concat(item);
  carts.set(username, newItems);
  ctx.body = newItems;
});

app.use(router.routes());

module.exports = {
  app: app.listen(3000),
  inventory,
  carts
};
