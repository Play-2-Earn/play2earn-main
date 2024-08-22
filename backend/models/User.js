const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TaskProgressSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'completed'],
        default: 'not-started'
    },
    score: {
        type: Number,
        default: 0
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks_completed: {
        type: Number,
        default: 0,
    },
    total_rewards: {
        type: Number,
        default: 0,
    },
    otp: {
        type: Number,
        unique: true,
    },
    otpExpires: {
        type: Date,
        unique: true,
    },
    userRefNum: {
        type: String,
        unique: true,
    },
    refBy: {
        type: String,
        unique: true,
    },
    taskProgress: [TaskProgressSchema] // Array of task progress sub-documents

}, { timestamps: true });

// Prevent model overwrite error
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
