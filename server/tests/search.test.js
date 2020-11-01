const { ExpectationFailed } = require("http-errors");
const jest = require("jest");
import { JsonWebTokenError } from "jsonwebtoken";
import {
  symptomToDisease,
  diseaseToSpecialization,
  findDoctor,
} from "../controllers/searchController";

jest.mock("../controllers/searchController");
symptomToDisease.mock.mockResolvedValue([]);
diseaseToSpecialization.mock.mockResolvedValue([]);

test("Expect findDoctor to return no doctors if no symptoms are sent", () => {
  expect(findDoctor).toBe([]);
});
