const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createTopic,
  startTopic,
  getAllTopics   
} = require("../controllers/topicController");

// Admin creates topic
// router.post("/create", auth, createTopic);

// Learner starts topic
router.post("/start", auth, startTopic);

// Get all topics
router.get("/all", auth, getAllTopics);
router.post("/create", auth, admin, createTopic);

module.exports = router;
