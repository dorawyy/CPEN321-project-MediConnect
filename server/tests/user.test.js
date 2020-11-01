require("dotenv").config();
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

beforeEach((done) => {
  initMongo();
  done();
});

afterEach((done) => {
  closeMongo();
  done();
});

test("Expect to get all patients when making request to get a list of all patients (no mocking)", async () => {
  const res = await supertest(app).get("/patient/");
  expect(res.body.length).toBe(8);
  res.body.forEach((item) => {
    expect(item.userkey).toBe("Patient");
    expect(item.age).toBeGreaterThanOrEqual(0);
    expect(typeof item.first_name).toBe("string");
    expect(typeof item.last_name).toBe("string");
    expect(typeof item.gender).toBe("string");
  });
});

test("Expect to get 1 patient when making request to get a list of all patients", async () => {
  getUserMock = jest.fn(async (req, res, model) =>
    model === Doctor
      ? res.status(200).json([])
      : model === Patient
      ? res.status(200).json([
          {
            appointments: [],
            userkey: "Patient",
            _id: "5f9ce563b761fe125cece98e",
            first_name: "Mary",
            last_name: "Joe",
            email: "maryjoe@gmail.com",
            password:
              "$2a$10$MBWwvXEaojmr76GOwhcq1Ob5jd9WzdURxBv/lEdQ6FYuV5hI61BR2",
            age: 30,
            gender: "Female",
            height: 170,
            weight: 60,
            createdAt: "2020-10-31T04:17:39.398Z",
            updatedAt: "2020-10-31T04:17:39.398Z",
            __v: 0,
          },
        ])
      : res.status(400)
  );

  user.getUser = getUserMock;

  const res = await supertest(app).get("/patient/");
  expect(res.body.length).toBe(1);
  expect(res.body[0].userkey).toBe("Patient");
  expect(res.body[0].first_name).toBe("Mary");
  expect(res.body[0].last_name).toBe("Joe");

  expect(getUserMock.mock.calls.length).toBe(1);
});

test("Expect to get no doctors when making request to get a list of all doctors", async () => {
  getUserMock = jest.fn(async (req, res, model) =>
    model === Doctor
      ? res.status(200).json([])
      : model === Patient
      ? res.status(200).json([
          {
            appointments: [],
            userkey: "Patient",
            _id: "5f9ce563b761fe125cece98e",
            first_name: "Mary",
            last_name: "Joe",
            email: "maryjoe@gmail.com",
            password:
              "$2a$10$MBWwvXEaojmr76GOwhcq1Ob5jd9WzdURxBv/lEdQ6FYuV5hI61BR2",
            age: 30,
            gender: "Female",
            height: 170,
            weight: 60,
            createdAt: "2020-10-31T04:17:39.398Z",
            updatedAt: "2020-10-31T04:17:39.398Z",
            __v: 0,
          },
        ])
      : res.status(400)
  );

  user.getUser = getUserMock;

  const res = await supertest(app).get("/doctor/");
  expect(res.body.length).toBe(0);
  expect(getUserMock.mock.calls.length).toBe(1);
});
