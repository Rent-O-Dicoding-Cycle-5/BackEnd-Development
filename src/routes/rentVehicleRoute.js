const express = require("express");
const router = express.Router();

const rentVehicleController = require("../controllers/rentVehicleController");
const checkAuth = require("../middleware/checkAuth");

router.get("/detail/:id", checkAuth, rentVehicleController.read);
router.post("/:id", checkAuth, rentVehicleController.create);
router.put("/payment/:id", checkAuth, rentVehicleController.update);


module.exports = router;
