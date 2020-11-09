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
  const users = await model.find();
  res.status(200).json(users);
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
// remember to edit so that we have single deleteUserById with 4 parameters (req, res, model, otherModel)
const deletePatientById = async (req, res) => {
  const id = req.params.id;

  try {
    const patient = await Patient.findById(id).populate("appointments");
    if (!patient) throw Error("Invalid patient ID");

    // delete all appointments and remove from other patient's appointment array
    for (let i = patient.appointments.length - 1; i >= 0; i--) {
      const doctor = await Doctor.findById(patient.appointments[i].doctorId);
      doctor.appointments.pull({ _id: patient.appointments[i]._id });
      await patient.appointments[i].deleteOne();
      await doctor.save();
    }
    await patient.deleteOne();

    res.status(200).json({ message: "Delete patient account successful" });
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
// remember to edit so that we have single deleteUserById with 4 parameters (req, res, model, otherModel)
const deleteDoctorById = async (req, res) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id).populate("appointments");
    if (!doctor) throw Error("Invalid doctor ID");

    // delete all appointments and remove from other doctor's appointment array
    for (let i = doctor.appointments.length - 1; i >= 0; i--) {
      const patient = await Patient.findById(doctor.appointments[i].patientId);
      patient.appointments.pull({ _id: doctor.appointments[i]._id });
      await doctor.appointments[i].deleteOne();
      await patient.save();
    }
    await doctor.deleteOne();

    res.status(200).json({ message: "Delete doctor account successful" });
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
