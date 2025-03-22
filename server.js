/* Import required modules */
const express = require('express');
const connectDB = require('./config/db'); // Database connection
const config = require('./config/env'); // Environment variables

/* Initialize Express app */ 
const app = express();

/* Middleware */ 
app.use(express.json()); // Allows parsing JSON request bodies

/* Connect to MongoDB */ 
connectDB();

/*  Root route for testing */ 
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Crew-Z Backend is Running 🚀' });
});

/* Define PORT */ 
const PORT = config.PORT || process.env.PORT || 5000;

/* Start Server with Error Handling */ 
const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(` Server Error: ${error.message}`);
    process.exit(1); // Exit process on failure
  }
};

/* Run server */
startServer();

