const fetch = require("isomorphic-fetch");
const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const bodyParser = require("koa-body-parser");

const { db } = require("./dbConnection");

const { addItemToCart } = require("./cartController");
const {
  hashPassword,
  authenticationMiddleware
} = require("./authenticationController");

const PORT = process.env.NODE_ENV === "test" ? 5000 : 3000;

const app = new Koa();
const router = new Router();

app.use(cors());

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

router.post("/inventory/:itemName", async ctx => {
  const { itemName } = ctx.params;
  const { quantity } = ctx.request.body;

  const current = await db
    .select("itemName", "quantity")
    .from("inventory")
    .where({ itemName })
    .first();

  const itemExists = current && current.quantity > 0;
  const newRecord = {
    itemName,
    quantity: (itemExists ? current.quantity : 0) + quantity
  };

  if (current) {
    await db("inventory")
      .increment("quantity", quantity)
      .where({ itemName });
  } else {
    await db("inventory").insert(newRecord);
  }

  ctx.body = newRecord;
});

router.delete("/inventory/:itemName", async ctx => {
  const { itemName } = ctx.params;
  const { quantity } = ctx.request.body;

  const current = await db
    .select("itemName", "quantity")
    .from("inventory")
    .where({ itemName })
    .first();

  const canDelete = current && current.quantity > quantity;

  if (canDelete) {
    await db("inventory")
      .decrement("quantity", quantity)
      .where({ itemName });
    ctx.body = { message: `Removed ${quantity} units of ${itemName}` };
  } else {
    ctx.status = 404;
    ctx.body = {
      message: `There aren't ${quantity} units of ${itemName} available.`
    };
  }
});

router.get("/inventory", async ctx => {
  const inventoryContent = await db
    .select("itemName", "quantity")
    .from("inventory")
    .where("quantity", ">", 0)
    .orderBy("quantity", "desc");

  ctx.body = inventoryContent.reduce((acc, { itemName, quantity }) => {
    return { ...acc, [itemName]: quantity };
  }, {});
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

module.exports = { app: app.listen(PORT) };
