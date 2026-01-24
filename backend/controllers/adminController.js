const User = require("../models/User");
const Topic = require("../models/Topic");
const Attempt = require("../models/Attempt");

// GET ADMIN DASHBOARD STATS
exports.getAdminStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const topics = await Topic.countDocuments();
    const attempts = await Attempt.countDocuments();

    res.json({
      users,
      topics,
      attempts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
