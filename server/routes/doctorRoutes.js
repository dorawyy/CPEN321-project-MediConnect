const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// get doctor page
router.get("/", authController.getDoctors);

// post new doctor (authentication)
router.post("/register", authController.registerDoctor);

// get doctor by id
router.get("/:id/", authController.getDoctorById);

// delete doctor by id
router.delete("/:id/", authController.deleteDoctorById);

// router.get("/:id/:attribute", docController.getAttribute);
// router.delete("/:id/:attribute", docController.deleteAttribute);

module.exports = router;
