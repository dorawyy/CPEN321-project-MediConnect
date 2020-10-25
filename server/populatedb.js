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

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const doctors = [];
const patients = [];

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
    doctors.push(doctor);
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
    patients.push(patient);
    cb(null, patient);
  });
}

function createDoctors(cb) {
  async.parallel(
    [
      function (callback) {
        doctorCreate(
          callback,
          "Alex",
          "Jones",
          "alexjones@gmail.com",
          "123456",
          46,
          "conspiracy",
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
          "123",
          57,
          "basketball",
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
          "pop",
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
          "president",
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
          "CPEN211",
          45,
          "FPGA",
          30
        );
      },
      function (callback) {
        doctorCreate(
          callback,
          "John",
          "Lennon",
          "johnlennon@gmail.com",
          "imagine",
          40,
          "softrock",
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
          "cartoon",
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
          "meme",
          7
        );
      },
    ],
    // optional callback
    cb
  );
}

function createPatients(cb) {
  async.parallel(
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
          "pass",
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
          "bigpw",
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
          "sdpw",
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
          "batman",
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

async.series(
  [createDoctors, createPatients],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Doctors: " + doctors);
      console.log("Patients: " + patients);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
