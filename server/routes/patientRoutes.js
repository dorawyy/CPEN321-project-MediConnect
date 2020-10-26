const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// get patient page
router.get("/", authController.getPatients);

// post new patient (authentication)
router.post("/signup", authController.signupPatient);

// get patient by id
router.get("/:id/", authController.getPatientById);

// delete patient by id
router.delete("/:id/", authController.deletePatientById);

// router.get("/:id/:attribute", patController.getAttribute);
// router.delete("/:id/:attribute", patController.deleteAttribute);

module.exports = router;
