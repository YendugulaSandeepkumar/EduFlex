const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createQuiz,
  getQuiz,
  submitQuiz,
  generateQuiz
} = require("../controllers/quizController");

// Admin
router.post("/generate", auth, generateQuiz);

// Learner
router.get("/:topicId", auth, getQuiz);
router.post("/submit", auth, submitQuiz);

module.exports = router;
