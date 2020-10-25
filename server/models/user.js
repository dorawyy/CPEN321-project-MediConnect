const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOptions = {
  discriminatorKey: "userkey",
  collection: "items",
};

// Schema of a user which contains important fields that both patient and doctor
// schemas will inherit from
const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  userOptions
);

// Virtual for the user's full name
UserSchema.virtual("name").get(() => {
  let fullname = "";

  if (this.first_name && this.last_name) {
    fullname = this.last_name + ", " + this.first_name;
  } else {
    fullname = "";
  }

  return fullname;
});

module.exports = mongoose.model("User", UserSchema);
