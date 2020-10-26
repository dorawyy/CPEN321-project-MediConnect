const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

/*
 * Common functions for all users (patients and doctors), the type of user
 * is specified by the model parameter
 */

// Get list of all users
const getUser = (req, res, model) => {
  model
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Register user in database. User must have provided legal parameters
const registerUser = (req, res, model) => {};

// Get user by id
const getUserById = (req, res, model) => {
  const id = req.params.id;

  model
    .findById(id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

// Delete user by id
const deleteUserById = (req, res, model) => {
  const id = req.params.id;

  model
    .findByIdAndDelete(id)
    .then((result) => res.send("Delete successful"))
    .catch((err) => console.log(err));
};

/*
 * Controller functions for patient routes and doctor routes. Usually call
 * common handler functions "User"
 */

// Get list of all patients
const getPatients = (req, res) => {
  getUser(req, res, Patient);
};

const registerPatient = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    age,
    gender,
    height,
    weight,
  } = req.body;

  try {
    const newPatient = await Patient.create({
      first_name,
      last_name,
      email,
      password,
      age,
      gender,
      height,
      weight,
    });
    res.status(201).json(newPatient);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, patient not created");
  }
  //registerUser(req, res, Patient);
};

// Get patient by id
const getPatientById = (req, res) => {
  getUserById(req, res, Patient);
};

// Delete patient by id
const deletePatientById = (req, res) => {
  deleteUserById(req, res, Patient);
};

// Get list of all doctors
const getDoctors = (req, res) => {
  getUser(req, res, Doctor);
};

const registerDoctor = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    age,
    specialization,
    years_of_experience,
    verified,
  } = req.body;

  try {
    const newDoctor = await Doctor.create({
      first_name,
      last_name,
      email,
      password,
      age,
      specialization,
      years_of_experience,
      verified,
    });
    res.status(201).json(newDoctor);
  } catch (err) {
    console.log(err);
    res.status(400).send("error, doctor not created");
  }
  //registerUser(req, res, Doctor);
};

// Get doctor by id
const getDoctorById = (req, res) => {
  getUserById(req, res, Doctor);
};

// Delete patient by id
const deleteDoctorById = (req, res) => {
  deleteUserById(req, res, Doctor);
};

module.exports = {
  getPatients,
  registerPatient,
  getPatientById,
  deletePatientById,
  getDoctors,
  registerDoctor,
  getDoctorById,
  deleteDoctorById,
};
