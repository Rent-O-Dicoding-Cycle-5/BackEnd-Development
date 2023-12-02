const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");
const uploadProfile = require("../middleware/uploadProfile");

router.get("/profile", checkAuth, userController.read);
router.post("/profile/img", checkAuth, uploadProfile.single("image"), userController.uploadImgProfile);
router.put("/profile/data", checkAuth, userController.update);


module.exports = router;
