const express = require("express");
const router = express.Router();

const rentVehicleController = require("../controllers/rentVehicleController");
const checkAuth = require("../middleware/checkAuth");

router.get("/:id", checkAuth, rentVehicleController.read);
router.post("/:id", checkAuth, rentVehicleController.create);
router.put("/:id", checkAuth, rentVehicleController.update);


module.exports = router;
