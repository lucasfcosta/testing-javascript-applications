const crypto = require("crypto");
const {
  users,
  hashPassword,
  credentialsAreValid,
  authenticationMiddleware
} = require("./authenticationController");

afterEach(() => users.clear());

describe("hashPassword", () => {
  test("hashing passwords", () => {
    const plainTextPassword = "password_example";
    const hash = crypto.createHash("sha256");
    hash.update(plainTextPassword);
    const expectedHash = hash.digest("hex");
    expect(hashPassword(plainTextPassword)).toBe(expectedHash);
  });
});

describe("credentialsAreValid", () => {
  test("validating credentials", () => {
    users.set("test_user", {
      email: "test_user@example.org",
      passwordHash: hashPassword("a_password")
    });

    expect(credentialsAreValid("test_user", "a_password")).toBe(true);
  });
});

describe("authenticationMiddleware", () => {
  test("returning an error if the credentials are not valid", async () => {
    const fakeAuth = Buffer.from("invalid:credentials").toString("base64");
    const ctx = {
      request: {
        headers: { authorization: `Basic ${fakeAuth}` }
      }
    };

    const next = jest.fn();
    await authenticationMiddleware(ctx, next);
    expect(next.mock.calls).toHaveLength(0);
    expect(ctx).toEqual({
      ...ctx,
      status: 401,
      body: { message: "please provide valid credentials" }
    });
  });

  test("authenticating properly", async () => {
    users.set("test_user", {
      email: "test_user@example.org",
      passwordHash: hashPassword("a_password")
    });

    const validAuth = Buffer.from("test_user:a_password").toString("base64");
    const ctx = {
      request: {
        headers: { authorization: `Basic ${validAuth}` }
      }
    };

    const next = jest.fn();
    await authenticationMiddleware(ctx, next);
    expect(next.mock.calls).toHaveLength(1);
  });
});
