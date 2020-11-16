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

jest.mock("../middleware/errMiddleware");
const { handleAppointmentErrors } = require("../middleware/errMiddleware");

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
 * getAppointment testing
 */
test("Expect to get all appointments of a patient, successful case (no mocking needed)", async () => {
  const res = await supertest(app).get(`/patient/appointment/${patients[0]}`);
  expect(res.status).toBe(200);
  expect(res.body.appointments.length).toBe(4);
  res.body.appointments.forEach((appointment) => {
    expect(appointment.patientId).toBe(patients[0]);
    expect(appointments).toContain(appointment._id);
  });
});

test("Expect to get appointment of patient that doesn't exist (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    if (err.message === "Invalid user ID") {
      errors.patient = "User account doesn't exist";
      errors.doctor = "User account doesn't exist";
    }
    return errors;
  });

  const nonexistentID = "5fb2174dc36ef26be53f5b00";
  const res = await supertest(app).get(`/patient/appointment/${nonexistentID}`);
  expect(res.status).toBe(400);
  expect(res.body.patient).toBe("User account doesn't exist");
});

test("Expect to get appointment of patient with invalid ID (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  const nonexistentID = "0";
  const res = await supertest(app).get(`/patient/appointment/${nonexistentID}`);
  expect(res.status).toBe(400);
  expect(res.body._id).toBe(
    'Cast to ObjectId failed for value "0" at path "_id" for model "User"'
  );
});

// getAppointment testing for doctors
test("Expect to get all appointments of a doctor, successful case (no mocking)", async () => {
  const res = await supertest(app).get(`/doctor/appointment/${doctors[0]}`);
  expect(res.status).toBe(200);
  expect(res.body.appointments.length).toBe(6);
  res.body.appointments.forEach((appointment) => {
    expect(appointment.doctorId).toBe(doctors[0]);
    expect(appointments).toContain(appointment._id);
  });
});

test("Expect to get appointment of doctor that doesn't exist (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    if (err.message === "Invalid user ID") {
      errors.patient = "User account doesn't exist";
      errors.doctor = "User account doesn't exist";
    }
    return errors;
  });

  const nonexistentID = "5fb2174dc36ef26be53f5b00";
  const res = await supertest(app).get(`/doctor/appointment/${nonexistentID}`);
  expect(res.status).toBe(400);
  expect(res.body.doctor).toBe("User account doesn't exist");
});

test("Expect to get appointment of doctor with invalid ID (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  const nonexistentID = "0";
  const res = await supertest(app).get(`/doctor/appointment/${nonexistentID}`);
  expect(res.status).toBe(400);
  expect(res.body._id).toBe(
    'Cast to ObjectId failed for value "0" at path "_id" for model "User"'
  );
});

/**
 * postAppointment testing
 */
test("Expect to post valid appointment for patient (no mocking needed)", async () => {
  const appointmentFields = {
    patientId: patients[0],
    doctorId: doctors[0],
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  const res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(200);

  // checking whether appointment was actually added to patient and doctor appointment array
  // at the correct spot
  const patient = await Patient.findById(patients[0]).populate("appointments");
  const doctor = await Doctor.findById(doctors[0]).populate("appointments");
  expect(patient.appointments.length).toBe(5);
  expect(doctor.appointments.length).toBe(7);
  let addedToPatient = false;
  let addedToDoctor = false;
  if (String(patient.appointments[2]._id) === String(res.body.appointment)) {
    addedToPatient = true;
  }
  if (String(doctor.appointments[2]._id) === String(res.body.appointment)) {
    addedToDoctor = true;
  }
  expect(addedToPatient && addedToDoctor).toBe(true);

  // get the appointment from database, check whether its valid, and then delete it
  const appointment = await Appointment.findById(res.body.appointment)
    .populate("patientId")
    .populate("doctorId");
  expect(String(appointment.patientId._id)).toBe(patients[0]);
  expect(String(appointment.doctorId._id)).toBe(doctors[0]);

  appointment.patientId.appointments.pull({ _id: res.body.appointment });
  appointment.doctorId.appointments.pull({ _id: res.body.appointment });
  await appointment.patientId.save();
  await appointment.doctorId.save();
  await appointment.deleteOne();
});

test("Expect to post appointment with invalid IDs (mocking handleAppontmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  let appointmentFields = {
    patientId: "0",
    doctorId: doctors[0],
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body._id).toBe(
    'Cast to ObjectId failed for value "0" at path "_id" for model "Patient"'
  );

  appointmentFields = {
    patientId: patients[0],
    doctorId: "0",
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body._id).toBe(
    'Cast to ObjectId failed for value "0" at path "_id" for model "Doctor"'
  );
});

test("Expected to post appointment with non dates (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  let appointmentFields = {
    patientId: patients[0],
    doctorId: doctors[0],
    start_time: "NOT A DATE",
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.start_time).toBe(
    'Cast to date failed for value "NOT A DATE" at path "start_time"'
  );

  appointmentFields = {
    patientId: patients[0],
    doctorId: doctors[0],
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: "NOT A DATE",
  };
  res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.end_time).toBe(
    'Cast to date failed for value "NOT A DATE" at path "end_time"'
  );
});

test("Expected to post appointment with missing fields (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  let appointmentFields = {
    patientId: patients[0],
    doctorId: doctors[0],
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.start_time).toBe("Please enter start time");

  appointmentFields = {
    patientId: patients[0],
    doctorId: doctors[0],
    start_time: new Date(2020, 11, 21, 14, 0),
  };
  res = await supertest(app)
    .post("/patient/appointment")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.end_time).toBe("Please enter end time");
});

/**
 * putAppointment testing
 */
test("Expect to put valid appointment for patient (no mocking needed)", async () => {
  let appointmentFields = {
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .put(`/patient/appointment/${appointments[0]}`)
    .send(appointmentFields);
  expect(res.status).toBe(200);

  // checking whether appointment was actually updated in patient and doctor appointment array
  // from position 0 to 1
  let patient = await Patient.findById(patients[0]).populate("appointments");
  let doctor = await Doctor.findById(doctors[0]).populate("appointments");
  expect(patient.appointments.length).toBe(4);
  expect(doctor.appointments.length).toBe(6);
  let addedToPatient = false;
  let addedToDoctor = false;
  if (String(patient.appointments[1]._id) === String(appointments[0])) {
    addedToPatient = true;
  }
  if (String(doctor.appointments[1]._id) === String(appointments[0])) {
    addedToDoctor = true;
  }
  expect(addedToPatient && addedToDoctor).toBe(true);

  appointmentFields = {
    start_time: new Date(2020, 11, 20, 11, 0),
    end_time: new Date(2020, 11, 20, 12, 0),
  };
  res = await supertest(app)
    .put(`/patient/appointment/${appointments[0]}`)
    .send(appointmentFields);
  expect(res.status).toBe(200);

  // checking whether appointment was actually updated in patient and doctor appointment array
  // from position 1 to 0
  patient = await Patient.findById(patients[0]).populate("appointments");
  doctor = await Doctor.findById(doctors[0]).populate("appointments");
  expect(patient.appointments.length).toBe(4);
  expect(doctor.appointments.length).toBe(6);
  addedToPatient = false;
  addedToDoctor = false;
  if (String(patient.appointments[0]._id) === String(appointments[0])) {
    addedToPatient = true;
  }
  if (String(doctor.appointments[0]._id) === String(appointments[0])) {
    addedToDoctor = true;
  }
  expect(addedToPatient && addedToDoctor).toBe(true);
});

test("Expect to put appointment with invalid ID (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // incorrect appointment ID
    if (err.message === "Invalid appointment ID") {
      errors.start_time = "Appointment doesn't exist";
      errors.end_time = "Appointment doesn't exist";
    }
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  let appointmentFields = {
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .put("/patient/appointment/0")
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body._id).toBe(
    'Cast to ObjectId failed for value "0" at path "_id" for model "Appointment"'
  );

  const nonexistentID = "5fb2174dc36ef26be53f5b00";
  res = await supertest(app)
    .put(`/patient/appointment/${nonexistentID}`)
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.start_time).toBe("Appointment doesn't exist");
  expect(res.body.end_time).toBe("Appointment doesn't exist");
});

test("Expect to put appointment with non dates (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  let appointmentFields = {
    start_time: "NOT A DATE",
    end_time: new Date(2020, 11, 21, 15, 0),
  };
  let res = await supertest(app)
    .put(`/patient/appointment/${appointments[0]}`)
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.start_time).toBe(
    'Cast to date failed for value "NOT A DATE" at path "start_time"'
  );

  appointmentFields = {
    start_time: new Date(2020, 11, 21, 14, 0),
    end_time: "NOT A DATE",
  };
  res = await supertest(app)
    .put(`/patient/appointment/${appointments[0]}`)
    .send(appointmentFields);
  expect(res.status).toBe(400);
  expect(res.body.end_time).toBe(
    'Cast to date failed for value "NOT A DATE" at path "end_time"'
  );
});

/**
 * deleteAppointment testing
 */
test("Expected to delete existing appointment twice, and delete appointment with invalid ID (mocking handleAppointmentErrors)", async () => {
  handleAppointmentErrors.mockImplementation((err) => {
    let errors = {};
    // incorrect appointment ID
    if (err.message === "Invalid appointment ID") {
      errors.start_time = "Appointment doesn't exist";
      errors.end_time = "Appointment doesn't exist";
    }
    // validation errors
    if (err.message.includes("Appointment validation failed")) {
      Object.values(err.errors).forEach((error) => {
        if (error.name === "CastError") {
          errors[error.path] = error.message;
        } else {
          errors[error.path] = error.message;
        }
      });
    }
    // CastError
    if (err.name === "CastError") {
      errors[err.path] = err.message;
    }
    return errors;
  });

  let res = await supertest(app).delete(
    `/patient/appointment/${appointments[0]}`
  );
  expect(res.status).toBe(200);
  expect(res.body.message).toBe("Delete appointment successful");
  let patient = await Patient.findById(patients[0]).populate("appointments");
  let doctor = await Doctor.findById(doctors[0]).populate("appointments");
  expect(patient.appointments.length).toBe(3);
  expect(doctor.appointments.length).toBe(5);
  addedToPatient = false;
  addedToDoctor = false;
  if (String(patient.appointments[0]._id) === String(appointments[0])) {
    addedToPatient = true;
  }
  if (String(doctor.appointments[0]._id) === String(appointments[0])) {
    addedToDoctor = true;
  }
  expect(addedToPatient || addedToDoctor).toBe(false);

  // deleting same appointment again, appointment shouldn't exist
  res = await supertest(app).delete(`/patient/appointment/${appointments[0]}`);
  expect(res.status).toBe(400);
  expect(res.body.start_time).toBe("Appointment doesn't exist");
  expect(res.body.end_time).toBe("Appointment doesn't exist");
  console.log(res.body);

  // deleting appointment with invalid ID
  res = await supertest(app).delete("/patient/appointment/0");
  expect(res.status).toBe(400);
  expect(res.body._id).toBe(
    'Cast to ObjectId failed for value "0" at path "_id" for model "Appointment"'
  );
});
