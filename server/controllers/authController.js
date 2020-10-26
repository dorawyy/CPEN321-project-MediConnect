const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");

// Error handler
const handleErrors = (err) => {
  let errors = { first_name: "", last_name: "", email: "", password: "" };

  // incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "that email is not registered";
  }

  // incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "that password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already registed";
    return errors;
  }

  // validation errors
  if (
    err.message.includes("Patient validation failed") ||
    err.message.includes("Doctor validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "mediconnect sneaky secret", { expiresIn: maxAge });
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
    const token = createToken(newUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: newUser._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

// Login user. User must have provided legal parameters
const loginUser = async (req, res, model) => {
  const { email, password } = req.body;

  try {
    const user = await model.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

// Logout user
const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Logout successful" });
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
    .then((result) => res.status(200).json({ message: "Delete successful" }))
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
const signupPatient = (req, res) => {
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

// Post a patient login
const loginPatient = (req, res) => {
  loginUser(req, res, Patient);
};

// Get patient logout
const logoutPatient = (req, res) => {
  logoutUser(req, res);
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

// Post a new doctor to database through signup
const signupDoctor = (req, res) => {
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

  signupUser(req, res, Doctor, {
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

// Post a doctor login
const loginDoctor = (req, res) => {
  loginUser(req, res, Doctor);
};

// Get doctor logout
const logoutDoctor = (req, res) => {
  logoutUser(req, res);
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
  loginPatient,
  logoutPatient,
  getPatientById,
  deletePatientById,
  getDoctors,
  signupDoctor,
  loginDoctor,
  logoutDoctor,
  getDoctorById,
  deleteDoctorById,
};
