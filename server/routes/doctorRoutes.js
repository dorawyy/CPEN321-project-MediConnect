const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

// get doctor page
router.get("/", userController.getDoctors);

// post new doctor (authentication)
router.post("/signup", authController.signupDoctor);

// post doctor signin
router.post("/signin", authController.signinDoctor);

// get doctor signout
router.get("/signout", authController.signoutDoctor);

// get doctor by id
router.get("/:id", requireAuth, userController.getDoctorById);

// put doctor by id
router.put("/:id", requireAuth, userController.putDoctorById);

// delete doctor by id
router.delete("/:id", requireAuth, userController.deleteDoctorById);

module.exports = router;
