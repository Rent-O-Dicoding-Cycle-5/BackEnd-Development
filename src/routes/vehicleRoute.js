const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");
const checkAuth = require("../middleware/checkAuth");

router.get("/:id", vehicleController.read);
router.get("/", vehicleController.readAll);
router.post("/", checkAuth, vehicleController.create);
router.put("/:id", checkAuth, vehicleController.update);
router.delete("/:id", checkAuth, vehicleController.delete);


module.exports = router;
