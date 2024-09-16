const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const followTaskRouter = require("./routes/FollowTaskRouter");
const textTagRoutes = require("./routes/TextTagRouter");
const wordcountRoutes = require("./routes/wordcountRoutes");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express(); // Use app for express instance

app.use(cookieParser()); // Cookie middleware

// Middleware
app.use(
  cors({
    origin: [
      "https://www.play2earn.ai",
      "https://dev.d3sxwpggtsq5rq.amplifyapp.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // Parse JSON

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/follow-task", followTaskRouter);
app.use("/api/texttag", textTagRoutes);
app.use("/api/wordcount", wordcountRoutes);

// Function to generate a paragraph
app.get("/generate_paragraph", (req, res) => {
  const { level } = req.query;
  const texts = require("./model/texts.json"); // Ensure the path is correct

  if (!level || !texts[level]) {
    return res.status(400).json({ error: "Invalid level or level not found." });
  }

  const sentences = texts[level];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const sentence = sentences[randomIndex];

  res.json({
    french: sentence.french,
    english: sentence.english,
    hearts: 3, // Example initial hearts count
  });
});

// Function to verify translation
app.post("/verify", (req, res) => {
  const { user_translation, correct_translation, user_id, level } = req.body;

  if (!user_translation || !correct_translation || !user_id || !level) {
    return res.status(400).json({
      error:
        "User translation, correct translation, user_id, and level are required.",
    });
  }

  const isCorrect =
    user_translation.trim().toLowerCase() ===
    correct_translation.trim().toLowerCase();

  res.json({
    is_correct: isCorrect,
  });
});

// Checking the cookies
app.get("/api/check", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authentication failed" });
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Authenticated", user: verifiedUser });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Export handler
module.exports.handler = serverless(app);
