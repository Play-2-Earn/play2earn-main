const express = require("express");
const cluster = require('cluster');
const os = require('os');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const followTaskRouter = require("./routes/FollowTaskRouter");
const leaderboardRouter = require("./routes/leaderboardRouter");

// Load environment variables
dotenv.config();

// Number of CPU cores
const numCPUs = os.cpus().length;

// Warning handler , remove warning for nedb: if maintain the leaderboard apis for long time, suggest add other external cache db instead of nedb
const process= require('process');
process.removeAllListeners('warning')


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });

} else {
  const server = express();

  // Middleware
  server.use(cors());
  server.use(express.json());
  server.use(bodyParser.json());

  // MongoDB connection
  mongoose.connect("mongodb+srv://p2etokens:Play2earn%40@cluster0.hfnr9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

  // Initialize Cache Database for the worker
  const { getCacheDb } = require("./controllers/leaderboardController");
  const cacheDb = getCacheDb(cluster.worker.id);

  // Inject cacheDb into routes
  server.use((req, res, next) => {
    req.cacheDb = cacheDb;
    next();
  });

  // Routes
  server.use("/api/auth", authRoutes);
  server.use("/api/tasks", taskRoutes);
  server.use("/api/admin", adminRoutes);
  server.use("/api/users", userRoutes);
  server.use("/api/follow-task", followTaskRouter);
  server.use("/api/leaderboard", leaderboardRouter);

  // Server setup
  const PORT = process.env.PORT || 5002;
  server.listen(PORT, () => console.log(`Worker ${cluster.worker.id} running on port ${PORT}`));
}
