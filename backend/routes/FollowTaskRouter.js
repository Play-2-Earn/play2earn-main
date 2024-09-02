const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

  const FollowSchema = new mongoose.Schema({
    userId: { type: String, unique: true },
    tasks: {
        twitter: [{ 
            accountLink: String,
            completed: { type: Boolean, default: false },
            completedAt: Date,
            screenshotData: Buffer,
            screenshotContentType: String,
            points: { type: Number, default: 0 },
            shared: { type: Boolean, default: false },
            sharePoints: { type: Number, default: 0 }
        }],
        linkedin: [{ 
            accountLink: String,
            completed: { type: Boolean, default: false },
            completedAt: Date,
            screenshotData: Buffer,
            screenshotContentType: String,
            points: { type: Number, default: 0 },
            shared: { type: Boolean, default: false },
            sharePoints: { type: Number, default: 0 }
        }],
        telegram: [{ 
            accountLink: String,
            completed: { type: Boolean, default: false },
            completedAt: Date,
            screenshotData: Buffer,
            screenshotContentType: String,
            points: { type: Number, default: 0 },
            shared: { type: Boolean, default: false },
            sharePoints: { type: Number, default: 0 }
        }],
        youtube: [{ 
            accountLink: String,
            completed: { type: Boolean, default: false },
            completedAt: Date,
            screenshotData: Buffer,
            screenshotContentType: String,
            points: { type: Number, default: 0 },
            shared: { type: Boolean, default: false },
            sharePoints: { type: Number, default: 0 }
        }],
        instagram: [{ 
            accountLink: String,
            completed: { type: Boolean, default: false },
            completedAt: Date,
            screenshotData: Buffer,
            screenshotContentType: String,
            points: { type: Number, default: 0 },
            shared: { type: Boolean, default: false },
            sharePoints: { type: Number, default: 0 }
        }],
        tiktok: [{ 
            accountLink: String,
            completed: { type: Boolean, default: false },
            completedAt: Date,
            screenshotData: Buffer,
            screenshotContentType: String,
            points: { type: Number, default: 0 },
            shared: { type: Boolean, default: false },
            sharePoints: { type: Number, default: 0 }
        }]
    }, 
    totalPoints: { type: Number, default: 0 }
});

const User = mongoose.model('Follow', FollowSchema);

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  platform: String,
  accountLink: String,
  reward: Number
});

const FollowTask = mongoose.model('FollowTask', TaskSchema, 'followtasks');

router.get('/api/follow-tasks', async (req, res) => {
  try {
    const tasks = await FollowTask.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ 
        userId,
        tasks: {
          twitter: [],
          linkedin: [],
          telegram: [],
          youtube: [],
          instagram: [],
          tiktok: []
        },
        totalPoints: 0
      });
      await user.save();
    }
    res.json({
      tasks: user.tasks,
      totalPoints: user.totalPoints
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

router.post('/upload-screenshot', upload.single('screenshot'), async (req, res) => {
  const { platform, userId, accountLink } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }

  try {
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ 
        userId,
        tasks: {
          twitter: [],
          linkedin: [],
          telegram: [],
          youtube: [],
          instagram: [],
          tiktok: []
        },
        totalPoints: 0
      });
    }

    const points = 10;

    const platformLower = platform.toLowerCase();
    const taskIndex = user.tasks[platformLower].findIndex(task => task.accountLink === accountLink);

    if (taskIndex === -1) {
      user.tasks[platformLower].push({
        accountLink,
        completed: true,
        completedAt: new Date(),
        screenshotData: req.file.buffer,
        screenshotContentType: req.file.mimetype,
        points: points,
        shared: false,
        sharePoints: 0
      });
      user.totalPoints += points;
    } else if (!user.tasks[platformLower][taskIndex].completed) {
      user.tasks[platformLower][taskIndex] = {
        ...user.tasks[platformLower][taskIndex],
        completed: true,
        completedAt: new Date(),
        screenshotData: req.file.buffer,
        screenshotContentType: req.file.mimetype,
        points: points
      };
      user.totalPoints += points;
    } else {
      return res.json({ 
        success: false,
        message: 'Task already completed'
      });
    }

    await user.save();

    res.json({ 
      success: true, 
      totalPoints: user.totalPoints,
      message: 'Screenshot uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading screenshot:', error);
    res.status(500).json({ success: false, error: 'Error uploading screenshot' });
  }
});

router.post('/share-achievement', async (req, res) => {
  const { userId, platform, accountLink, socialPlatform } = req.body;

  try {
    let user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const platformLower = platform.toLowerCase();
    const taskIndex = user.tasks[platformLower].findIndex(task => task.accountLink === accountLink);

    if (taskIndex !== -1 && user.tasks[platformLower][taskIndex].completed && !user.tasks[platformLower][taskIndex].shared) {
      // Simulate a 10-second delay
      await new Promise(resolve => setTimeout(resolve, 10000));

      user.tasks[platformLower][taskIndex].shared = true;
      user.tasks[platformLower][taskIndex].sharePoints = 5;
      user.totalPoints += 5;
      
      await user.save();

      res.json({ 
        success: true, 
        message: `Share achievement recorded for ${platform} (${accountLink}) on ${socialPlatform}`,
        sharePoints: 5,
        totalPoints: user.totalPoints,
        taskStatus: user.tasks
      });
    } else {
      res.json({ 
        success: false, 
        message: `Share achievement already recorded or task not completed for ${platform} (${accountLink})`,
        totalPoints: user.totalPoints,
        taskStatus: user.tasks
      });
    }
  } catch (error) {
    console.error('Error recording share achievement:', error);
    res.status(500).json({ success: false, error: 'Error recording share achievement' });
  }
});

module.exports = router;