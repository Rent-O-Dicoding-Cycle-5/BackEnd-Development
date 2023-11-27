const express = require("express");
const router = express.Router();

const partnerController = require("../controllers/partnerController");
const checkAuth = require("../middleware/checkAuth");

router.get("/", checkAuth, partnerController.read);
router.post("/create", checkAuth, partnerController.create);
router.put("/update", checkAuth, partnerController.update);


module.exports = router;
