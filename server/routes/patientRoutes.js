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
 * TODO: Mudit please handle this external API. YES DADDY
 */
router.get("/pay", stripeController.createPaymentIntent);

// router.post("/checkout", stripeController.createCheckout);

/*
 * Routes relating to patient CRUD database operations
 */
router.get("/:id", userController.getUserById);

router.put("/:id", userController.putPatientById);

router.delete("/:id", userController.deletePatientById);

/*
 * Routes relating to appointment booking
 */
router.get("/appointment/:id", appointController.getAppointments);

router.post("/appointment", appointController.postAppointment);

router.put("/appointment/:id", appointController.putAppointment);

router.delete("/appointment/:id", appointController.deleteAppointment);

module.exports = router;
