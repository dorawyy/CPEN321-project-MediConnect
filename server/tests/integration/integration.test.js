require("dotenv").config();
const { ExpectationFailed } = require("http-errors");
const { TestScheduler } = require("jest");
const cookieParser = require("cookie-parser");
const fs = require("fs").promises;
const supertest = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const Doctor = require("../../models/doctor");
const Patient = require("../../models/patient");
const Appointment = require("../../models/appointment");

const patientRouter = require("../../routes/patientRoutes");
const doctorRouter = require("../../routes/doctorRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);

jest.mock("../../middleware/authMiddleware");
const { requireAuth } = require("../../middleware/authMiddleware");

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

/**
 * User tries to sign up
 */
test("User tries to sign up", async () => {
  let userFields = {
    first_name: "firstName",
    last_name: "lastName",
    email: "firstName@gmail.com",
    password: "12345678",
  };
  let res = await supertest(app).post("patient/signup").send(userFields);
  expect(res.status).toBe(201);

  // email already registered
  res = await supertest(app).post("patient/signup").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.email).toBe("Email already registered");

  // email invalid
  userFields = {
    first_name: "firstName",
    last_name: "lastName",
    email: "firstName.com",
    password: "12345678",
  };
  res = await supertest(app).post("patient/signup").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.email).toBe("Please enter valid email");

  // password less than 8 characters
  userFields = {
    first_name: "firstName",
    last_name: "lastName",
    email: "firstName.com",
    password: "123678",
  };
  res = await supertest(app).post("patient/signup").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.password).toBe("Password must be at least 8 characters long");

  userFields = {
    first_name: "firstName",
    email: "firstName.com",
    password: "123678",
  };
  res = await supertest(app).post("patient/signup").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.last_name).toBe("Please enter your last name");
});

/**
 * User tries to sign in
 */
test("User tries to sign in", async () => {
  let userFields = {
    email: "firstName@gmail.com",
    password: "12345678",
  };
  let res = await supertest(app).post("patient/signin").send(userFields);
  expect(res.status).toBe(200);

  // password incorrect
  userFields = {
    email: "firstName@gmail.com",
    password: "12345679",
  };
  res = await supertest(app).post("patient/signin").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.password).toBe("That password is incorrect");

  // Please enter a password
  userFields = {
    email: "firstName@gmail.com",
  };
  res = await supertest(app).post("patient/signin").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.password).toBe("Please enter a password");

  // Please enter a password
  userFields = {
    password: "12345679",
  };
  res = await supertest(app).post("patient/signin").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.email).toBe("Please enter a email");

  // Email is not registered
  userFields = {
    email: "firstNameName@gmail.com",
    password: "12345678",
  };
  res = await supertest(app).post("patient/signin").send(userFields);
  expect(res.status).toBe(400);
  expect(res.body.email).toBe("Email is not registered");
});

/**
 * User tries to make a new appointment
 */
test("User tries to make a new appointment, successful case and longer than 1 day case", async () => {
  let appointmentFields = {
    patientId: patients[3],
    doctorId: doctors[1],
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(200);

  // checking whether appointment was actually added to patient and doctor appointment array
  // at the correct spot
  const patient = await Patient.findById(patients[3]).populate("appointments");
  const doctor = await Doctor.findById(doctors[1]).populate("appointments");
  expect(patient.appointments.length).toBe(3);
  expect(doctor.appointments.length).toBe(3);
  let addedToPatient = false;
  let addedToDoctor = false;
  if (String(patient.appointments[1]._id) === String(res.body.appointment)) {
    addedToPatient = true;
  }
  if (String(doctor.appointments[2]._id) === String(res.body.appointment)) {
    addedToDoctor = true;
  }
  expect(addedToPatient && addedToDoctor).toBe(true);

  // input start_time and end_time more than 1 day apart
  appointmentFields = {
    patientId: patients[3],
    doctorId: doctors[1],
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 22, 15, 0),
  };
  res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Appointments cannot be longer than 1 day");
});

test("User tries to make appointment, past case and delete case", async () => {
  let appointmentFields = {
    patientId: patients[3],
    doctorId: doctors[1],
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .post("/doctor/signin")
    .send({ email: "micjordan@gmail.com", password: "abcdefghi" });
  expect(res.status).toBe(200);

  const cookie = res.headers["set-cookie"];
  res = await supertest(app)
    .delete(`/doctor/${doctors[1]}`)
    .set("Cookie", `jwt=${cookie};`);
  expect(res).toBe(200);
  expect(res.body.message).toBe("Delete doctor account successful");

  res = await supertest(app)
    .post("/patient/appointment/")
    .send(appointmentFields);
  expect(res).toBe(400);
  expect(res.body.message).toBe("Appointment doesn't exist");

  // input start_time and end_time is in the past
  appointmentFields = {
    patientId: patients[3],
    doctorId: doctors[2],
    start_time: new Date(2010, 11, 21, 14, 0),
    end_time: new Date(2010, 11, 22, 15, 0),
  };
  res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Must make future appointments");
});

test("User tries to update appointment, successful case and longer than 1 day case", async () => {
  let appointmentFields = {
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .put(`/patient/appointment/${appointments[5]}`)
    .send(appointmentFields);
  expect(res.status).toBe(200);

  // checking whether appointment was actually added to patient and doctor appointment array
  // at the correct spot
  const patient = await Patient.findById(patients[0]).populate("appointments");
  const doctor = await Doctor.findById(doctors[0]).populate("appointments");
  expect(patient.appointments.length).toBe(1);
  expect(doctor.appointments.length).toBe(1);
  let addedToPatient = false;
  let addedToDoctor = false;
  if (String(patient.appointments[0]._id) === String(res.body.appointment)) {
    addedToPatient = true;
  }
  if (String(doctor.appointments[0]._id) === String(res.body.appointment)) {
    addedToDoctor = true;
  }
  expect(addedToPatient || addedToDoctor).toBe(false);

  // input start_time and end_time more than 1 day apart
  appointmentFields = {
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 22, 15, 0),
  };
  res = await supertest(app)
    .put(`/patient/appointment/${appointments[8]}`)
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Appointments cannot be longer than 1 day");
});

test("User tries to update appointment, past case and delete case", async () => {
  let appointmentFields = {
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .post("/doctor/signin")
    .send({ email: "micjackson@gmail.com", password: "thriller" });
  expect(res.status).toBe(200);

  const cookie = res.headers["set-cookie"];
  res = await supertest(app)
    .delete(`/doctor/${doctors[1]}`)
    .set("Cookie", `jwt=${cookie};`);
  expect(res).toBe(200);
  expect(res.body.message).toBe("Delete doctor account successful");

  res = await supertest(app)
    .put(`/patient/appointment/${appointments[5]}`)
    .send(appointmentFields);
  expect(res).toBe(400);
  expect(res.body.message).toBe("Appointment doesn't exist");

  // input start_time and end_time is in the past
  appointmentFields = {
    start_time: new Date(2010, 11, 21, 14, 0),
    end_time: new Date(2010, 11, 22, 15, 0),
  };
  res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.message).toBe("Must make future appointments");
});
