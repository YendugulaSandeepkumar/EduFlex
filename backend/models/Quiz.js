const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true
  },

  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number // index of correct option
    }
  ]
});

module.exports = mongoose.model("Quiz", quizSchema);
