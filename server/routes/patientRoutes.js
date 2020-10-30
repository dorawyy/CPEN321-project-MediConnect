/*
 * Routes dedicated to handling requests from patients or requests pertaining
 * to patients
 */

const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const appointController = require("../controllers/appointController");
const searchController = require("../controllers/searchController");
const stripeController = require("../controllers/stripeController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");
const router = express.Router();

// Convenient endpoint for viewing all patients
router.get("/", userController.getPatients);

/*
 * Routes relating to patient authentication
 */
router.post("/signup", authController.signupPatient);

router.post("/signin", authController.signinPatient);

router.get("/signout", authController.signoutPatient);

/*
 * Routes relating to patient search for doctors based on symptoms
 */
router.get("/search", searchController.findDoctor);

/*
 * Routes relating to patient payment to doctor
 * TODO: Mudit please handle this external API
 */
router.get("/pay", stripeController.createPaymentIntent);

/*
 * Routes relating to patient CRUB database operations
 */
router.get("/:id", userController.getPatientById);

router.put("/:id", userController.putPatientById);

router.delete("/:id", userController.deletePatientById);

/*
 * Routes relating to appointment booking
 * TODO: Daniel add support for get, put, and delete
 */
router.get("/appointment/:id", appointController.getAppointments);

router.post("/appointment", appointController.postAppointment);

router.put("/appointment", appointController.putAppointment);

router.delete("/appointment", appointController.deleteAppointment);

module.exports = router;
