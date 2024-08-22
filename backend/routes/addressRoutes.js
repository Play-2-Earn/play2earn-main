// routes/addressRoutes.js to handle sending address to backend
const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// Define the POST route for receiving the wallet address
router.post('/receive-address', addressController.receiveAddress);

module.exports = router;
