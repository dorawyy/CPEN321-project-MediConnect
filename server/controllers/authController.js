const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

// Error handler
const handleErrors = (err) => {
  let errors = { first_name: "", last_name: "", email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already registed";
    return errors;
  }

  // validation errors
  if (err.message.includes("Patient validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

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
const signupUser = async (req, res, model, userObj) => {
  try {
    const newUser = await model.create(userObj);
    res.status(201).json(newUser);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

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

// Post a new patient to database through signup
const signupPatient = async (req, res) => {
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

  signupUser(req, res, Patient, {
    first_name,
    last_name,
    email,
    password,
    age,
    gender,
    height,
    weight,
  });
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

// Post a new patient to database through signup
const signupDoctor = async (req, res) => {
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

  signupUser(req, res, {
    first_name,
    last_name,
    email,
    password,
    age,
    specialization,
    years_of_experience,
    verified,
  });
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
  signupPatient,
  getPatientById,
  deletePatientById,
  getDoctors,
  signupDoctor,
  getDoctorById,
  deleteDoctorById,
};
