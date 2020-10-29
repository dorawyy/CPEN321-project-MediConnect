const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const searchController = require("../controllers/searchController");
const stripeController = require("../controllers/stripeController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const router = express.Router();

// get patient page
router.get("/", userController.getPatients);

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
router.get("/:id", userController.getPatientById);

// put patient by id
router.put("/:id", userController.putPatientById);

// delete patient by id
router.delete("/:id", userController.deletePatientById);

module.exports = router;
