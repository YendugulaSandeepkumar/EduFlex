const Progress = require("../models/Progress");

exports.updateProgress = async ({ userId, topicId, score, style }) => {
  const progress = await Progress.findOne({ userId, topicId });

  if (progress) {
    progress.attempts += 1;
    progress.bestScore = Math.max(progress.bestScore, score);
    progress.lastStyle = style;
    await progress.save();
  } else {
    await Progress.create({
      userId,
      topicId,
      bestScore: score,
      attempts: 1,
      lastStyle: style
    });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.id })
      .populate("topicId", "title");

    res.json(progress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
