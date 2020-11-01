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
const getUser = async (req, res, model) => {
  try {
    const users = await model.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Get user by id
const getUserById = async (req, res, model) => {
  const id = req.params.id;

  try {
    const user = await model.findById(id);
    if (!user) throw Error("Invalid user ID");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Put user by id
const putUserById = async (req, res, model) => {
  const id = req.params.id;

  try {
    await model.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.status(200).json({ user: id });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

/*
 * Controller functions for patient routes and doctor routes. Usually call
 * common handler functions "User"
 */

// Get list of all patients
const getPatients = (req, res) => {
  module.exports.getUser(req, res, Patient);
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
const deletePatientById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Patient.findById(id).populate("appointments");
    if (!user) throw Error("Invalid user ID");

    // delete all appointments and remove from other user's appointment array
    for (let i = user.appointments.length - 1; i >= 0; i--) {
      const doctor = await Doctor.findById(user.appointments[i].doctorId);
      doctor.appointments.pull({ _id: user.appointments[i]._id });
      await user.appointments[i].deleteOne();
      await doctor.save();
    }
    await user.deleteOne();

    res.status(200).json({ message: "Delete user account successful" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// Get list of all doctors
const getDoctors = (req, res) => {
  module.exports.getUser(req, res, Doctor);
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
const deleteDoctorById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Doctor.findById(id).populate("appointments");
    if (!user) throw Error("Invalid user ID");

    // delete all appointments and remove from other user's appointment array
    for (let i = user.appointments.length - 1; i >= 0; i--) {
      const patient = await Patient.findById(user.appointments[i].patientId);
      patient.appointments.pull({ _id: user.appointments[i]._id });
      await user.appointments[i].deleteOne();
      await patient.save();
    }
    await user.deleteOne();

    res.status(200).json({ message: "Delete user account successful" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
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
  getUser,
};
