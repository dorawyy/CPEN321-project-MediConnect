const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");
const search = require("../controllers/searchController");

jest.mock("../controllers/searchController");
search.symptomToDisease.mock.mockResolvedValue([]);
search.diseaseToSpecialization.mock.mockResolvedValue([]);

test("Expect findDoctor to return no doctors if no symptoms are sent", () => {
  expect(search.findDoctor).toBe([]);
});
