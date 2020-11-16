require("dotenv").config();
const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");
const fs = require("fs").promises;
const supertest = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Appointment = require("../models/appointment");

const patientRouter = require("../routes/patientRoutes");
const doctorRouter = require("../routes/doctorRoutes");

const app = express();
app.use(express.json());
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);

let patients = [];
let doctors = [];
let appointments = [];

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
