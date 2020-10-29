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

module.exports = { handleErrors };
