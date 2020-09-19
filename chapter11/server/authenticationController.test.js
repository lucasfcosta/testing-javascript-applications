const crypto = require("crypto");
const {
  hashPassword,
  credentialsAreValid,
  authenticationMiddleware
} = require("./authenticationController");
const { user: globalUser } = require("./userTestUtils");

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
  test("validating credentials", async () => {
    expect(await credentialsAreValid(globalUser.username, "a_password")).toBe(
      true
    );
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
    const ctx = {
      request: {
        headers: { authorization: globalUser.authHeader }
      }
    };

    const next = jest.fn();
    await authenticationMiddleware(ctx, next);
    expect(next.mock.calls).toHaveLength(1);
  });
});
