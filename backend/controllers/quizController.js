const Quiz = require("../models/Quiz");
const Attempt = require("../models/Attempt");
const User = require("../models/User");
const { updateProgress } = require("../models/Progress");
const Topic = require("../models/Topic");
const { generateQuizQuestions } = require("../services/aiService");

// ADMIN: Create quiz
// GENERATE QUIZ USING GEMINI
exports.generateQuiz = async (req, res) => {
  const { topicId } = req.body;

  try {
    // Check if quiz already exists
    const existing = await Quiz.findOne({ topicId });
    if (existing) {
      return res.json(existing);
    }

    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Generate using Gemini
    const questions = await generateQuizQuestions(topic.title);

    const quiz = await Quiz.create({
      topicId,
      questions
    });

    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to generate quiz" });
  }
};


// LEARNER: Get quiz
exports.getQuiz = async (req, res) => {
  const { topicId } = req.params;

  try {
    const quiz = await Quiz.findOne({ topicId });
    if (!quiz)
      return res.status(404).json({ message: "Quiz not found" });

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LEARNER: Submit quiz
exports.submitQuiz = async (req, res) => {
  const { topicId, answers, styleUsed } = req.body;

  try {
    const quiz = await Quiz.findOne({ topicId });
    if (!quiz)
      return res.status(404).json({ message: "Quiz not found" });

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) correct++;
    });

    const score = (correct / quiz.questions.length) * 100;

    // after score calculation
await updateProgress({
  userId: req.user.id,
  topicId,
  score,
  style: styleUsed
});

    const passed = score >= 70;

    // Store attempt
    await Attempt.create({
      userId: req.user.id,
      topicId,
      styleUsed,
      score,
      passed
    });

    // If passed → update preferred learning style
    if (passed) {
      await User.findByIdAndUpdate(req.user.id, {
        preferredStyle: styleUsed
      });
    }

    res.json({
      score,
      passed,
      nextAction: passed
        ? "CONTINUE_SAME_STYLE"
        : "CHOOSE_NEW_STYLE"
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
