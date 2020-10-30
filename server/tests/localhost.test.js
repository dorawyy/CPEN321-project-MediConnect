const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");

test("Expect true to be true", () => {
  expect(true).toBe(true);
});
