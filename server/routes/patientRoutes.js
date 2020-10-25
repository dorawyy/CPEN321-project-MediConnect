const express = require("express");
const router = express.Router();
const patController = require("../controllers/userController");

// get user page
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.get("/:id/", patController.findById);
router.delete("/:id/", patController.deleteUser);

router.get("/:id/:attribute", patController.getAttribute);
router.delete("/:id/:attribute", patController.deleteAttribute);

router.set("/:id/:attribute/:newVal", patController.setAttribute);

module.exports = router;
