const express = require("express");
const router = express.Router();
const rentController = require("../controllers/rentController");
const checkAuth = require("../middleware/checkAuth");

router.post("/", checkAuth, rentController.create);
router.get("/:id", checkAuth, rentController.read);

module.exports = router;
