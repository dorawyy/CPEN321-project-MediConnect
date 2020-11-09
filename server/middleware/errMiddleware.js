const mongoose = require("mongoose");

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
    err.message.includes("Doctor validation failed") ||
    err.message.includes("Validation failed")
  ) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const handleAppointmentErrors = (err) => {
  let errors = { patientId: "", doctorId: "", start_time: "", end_time: "" };

  // incorrect patient ID
  if (err.message === "Invalid patient ID") {
    errors.patient = "Patient account doesn't exist";
  }

  // incorrect doctor ID
  if (err.message === "Invalid doctor ID") {
    errors.doctor = "Doctor account doesn't exist";
  }

  // incorrect user ID
  if (err.message === "Invalid user ID") {
    errors.patient = "User account doesn't exist";
    errors.doctor = "User account doesn't exist";
  }

  // incorrect appointment ID
  if (err.message === "Invalid appointment ID") {
    errors.start_time = "Appointment doesn't exist";
    errors.end_time = "Appointment doesn't exist";
  }

  // CastError
  if (err.name === "CastError") {
    errors[err.path] = err.message;
  }

  // validation errors
  if (err.message.includes("Appointment validation failed")) {
    Object.values(err.errors).forEach((error) => {
      if (error.name === "CastError") {
        errors[error.path] = error.message;
      } else {
        errors[error.path] = error.message;
      }
    });
  }

  return errors;
};

module.exports = { handleErrors, handleAppointmentErrors };
