/*
 * Module for controlling routes that handle user appointment booking
 */

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");

const getAppointments = (req, res) => {
  const doctorId = req.params.id;

  Doctor.findById(doctorId, "appointments")
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const postAppointment = async (req, res) => {
  const { patientId, doctorId, appointment_time, appointment_date } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) throw Error("Invalid patient ID");
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) throw Error("Invalid doctor ID");

    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      appointment_time,
      appointment_date,
    });

    doctor.appointments.push(newAppointment);
    patient.appointments.push(newAppointment);
    await doctor.save();
    await patient.save();

    console.log(newAppointment);
    res.status(200).json(newAppointment);
  } catch (err) {
    console.log(err);
    // const errors = handleErrors(err);
    // res.status(400).json(errors);
    res.status(400).json(err);
  }
};

const putAppointment = async (req, res) => {
  // will fill
};

const deleteAppointment = async (req, res) => {
  // will fill
};

module.exports = {
  getAppointments,
  postAppointment,
  putAppointment,
  deleteAppointment,
};
