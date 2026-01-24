const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic"
  },
  bestScore: Number,
  attempts: Number,
  lastStyle: String
});

module.exports = mongoose.model("Progress", progressSchema);
