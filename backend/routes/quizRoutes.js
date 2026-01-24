const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createQuiz,
  getQuiz,
  submitQuiz
} = require("../controllers/quizController");

// Admin
router.post("/create", auth, createQuiz);

// Learner
router.get("/:topicId", auth, getQuiz);
router.post("/submit", auth, submitQuiz);

module.exports = router;
