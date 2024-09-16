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

require("dotenv").config();
const bodyParser = require("body-parser");
const texts = require("./model/texts.json"); // Correct path to your texts.json

const express = require("express");
const server = express(); // Changed from app to server

const PORT = process.env.PORT;
server.use(cookieParser());

// Middleware
const corsOptions = {
  origin: 'https://dev.d3sxwpggtsq5rq.amplifyapp.com',
  credentials: true
};
server.use(cors(corsOptions));


server.use(bodyParser.json()); // Parse JSON bodies
server.use(express.json());

// Routes
server.use("/api/auth", authRoutes);
server.use("/api/tasks", taskRoutes);
server.use("/api/admin", adminRoutes);
server.use("/api/users", userRoutes);
server.use("/api/follow-task", followTaskRouter);
server.use("/api/texttag", textTagRoutes);
server.use("/api/wordcount", wordcountRoutes);

// Function to generate a paragraph
server.get("/generate_paragraph", (req, res) => {
  const { level, user_id } = req.query;

  // Validate query parameters
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
server.post("/verify", (req, res) => {
  const { user_translation, correct_translation, user_id, level } = req.body;

  // Validate request body
  if (!user_translation || !correct_translation || !user_id || !level) {
    console.error("Missing required fields:", {
      user_translation,
      correct_translation,
      user_id,
      level,
    });
    return res.status(400).json({
      error:
        "User translation, correct translation, user_id, and level are required.",
    });
  }

  // Check if user translation is correct
  const isCorrect =
    user_translation.trim().toLowerCase() ===
    correct_translation.trim().toLowerCase();

  res.json({
    is_correct: isCorrect,
  });
});

// checking the cookies

server.get("/api/check", (req, res) => {
  // console.log("Request received at /check");
  // console.log("Cookies:", req.cookies);

  try {
    const token = req.cookies.token;

    if (!token) {
      return res .status(403).json({ message: "No token, authentication failed" });
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Authenticated", user: verifiedUser });
  } catch (err) {
    console.error("Server error:", err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

server.listen(PORT, () => {
  console.log(`server running ${PORT}`);
});
