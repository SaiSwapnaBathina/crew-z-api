// Load environment variables from .env
require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/crewz',
  PORT: process.env.PORT || 5000,
};
