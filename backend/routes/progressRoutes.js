const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getUserProgress } = require("../controllers/progressController");

router.get("/my", auth, getUserProgress);

module.exports = router;
