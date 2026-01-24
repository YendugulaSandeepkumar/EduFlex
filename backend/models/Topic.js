const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String
  },

  contents: {
    V: String,
    A: String,
    R: String,
    K: String
  }
});

module.exports = mongoose.model("Topic", topicSchema);
