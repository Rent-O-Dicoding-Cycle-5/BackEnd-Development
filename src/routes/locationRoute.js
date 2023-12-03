const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController");

router.get("/:id", locationController.read);
router.get("/", locationController.readAll);


module.exports = router;
