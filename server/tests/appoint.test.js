require("dotenv").config();
const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");
const fs = require("fs").promises;
const supertest = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const patientRouter = require("../routes/patientRoutes");
const doctorRouter = require("../routes/doctorRoutes");

const app = express();
app.use(express.json());
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);

let patients = [];
let doctors = [];
let appointments = [];
let invalidID;

beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const data = await fs.readFile("./public/data/dbArrays.json");
  const jsonData = JSON.parse(data);
  patients = jsonData.patients;
  doctors = jsonData.doctors;
  appointments = jsonData.appointments;
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Expect to get all appointments of a patient, successful case (no mocking)", async () => {
  const res = await supertest(app).get(`/patient/appointment/${patients[0]}`);
  expect(res.status).toBe(200);
  expect(res.body.appointments.length).toBe(4);
  res.body.appointments.forEach((appointment) => {
    expect(appointment.patientId).toBe(patients[0]);
  });
});

test("Expect to get appointment of patient that doesn't exist, (no mocking)", async () => {});
