beforeAll(() => {
  jest.spyOn(global.console, "error").mockImplementation(msg => {
    const failedPropTypeRegex = /Warning: Failed prop type/;
    if (failedPropTypeRegex.test(msg)) throw new Error(msg);
  });
});
