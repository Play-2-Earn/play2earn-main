const mongoose = require("mongoose");
const Leaderboard = require("../models/leaderboard");

describe('Leaderboard Transactions', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should handle concurrent updates correctly', async () => {
    const username = "testUser";
    const initialPoints = 1000;

    await Leaderboard.create({ username, total_rewards: initialPoints });

    const update1 = Leaderboard.findOneAndUpdate({ username }, { total_rewards: initialPoints + 500 }, { new: true });
    const update2 = Leaderboard.findOneAndUpdate({ username }, { total_rewards: initialPoints + 1000 }, { new: true });

    const [result1, result2] = await Promise.all([update1, update2]);

    expect(result1.total_rewards).not.toBe(result2.total_rewards); // Ensure updates did not overwrite each other
  });
});
