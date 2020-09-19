const fetch = require("isomorphic-fetch");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-body-parser");

const { db } = require("./dbConnection");

const { addItemToCart } = require("./cartController");
const {
  hashPassword,
  authenticationMiddleware
} = require("./authenticationController");

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(async (ctx, next) => {
  if (ctx.url.startsWith("/carts")) {
    return await authenticationMiddleware(ctx, next);
  }

  await next();
});

router.put("/users/:username", async ctx => {
  const { username } = ctx.params;
  const { email, password } = ctx.request.body;

  const userAlreadyExists = await db
    .select()
    .from("users")
    .where({ username })
    .first();

  if (userAlreadyExists) {
    ctx.body = { message: `${username} already exists` };
    ctx.status = 409;
    return;
  }

  await db("users").insert({
    username,
    email,
    passwordHash: hashPassword(password)
  });

  return (ctx.body = { message: `${username} created successfully` });
});

router.post("/carts/:username/items", async ctx => {
  const { username } = ctx.params;
  const { item, quantity } = ctx.request.body;

  for (let i = 0; i < quantity; i++) {
    try {
      const newItems = await addItemToCart(username, item);
      ctx.body = newItems;
    } catch (e) {
      ctx.body = { message: e.message };
      ctx.status = e.code;
      return;
    }
  }
});

router.delete("/carts/:username/items/:item", async ctx => {
  const { username, item } = ctx.params;
  const user = await db
    .select()
    .from("users")
    .where({ username })
    .first();

  if (!user) {
    ctx.body = { message: "user not found" };
    ctx.status = 404;
    return;
  }

  const itemEntry = await db
    .select()
    .from("carts_items")
    .where({ userId: user.id, itemName: item })
    .first();

  if (!itemEntry || itemEntry.quantity === 0) {
    ctx.body = { message: `${item} is not in the cart` };
    ctx.status = 400;
    return;
  }

  await db("carts_items")
    .decrement("quantity")
    .where({ userId: user.id, itemName: item });

  const inventoryEntry = await db
    .select()
    .from("inventory")
    .where({ itemName: item })
    .first();
  if (inventoryEntry) {
    await db("inventory")
      .increment("quantity")
      .where({ userId: itemEntry.userId, itemName: item });
  } else {
    await db("inventory").insert({ itemName: item, quantity: 1 });
  }

  ctx.body = await db
    .select("itemName", "quantity")
    .from("carts_items")
    .where({ userId: user.id });
});

router.get("/inventory/:itemName", async ctx => {
  const { itemName } = ctx.params;

  const response = await fetch(`http://recipepuppy.com/api?i=${itemName}`);
  const { title, href, results: recipes } = await response.json();
  const inventoryItem = await db
    .select()
    .from("inventory")
    .where({ itemName })
    .first();

  ctx.body = {
    ...inventoryItem,
    info: `Data obtained from ${title} - ${href}`,
    recipes
  };
});

app.use(router.routes());

module.exports = { app: app.listen(3000) };
