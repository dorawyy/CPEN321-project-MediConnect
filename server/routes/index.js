const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// load the Patient model
const Patient = require("../models/patient");

// get home page
router.get("/", (req, res, next) => {
  res.send("Hello world");
});

router.get("/patients", (req, res) => {
  Patient.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// temporary register endpoint
router.post(
  "/register",
  [
    body("first_name").not().isEmpty(),
    body("last_name").not().isEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("age").not().isEmpty(),
    body("gender").not().isEmpty(),
    body("height").not().isEmpty(),
    body("weight").not().isEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      first_name,
      last_name,
      email,
      password,
      age,
      gender,
      height,
      weight,
    } = req.body;

    // validation passed
    Patient.findOne({ email: email })
      .then((patient) => {
        if (patient) {
          // email already used, return error code
          return res.status(400).json({
            msg: "Email already used",
          });
        }

        const newPatient = new Patient({
          first_name,
          last_name,
          email,
          password,
          age,
          gender,
          height,
          weight,
        });

        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPatient.password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hashed
            newPatient.password = hash;

            // Save the Patient now
            newPatient
              .save()
              .then((patient) => {
                console.log(patient);

                const payload = {
                  user: {
                    id: newPatient.id,
                  },
                };

                jwt.sign(
                  payload,
                  "randomString",
                  { expiresIn: 10000 },
                  (err, token) => {
                    if (err) throw err;
                    res.status(200).json({ token });
                  }
                );
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Error in saving\n");
      });
  }
);

module.exports = router;
