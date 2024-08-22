// controllers/addressController.js 
//logic of handling adress from front-end
const receiveAddress = (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  // Log the wallet address to the console
  console.log('Received wallet address:', address);

  // Send a response
  res.status(200).json({ message: 'Address received successfully' });
};

module.exports = {
  receiveAddress,
};
