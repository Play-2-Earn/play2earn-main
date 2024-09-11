<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const followTaskRouter = require("./routes/FollowTaskRouter");
const bodyParser = require("body-parser");

dotenv.config();

const server = express();

// Middleware
server.use(cors());
server.use(express.json());

// Routes
server.use("/api/auth", authRoutes);
server.use("/api/tasks", taskRoutes);
server.use("/api/admin", adminRoutes);
server.use("/api/users", userRoutes);
server.use("/api/follow-task", followTaskRouter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Server setup
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const followTaskRouter = require('./routes/FollowTaskRouter');
const textTagRoutes = require('./routes/TextTagRouter');

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const texts = require('./model/texts.json'); // Correct path to your texts.json

const server = express(); // Changed from app to server

const PORT = process.env.PORT

// Middleware
server.use(cors()); // Allow cross-origin requests
server.use(bodyParser.json()); // Parse JSON bodies

// Routes
server.use('/api/auth', authRoutes);
server.use('/api/tasks', taskRoutes);
server.use('/api/admin', adminRoutes);
server.use('/api/users', userRoutes);
server.use('/api/follow-task', followTaskRouter);
server.use('/api/texttag', textTagRoutes);


// Function to generate a paragraph
server.get('/generate_paragraph', (req, res) => {
  const { level, user_id } = req.query;
  
  // Validate query parameters
  if (!level || !texts[level]) {
    return res.status(400).json({ error: 'Invalid level or level not found.' });
  }

  const sentences = texts[level];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  const sentence = sentences[randomIndex];

  res.json({
    french: sentence.french,
    english: sentence.english,
    hearts: 3 // Example initial hearts count
  });
});

// Function to verify translation
server.post('/verify', (req, res) => {
  const { user_translation, correct_translation, user_id, level } = req.body;

  // Validate request body
  if (!user_translation || !correct_translation || !user_id || !level) {
    console.error('Missing required fields:', { user_translation, correct_translation, user_id, level });
    return res.status(400).json({ error: 'User translation, correct translation, user_id, and level are required.' });
  }

  // Check if user translation is correct
  const isCorrect = user_translation.trim().toLowerCase() === correct_translation.trim().toLowerCase();

  res.json({
    is_correct: isCorrect
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

  server.listen(PORT,()=>{
    console.log(`server running ${PORT}`)
})
>>>>>>> 1270daa (cv + recent  games integration)
