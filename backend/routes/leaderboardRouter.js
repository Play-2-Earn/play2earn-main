const express = require("express");
const Datastore = require("nedb");
const Leaderboard = require("../models/leaderboard");

const router = express.Router();


const cacheDb = new Datastore({ filename: 'cache.db', autoload: true }); // 使用持久化存储


const checkAndInitializeCache = () => {
  return new Promise((resolve, reject) => {
    cacheDb.findOne({ _id: 'leaderboard' }, (err, doc) => {
      if (err) return reject(err);
      if (!doc) {
        // init
        cacheDb.insert({ _id: 'leaderboard', data: [] }, (err) => {
          if (err) return reject(err);
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
};

// Get leaderboard data with rank
router.get("/", async (req, res) => {
  try {
    // Check and initialize the cache
    await checkAndInitializeCache();

    // Finding cached data
    cacheDb.findOne({ _id: 'leaderboard' }, async (err, cachedData) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (cachedData && cachedData.data.length > 0) {
        console.log("Cache hit");
        return res.json(cachedData.data);
      }

      console.log("Cache miss");
      // Get and sort data from MongoDB
      const data = await Leaderboard.find().sort({ total_rewards: -1 }).exec();

      // Assign ranking based on sorting
      const rankedData = data.map((entry, index) => ({
        rank: index + 1,
        username: entry.username,
        points: entry.total_rewards,
      }));

      // update cache
      cacheDb.update({ _id: 'leaderboard' }, { _id: 'leaderboard', data: rankedData }, { upsert: true }, (err) => {
        if (err) return res.status(500).json({ message: "Server error" });
      });

      return res.json(rankedData);
    });
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
