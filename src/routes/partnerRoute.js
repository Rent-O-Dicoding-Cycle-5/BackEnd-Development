const express = require("express");
const router = express.Router();

const partnerController = require("../controllers/partnerController");
const checkAuth = require("../middleware/checkAuth");
const uploadSim = require("../middleware/uploadSim");

router.get("/", checkAuth, partnerController.read);
router.post("/create", checkAuth, partnerController.create);
router.post("/upload-sim", checkAuth, uploadSim.single("sim"), partnerController.uploadSim);
router.put("/update", checkAuth, partnerController.update);


module.exports = router;
