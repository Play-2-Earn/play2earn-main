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
const leaderboardRouter=require("./routes/leaderboardRouter")

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
server.use("/api/leaderboard", leaderboardRouter);
// Connect to MongoDB
mongoose
  .connect("mongodb+srv://p2etokens:Play2earn%40@cluster0.hfnr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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
