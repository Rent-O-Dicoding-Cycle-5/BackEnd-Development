const express = require("express");
const router = express.Router();
const rentController = require("../controllers/rentController");
const checkAuth = require("../middleware/checkAuth");

router.post("/:id", checkAuth, rentController.create);
// router.get("/list", checkAuth, rentController.read);

module.exports = router;
