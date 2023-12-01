const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

router.get("/detail/:id", vehicleController.read);
router.get("/list", vehicleController.readAll);


module.exports = router;
