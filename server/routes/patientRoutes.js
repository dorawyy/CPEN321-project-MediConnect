const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

// get patient page
router.get("/", authController.getPatients);

// post new patient (authentication)
router.post("/signup", authController.signupPatient);

// post patient login
router.post("/login", authController.loginPatient);

// get patient logout
router.get("/logout", authController.logoutPatient);

// get patient by id
router.get("/:id", requireAuth, authController.getPatientById);

// delete patient by id
router.delete("/:id", requireAuth, authController.deletePatientById);

module.exports = router;
