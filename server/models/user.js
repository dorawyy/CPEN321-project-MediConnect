const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
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
      required: [true, "Please enter your first name"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      trim: true,
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    age: {
      type: Number,
      // required: true,
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

// fire a function before doc saved to db
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
