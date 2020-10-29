const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

// Patient model inheriting from base User and adding new requisite fields
const Patient = User.discriminator(
  "Patient",
  Schema({
    gender: { type: String, enum: ["Female", "Male", "Other"] },
    height: { type: Number },
    weight: { type: Number },
  })
);

module.exports = mongoose.model("Patient");
