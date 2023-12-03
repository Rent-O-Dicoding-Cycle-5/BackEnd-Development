const express = require("express");
const router = express.Router();

const vehicleBrandController = require("../controllers/vehicleBrandController");

router.get("/:id", vehicleBrandController.read);
router.get("/", vehicleBrandController.readAll);


module.exports = router;
