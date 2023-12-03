const express = require("express");
const router = express.Router();

const vehicleTypeController = require("../controllers/vehicleTypeController");

router.get("/:id", vehicleTypeController.read);
router.get("/", vehicleTypeController.readAll);


module.exports = router;
