const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); 
const bodyParser = require('body-parser');

dotenv.config();

const server = express();

// Middleware
server.use(cors()); // Add this line to enable CORS

// (mit prajapati, auth)
// server.use(cors({
//     origin: ['http://localhost:5002','http://localhost:5173', 'http://localhost:3002'], // Add your front-end origin(s) here
//     methods: ['GET', 'POST'],
//     credentials: true
//   }));

// server.use(bodyParser.json());

server.use(express.json());

// Routes
server.use('/api/auth', authRoutes);
server.use('/api/tasks', taskRoutes);
server.use('/api/admin', adminRoutes);
server.use('/api/users', userRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Server setup
const PORT = process.env.PORT || 5002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
