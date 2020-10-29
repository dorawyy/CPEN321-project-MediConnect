/*
 * Module for controlling routes that handle user database operations such
 * as getting, posting, putting, and deleting user fields/entries from database
 */

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const { handleErrors } = require("../middleware/errMiddleware");

/*
 * Common functions for all users (patients and doctors), the type of user
 * is specified by the model parameter
 */

// Get list of all users
const getUser = (req, res, model) => {
  model
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

// Get user by id
const getUserById = (req, res, model) => {
  const id = req.params.id;

  model
    .findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

// Put user by id
const putUserById = (req, res, model) => {
  const id = req.params.id;

  model
    .findByIdAndUpdate(id, req.body, { runValidators: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      const errors = handleErrors(err);
      res.status(400).json(errors);
    });
};

// Delete user by id
const deleteUserById = (req, res, model) => {
  const id = req.params.id;

  model
    .findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json({ message: "Delete successful" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

/*
 * Controller functions for patient routes and doctor routes. Usually call
 * common handler functions "User"
 */

// Get list of all patients
const getPatients = (req, res) => {
  getUser(req, res, Patient);
};

// Get patient by id
const getPatientById = (req, res) => {
  getUserById(req, res, Patient);
};

// Put patient by id
const putPatientById = (req, res) => {
  putUserById(req, res, Patient);
};

// Delete patient by id
const deletePatientById = (req, res) => {
  deleteUserById(req, res, Patient);
};

// Get list of all doctors
const getDoctors = (req, res) => {
  getUser(req, res, Doctor);
};

// Get doctor by id
const getDoctorById = (req, res) => {
  getUserById(req, res, Doctor);
};

// Put doctor by id
const putDoctorById = (req, res) => {
  putUserById(req, res, Doctor);
};

// Delete doctor by id
const deleteDoctorById = (req, res) => {
  deleteUserById(req, res, Doctor);
};

module.exports = {
  getPatients,
  getPatientById,
  putPatientById,
  deletePatientById,
  getDoctors,
  getDoctorById,
  putDoctorById,
  deleteDoctorById,
};
