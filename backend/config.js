require('dotenv').config();

module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder',
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  
 
  // API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',

  VERCEL_ACCESS_TOKEN: process.env.VERCEL_ACCESS_TOKEN,

  VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
}