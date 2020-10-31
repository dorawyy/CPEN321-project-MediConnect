/*
 * Module for controlling routes that handle user appointment booking
 */

const Patient = require("../models/patient");
const Doctor = require("../models/doctor");
const Appointment = require("../models/appointment");
const doctor = require("../models/doctor");

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
    // if patient or doctor ID is not valid, do not proceed
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

    // push the new appointment to both the patient's and doctor's appointments
    doctor.appointments.push(newAppointment);
    patient.appointments.push(newAppointment);
    await doctor.save();
    await patient.save();

    res.status(200).json({ appointment: newAppointment._id });
  } catch (err) {
    console.log(err);
    // const errors = handleErrors(err);
    // res.status(400).json(errors);
    res.status(400).json(err);
  }
};

const putAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    await Appointment.findByIdAndUpdate(appointmentId, req.body, {
      runValidators: true,
    });

    res.status(200).json({ appointment: appointmentId });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    // if the appointment ID is not valid, do not proceed
    const appointment = await Appointment.findById(appointmentId)
      .populate("patientId")
      .populate("doctorId");
    if (!appointment) throw Error("Invalid appointment ID");

    // remove the appointment from both the patient's and doctor's appointments
    appointment.patientId.appointments.pull({ _id: appointmentId });
    appointment.doctorId.appointments.pull({ _id: appointmentId });
    await appointment.patientId.save();
    await appointment.doctorId.save();
    await appointment.deleteOne();

    res.status(200).json({ message: "Delete appointment successful" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

module.exports = {
  getAppointments,
  postAppointment,
  putAppointment,
  deleteAppointment,
};
