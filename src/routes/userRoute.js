const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");

router.get("/profile", checkAuth, userController.read);
router.put("/profile/data", checkAuth, userController.update);


module.exports = router;
