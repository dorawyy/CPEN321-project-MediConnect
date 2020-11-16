require("dotenv").config();
const { ExpectationFailed, LengthRequired } = require("http-errors");
const { TestScheduler } = require("jest");
const supertest = require("supertest");
const user = require("../controllers/userController");
const express = require("express");
const fs = require("fs");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const User = require("../models/user");

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
jest.mock("../middleware/errMiddleware");

const { requireAuth } = require("../middleware/authMiddleware");
const { handleErrors } = require("../middleware/errMiddleware");
const { findById } = require("../models/user");
const { hasUncaughtExceptionCaptureCallback } = require("process");

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

test("Expect to get all doctors when making request to get a list of all doctors (no mocking)", async () => {
  const res = await supertest(app).get("/doctor/");
  expect(res.body.length).toBe(8);
  res.body.forEach((item) => {
    expect(item.userkey).toBe("Doctor");
    expect(item.age).toBeGreaterThanOrEqual(0);
    expect(typeof item.first_name).toBe("string");
    expect(typeof item.last_name).toBe("string");
    expect(item.years_of_experience).toBeGreaterThan(0);
    expect(typeof item.specialization).toBe("string");
  });
});

test("Expect to get patient with name John Smith when requesting patient with certain id (no mocking)", async () => {
  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).patients[0];
  const res = await supertest(app).get("/patient/" + id);
  expect(res.body.userkey).toBe("Patient");
  expect(res.body.age).toBe(30);
  expect(res.body._id).toBe(id);
  expect(res.body.first_name).toBe("John");
  expect(res.body.last_name).toBe("Smith");
  expect(res.body.gender).toBe("Male");
});

test("Expect to get error (denoted by 400 status) when the id is incorrect", async () => {
  const res = await supertest(app).get("/patient/vvvvvvvvvvvvvvvvvvvvvvvv");
  expect(res.status).toBe(400);
});

test("Expect to get doctor with name Alex Jones when requesting doctor with certain id (mocking auth)", async () => {
  requireAuth.mockImplementation((req, res, next) => {
    next();
  });

  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).doctors[0];

  const res = await supertest(app).get("/doctor/" + id);
  expect(res.body.userkey).toBe("Doctor");
  expect(res.body.age).toBe(46);
  expect(res.body._id).toBe(id);
  expect(res.body.first_name).toBe("Alex");
  expect(res.body.last_name).toBe("Jones");
  expect(res.body.specialization).toBe("Neurology");
});

test("Expect to get error (denoted by 400 status) when the id is incorrect", async () => {
  requireAuth.mockImplementation((req, res, next) => {
    next();
  });

  const res = await supertest(app).get("/doctor/rrrrrrrrrrrrrrrrrrrrrrrr");
  expect(res.status).toBe(400);
});

test("Expect to get list of patients with 1 item when making request to get a list of all patients", async () => {
  const getUserMock = jest.fn(async (req, res, model) =>
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
  const getUserMock = jest.fn(async (req, res, model) =>
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

test("Expect age of Lucy Stank to change from 22 to 50 and then back to 22", async () => {
  handleErrors.mockImplementation((err) => err);

  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).patients[4];

  var res = await supertest(app)
    .put("/patient/" + id)
    .send({
      weight: 50,
    });

  var lucy = await User.findById(id);
  expect(lucy.weight).toBe(50);
  expect(lucy.first_name).toBe("Lucy");
  expect(lucy.last_name).toBe("Stank");

  res = await supertest(app)
    .put("/patient/" + id)
    .send({
      weight: 40,
    });

  lucy = await User.findById(id);
  expect(lucy.weight).toBe(22);
  expect(lucy.first_name).toBe("Lucy");
  expect(lucy.last_name).toBe("Stank");
});

test("Expect no fields of Lucy Stank to change when request body has incorrect field(s)", async () => {
  handleErrors.mockImplementation((err) => err);

  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).patients[4];

  const res = await supertest(app)
    .put("/patient/" + id)
    .send({
      yage: 50,
    });

  const lucy = await User.findById(id);
  expect(lucy.age).toBe(22);
  expect(lucy.first_name).toBe("Lucy");
  expect(lucy.last_name).toBe("Stank");
  expect(lucy.gender).toBe("Female");
  expect(lucy.email).toBe("lucystank@gmail.com");
  expect(lucy.height).toBe(150);
  expect(lucy.weight).toBe(40);
  expect(res.status).toBe(200);
  expect(lucy.yage).toBe(undefined);
});

test("Expect to get error and no fields of any user get changed if id is invalid", async () => {
  handleErrors.mockImplementation((err) => err);

  const past = await Patient.find();

  const res = await supertest(app)
    .put("/patient/rrrrrrrrrrrrrrrrrrrrrrrr")
    .send({
      age: 50,
    });

  const patients = await Patient.find();

  for (i = 0; i < past.length; i++) {
    expect(patients[i].age).toBe(past[i].age);
  }
  expect(res.status).toBe(400);
});

test("Expect specialization of Tor Aamodt to change from Oncology to Neurology and back to Oncology", async () => {
  handleErrors.mockImplementation((err) => err);
  requireAuth.mockImplementation((req, res, next) => {
    next();
  });

  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).doctors[4];

  var res = await supertest(app)
    .put("/doctor/" + id)
    .send({
      specialization: "Neurology",
    });

  var doc = await User.findById(id);
  console.log(res.body);
  expect(doc.specialization).toBe("Neurology");
  expect(doc.first_name).toBe("Tor");
  expect(doc.last_name).toBe("Aamodt");

  res = await supertest(app)
    .put("/doctor/" + id)
    .send({
      specialization: "Oncology",
    });

  doc = await User.findById(id);
  expect(doc.specialization).toBe("Oncology");
  expect(doc.first_name).toBe("Tor");
  expect(doc.last_name).toBe("Aamodt");
});

test("Expect no fields of Tor Aamodt to change when request body has incorrect field(s)", async () => {
  handleErrors.mockImplementation((err) => err);
  requireAuth.mockImplementation((req, res, next) => {
    next();
  });

  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).doctors[4];

  const res = await supertest(app)
    .put("/doctor/" + id)
    .send({
      specializations: "Neurology",
    });

  const doc = await User.findById(id);
  expect(doc.specialization).toBe("Oncology");
  expect(doc.first_name).toBe("Tor");
  expect(doc.last_name).toBe("Aamodt");
  expect(doc.specializations).toBe(undefined);
  expect(res.status).toBe(200);
});

test("Expect Lucy Stank to get deleted from the database", async () => {
  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).patients[4];

  const doctors = await Doctor.find();

  const res = await supertest(app).delete("/patient/" + id);

  const patients = await Patient.find();
  expect(patients.length).toBe(7);
  patients.forEach((patient) => {
    expect(patient._id).not.toBe(id);
  });
  doctors.forEach((doctor) => {
    expect(doctor.appointments).not.toContain(id);
  });
});

test("Expect no patient to get deleted. Error is thrown (denoted by status 400) because of invalid id", async () => {
  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).patients[4];

  const res = await supertest(app).delete("/patient/" + id);

  const patients = await Patient.find();
  expect(patients.length).toBe(7);
  expect(res.status).toBe(400);
});

test("Expect Tor Aamodt to get deleted from the database", async () => {
  requireAuth.mockImplementation((req, res, next) => {
    next();
  });
  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).doctors[4];

  const patients = await Patient.find();

  const res = await supertest(app).delete("/doctor/" + id);

  const doctors = await Doctor.find();
  expect(doctors.length).toBe(7);
  doctors.forEach((doctor) => {
    expect(doctor._id).not.toBe(id);
  });
  patients.forEach((patient) => {
    expect(patient.appointments).not.toContain(id);
  });
});

test("Expect no doctor to get deleted. Error is thrown (denoted by status 400) because of invalid id", async () => {
  requireAuth.mockImplementation((req, res, next) => {
    next();
  });

  const data = fs.readFileSync("./public/data/dbArrays.json");
  const id = JSON.parse(data).doctors[4];

  const res = await supertest(app).delete("/doctor/" + id);

  const doctors = await Patient.find();
  expect(doctors.length).toBe(7);
  expect(res.status).toBe(400);
});
