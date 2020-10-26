const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;

// Doctor model inheriting from base User and adding new requisite fields
const Doctor = User.discriminator(
  "Doctor",
  Schema({
    specialization: { type: String, required: false },
    years_of_experience: { type: Number, required: false, min: 0 },
    verified: { type: Boolean, default: false },
  })
);

Doctor.schema.virtual("url").get(() => {
  return "/doctors/" + this._id;
});

module.exports = mongoose.model("Doctor");
