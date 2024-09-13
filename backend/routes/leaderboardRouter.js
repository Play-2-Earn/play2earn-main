const express = require("express");
const router = express.Router();
const { getLeaderboardData, addLeaderboardEntry } = require("../controllers/leaderboardController");

// 获取排行榜数据
router.get("/", (req, res) => {
  const cacheDb = req.cacheDb;
  getLeaderboardData(req, res, cacheDb);
});

// 添加排行榜条目
router.post("/", addLeaderboardEntry);

module.exports = router;
