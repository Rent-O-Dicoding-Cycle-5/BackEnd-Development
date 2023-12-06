const express = require("express");
const router = express.Router();

const partnerVehicleController = require("../controllers/partnerVehicleController");
const checkAuth = require("../middleware/checkAuth");
const uploadVehicle = require("../middleware/uploadVehicle");

router.get("/list", checkAuth, partnerVehicleController.read);
router.post("/", checkAuth, uploadVehicle.single("vehicleImage"), partnerVehicleController.create);
router.put("/update/:id", checkAuth, uploadVehicle.single("vehicleImage"), partnerVehicleController.update);
router.delete("/delete/:id", checkAuth, partnerVehicleController.delete);


module.exports = router;
