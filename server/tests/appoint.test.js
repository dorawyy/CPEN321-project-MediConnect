//require("dotenv").config();
const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");
const supertest = require("supertest");
const user = require("../controllers/userController");
const express = require("express");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const patientRouter = require("../routes/patientRoutes");
const doctorRouter = require("../routes/doctorRoutes");
const { initMongo, closeMongo } = require("../config/db");
const { forEach } = require("async");

const app = express();
app.use(express.json());
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);

beforeAll((done) => {
  initMongo();
  done();
});

afterAll((done) => {
  closeMongo();
  done();
});

jest.mock("../middleware/authMiddleware");

const { requireAuth } = require("../middleware/authMiddleware");

test("Expect to get all appointments of a patient", async () => {
  const res = await supertest(app).get("/patient/appointment/");
});
