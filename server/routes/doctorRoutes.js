const express = require("express");
const authController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

// get doctor page
router.get("/", authController.getDoctors);

// post new doctor (authentication)
router.post("/signup", authController.signupDoctor);

// post doctor signin
router.post("/signin", authController.signinDoctor);

// get doctor signout
router.get("/signout", authController.signoutDoctor);

// get doctor by id
router.get("/:id", requireAuth, authController.getDoctorById);

// delete doctor by id
router.delete("/:id", requireAuth, authController.deleteDoctorById);

module.exports = router;
