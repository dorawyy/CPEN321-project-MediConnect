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
    start_time: {
      type: Date,
      required: [true, "Please enter start time"],
    },
    end_time: {
      type: Date,
      required: [true, "Please enter end time"],
    },
  },
  appointmentOptions
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
