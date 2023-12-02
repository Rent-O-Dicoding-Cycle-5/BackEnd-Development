const express = require("express");
const router = express.Router();

const vehicleFilterController = require("../controllers/vehicleFilterController");

router.get("/list/type/:type", vehicleFilterController.filterByType);
router.get("/list/brand/:brand", vehicleFilterController.filterByBrand);
router.get("/list/location/:location", vehicleFilterController.filterByLocation);
router.get("/list/type/:type/brand/:brand", vehicleFilterController.filterByTypeAndBrand);
router.get("/list/type/:type/location/:location", vehicleFilterController.filterByTypeAndLocation);
router.get("/list/brand/:brand/location/:location", vehicleFilterController.filterByBrandAndLocation);
router.get("/list/type/:type/brand/:brand/location/:location", vehicleFilterController.filterByTypeAndBrandAndLocation);


module.exports = router;
