const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());

/* ---------- ROUTES ---------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/topic", require("./routes/topicRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

/* ---------- HEALTH CHECK ---------- */
app.get("/api/health", (req, res) => {
  res.json({ status: "EduFlex backend running" });
});

/* ---------- GEMINI KEY CHECK (DEBUG) ---------- */
console.log(
  "Gemini API Key Loaded:",
  !!process.env.GEMINI_API_KEY
);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
