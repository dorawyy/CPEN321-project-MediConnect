const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentOptions = {
  timestamps: true,
};

const AppointmentSchema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Please enter patient"],
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Please enter doctor"],
    },
    appointment_time: {
      type: String,
      required: [true, "Please enter appointment time"],
    },
    appointment_date: {
      type: String,
      required: [true, "Please enter appointment date"],
    },
  },
  appointmentOptions
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
