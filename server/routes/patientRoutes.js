const express = require("express");
const authController = require("../controllers/authController");
const searchController = require("../controllers/searchController");
const stripeController = require("../controllers/stripeController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const router = express.Router();

// get patient page
router.get("/", authController.getPatients);

// post new patient (authentication)
router.post("/signup", authController.signupPatient);

// post patient signin
router.post("/signin", authController.signinPatient);

// get patient signout
router.get("/signout", authController.signoutPatient);

// post symptoms to doctor specialization
router.get("/search", searchController.findDoctor);

// get request for payment
router.get("/pay", stripeController.createPaymentIntent);

// get patient by id
router.get("/:id", requireAuth, authController.getPatientById);

// delete patient by id
router.delete("/:id", requireAuth, authController.deletePatientById);

module.exports = router;
