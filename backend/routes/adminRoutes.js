const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAdminStats,
  getAllUsers
} = require("../controllers/adminController");

// Admin dashboard stats
router.get("/stats", auth, admin, getAdminStats);

// List all users
router.get("/users", auth, admin, getAllUsers);

module.exports = router;
