const Koa = require("koa");
const Router = require("koa-router");
const { getInventory } = require("./inventoryController");

const app = new Koa();
const router = new Router();

router.get("/inventory", ctx => (ctx.body = getInventory()));

app.use(router.routes());

module.exports = app.listen(3000);
