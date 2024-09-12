const mongoose = require("mongoose");

// 定义 schema
const leaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  total_rewards: { type: Number, required: true },
});

// 创建模型并指定集合名称
const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema, "users");

module.exports = Leaderboard;
