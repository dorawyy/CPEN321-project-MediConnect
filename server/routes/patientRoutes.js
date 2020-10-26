const express = require("express");
const authController = require("../controllers/authController");
const searchController = require("../controllers/searchController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const router = express.Router();

// get patient page
router.get("/", authController.getPatients);

// post new patient (authentication)
router.post("/signup", authController.signupPatient);

// post patient login
router.post("/signout", authController.signinPatient);

// get patient logout
router.get("/signout", authController.signoutPatient);

// post symptoms to doctor specialization
router.post("/search", requireAuth, searchController.findDoctor);

// get patient by id
router.get("/:id", requireAuth, authController.getPatientById);

// delete patient by id
router.delete("/:id", requireAuth, authController.deletePatientById);

module.exports = router;
