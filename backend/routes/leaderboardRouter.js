const express = require("express");
const Leaderboard = require("../models/leaderboard");

const router = express.Router();

// Get leaderboard data with rank
router.get("/", async (req, res) => {
  try {
    // Fetch data from MongoDB and sort by points
    const data = await Leaderboard.find().sort({ total_rewards: -1 }); // Descending order
    
    // Assign rank based on sorted order
    const rankedData = data.map((entry, index) => ({
      rank: index + 1,
      username: entry.username,
      points: entry.total_rewards, // Map total_rewards to points
    }));

    return res.json(rankedData);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Add a new entry to the leaderboard
router.post("/", async (req, res) => {
  const { username, points } = req.body;

  try {
    const newEntry = new Leaderboard({ username, points });
    await newEntry.save(); // Save new entry to MongoDB
    console.log("New entry added to the leaderboard");

    return res.status(201).json({ message: "Leaderboard updated successfully" });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
