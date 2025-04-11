
const express = require('express');
const connectDB = require('./config/db'); // Database connection
const config = require('./config/env'); // Environment variables

 
const app = express();


app.use(express.json()); // Allows parsing JSON request bodies


connectDB();


app.get('/', (req, res) => {
  res.status(200).json({ message: 'Crew-Z Backend is Running ' });
});


const PORT = config.PORT || process.env.PORT || 5000;


const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(` Server Error: ${error.message}`);
    process.exit(1); // Exit process on failure
  }
};


startServer();

