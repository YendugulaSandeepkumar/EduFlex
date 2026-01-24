const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic"
  },

  styleUsed: {
    type: String,
    enum: ["V", "A", "R", "K"]
  },

  score: Number,
  passed: Boolean,

  attemptedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Attempt", attemptSchema);
