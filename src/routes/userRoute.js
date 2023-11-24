const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const checkIdToken = require("../middleware/checkIdToken");

router.get("/profile", checkIdToken, userController.read);
router.put("/profile", checkIdToken, userController.update);


module.exports = router;
