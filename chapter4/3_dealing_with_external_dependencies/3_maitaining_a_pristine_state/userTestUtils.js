const { db } = require("./dbConnection");
const { hashPassword } = require("./authenticationController");

const username = "test_user";
const password = "a_password";
const passwordHash = hashPassword(password);
const email = "test_user@example.org";
const validAuth = Buffer.from(`${username}:${password}`).toString("base64");
const authHeader = `Basic ${validAuth}`;

const user = {
  username,
  password,
  email,
  authHeader
};

const createUser = async () => {
  const [id] = await db("users").insert({ username, email, passwordHash });
  user.id = id;
};

module.exports = { user, createUser };
