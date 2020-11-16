#! /usr/bin/env node

console.log(
  "This script populates your database with entries for doctors and patients"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Doctor = require("./models/doctor");
const Patient = require("./models/patient");
const Appointment = require("./models/appointment");
const fs = require("fs");

const mongoose = require("mongoose");
const app = require("./app");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const doctors = [];
const patients = [];
const appointments = [];

function doctorCreate(
  cb,
  first_name,
  last_name,
  email,
  pw,
  age,
  specialization,
  years_of_exp,
  verified = false
) {
  const doctorDetails = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: pw,
    age: age,
    specialization: specialization,
    years_of_experience: years_of_exp,
    verified: verified,
  };

  const doctor = new Doctor(doctorDetails);

  doctor.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Doctor: " + doctor);
    doctors.push(doctor._id);
    cb(null, doctor);
  });
}

function patientCreate(
  cb,
  first_name,
  last_name,
  email,
  pw,
  age,
  gender,
  height,
  weight
) {
  const patientDetails = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: pw,
    age: age,
    gender: gender,
    height: height,
    weight: weight,
  };

  const patient = new Patient(patientDetails);

  patient.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Patient: " + patient);
    patients.push(patient._id);
    cb(null, patient);
  });
}

const binarySearch = (array, value) => {
  let low = 0;
  let high = array.length;

  while (low < high) {
    let mid = (low + high) >>> 1;
    if (array[mid].start_time < value) low = mid + 1;
    else high = mid;
  }

  return low;
};

async function appointmentCreate(
  cb,
  patientIndex,
  doctorIndex,
  start_time,
  end_time
) {
  const patientId = patients[patientIndex];
  const doctorId = doctors[doctorIndex];

  const appointmentDetails = {
    patientId: patientId,
    doctorId: doctorId,
    start_time: start_time,
    end_time: end_time,
  };

  // if patient or doctor ID is not valid, do not proceed
  const patient = await Patient.findById(patientId).populate("appointments");
  const doctor = await Doctor.findById(doctorId).populate("appointments");

  const newAppointment = await Appointment.create(appointmentDetails);

  // add new appointment to patient and doctor appointments in sorted order
  patient.appointments.splice(
    binarySearch(patient.appointments, newAppointment.start_time),
    0,
    newAppointment
  );
  doctor.appointments.splice(
    binarySearch(doctor.appointments, newAppointment.start_time),
    0,
    newAppointment
  );
  await patient.save();
  await doctor.save();

  console.log("New appointment: " + newAppointment);
  appointments.push(newAppointment._id);
  cb(null, newAppointment);
}

function createDoctors(cb) {
  async.series(
    [
      function (callback) {
        doctorCreate(
          callback,
          "Alex",
          "Jones",
          "alexjones@gmail.com",
          "12345678",
          46,
          "Neurology",
          20,
          true
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "Michael",
          "Jordan",
          "micjordan@gmail.com",
          "abcdefghi",
          57,
          "Neurology",
          10
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "Michael",
          "Jackson",
          "micjackson@gmail.com",
          "thriller",
          50,
          "Gynecology",
          5
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "Donald",
          "Drumpf",
          "donalddrumpf@gmail.com",
          "makedonalddrumpfagain",
          74,
          "Internal medicine",
          40,
          true
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "Tor",
          "Aamodt",
          "toraamodt@gmail.com",
          "CPEN211HELL",
          45,
          "Oncology",
          30
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "John",
          "Lennon",
          "johnlennon@gmail.com",
          "imaginetheresnoheaven",
          40,
          "Pulmonology",
          2
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "Mickey",
          "Mouse",
          "mickeymouse@gmail.com",
          "talkingrat",
          100,
          "Oncology",
          70,
          true
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "Rick",
          "Astley",
          "rickastley@gmail.com",
          "nevergonnagiveyouup",
          54,
          "Psychiatry",
          7
        );
      },
    ],
    // optional callback
    cb
  );
}

function createPatients(cb) {
  async.series(
    [
      function (callback) {
        patientCreate(
          callback,
          "John",
          "Smith",
          "johnsmith@gmail.com",
          "password",
          30,
          "Male",
          180,
          80
        );
      },
      function (callback) {
        patientCreate(
          callback,
          "Mary",
          "Joe",
          "maryjoe@gmail.com",
          "password",
          30,
          "Female",
          170,
          60
        );
      },
      function (callback) {
        patientCreate(
          callback,
          "Sam",
          "Sung",
          "samsung@gmail.com",
          "password",
          20,
          "Male",
          175,
          60
        );
      },
      function (callback) {
        patientCreate(
          callback,
          "Kyle",
          "Red",
          "kylered@gmail.com",
          "passlmao",
          12,
          "Male",
          160,
          50
        );
      },
      function (callback) {
        patientCreate(
          callback,
          "Lucy",
          "Stank",
          "lucystank@gmail.com",
          "bigpwpwpw",
          22,
          "Female",
          150,
          40
        );
      },
      function (callback) {
        patientCreate(
          callback,
          "Susan",
          "Doyle",
          "susandoyle@gmail.com",
          "sdpwsdpw",
          40,
          "Female",
          165,
          70
        );
      },
      function (callback) {
        patientCreate(
          callback,
          "Cpt",
          "Jack",
          "cptjack@gmail.com",
          "ayeayecpt",
          29,
          "Male",
          175,
          70
        );
      },
      function (callback) {
        patientCreate(
          callback,
          "Bruce",
          "Wayne",
          "brucewayne@gmail.com",
          "batmanishere",
          40,
          "Male",
          185,
          80
        );
      },
    ],
    // optional callback
    cb
  );
}

function createAppointments(cb) {
  async.series(
    [
      function (callback) {
        appointmentCreate(
          callback,
          0,
          0,
          new Date(2020, 11, 20, 11, 0),
          new Date(2020, 11, 20, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          1,
          0,
          new Date(2020, 11, 21, 11, 0),
          new Date(2020, 11, 21, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          2,
          0,
          new Date(2020, 11, 22, 11, 0),
          new Date(2020, 11, 22, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          3,
          1,
          new Date(2020, 11, 20, 11, 0),
          new Date(2020, 11, 20, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          0,
          1,
          new Date(2020, 11, 21, 11, 0),
          new Date(2020, 11, 21, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          0,
          2,
          new Date(2020, 11, 22, 11, 0),
          new Date(2020, 11, 22, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          3,
          0,
          new Date(2020, 11, 23, 11, 0),
          new Date(2020, 11, 23, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          0,
          0,
          new Date(2020, 11, 24, 11, 0),
          new Date(2020, 11, 24, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          5,
          5,
          new Date(2020, 11, 24, 11, 0),
          new Date(2020, 11, 24, 12, 0)
        );
      },
      function (callback) {
        appointmentCreate(
          callback,
          5,
          0,
          new Date(2020, 11, 26, 11, 0),
          new Date(2020, 11, 26, 12, 0)
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createDoctors, createPatients, createAppointments],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Done populating!");
    }
    // All done, disconnect from database
    mongoose.connection.close();

    const dbArrays = {
      patients: patients,
      doctors: doctors,
      appointments: appointments,
    };
    fs.writeFile(
      "./public/data/dbArrays.json",
      JSON.stringify(dbArrays),
      (err) => {
        if (err) console.log("Writing to JSON err " + err);
        else console.log("Completed writing to JSON");
      }
    );
  }
);

module.exports = {
  getArrays: function () {
    return doctors, patients;
  },
};
