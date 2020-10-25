const express = require("express");
const router = express.Router();
const docController = require("../controllers/userController");

// get doctor page
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.get("/:id/", docController.findById);
router.delete("/:id/", docController.deleteUser);

router.get("/:id/:attribute", docController.getAttribute);
router.delete("/:id/:attribute", docController.deleteAttribute);

router.set("/:id/:attribute/:newVal", docController.setAttribute);

module.exports = router;
