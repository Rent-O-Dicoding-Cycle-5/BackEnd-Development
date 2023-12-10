const express = require("express");
const router = express.Router();

const userRentController = require("../controllers/userRentController");
const checkAuth = require("../middleware/checkAuth");

router.get("/:uid/:rentId", checkAuth, userRentController.read);
router.get("/:uid", checkAuth, userRentController.readAll);


module.exports = router;
