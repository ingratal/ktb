
const express = require('express');
const path = require('path');
const app = express();
const Web3 = require('web3');


// Define the port to run the server
const PORT = process.env.PORT || 4200;

// Serve static files (your Webflow export)
app.use(express.static(path.join(__dirname, 'dist')));

// Basic route to serve index.html from the public directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Updated path
});


// Example API route (VERCEL)
module.exports = (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
};


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

