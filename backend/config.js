require('dotenv').config();

module.exports = {
  // Server Configuration
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-builder',
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  
  // Netlify Configuration
  NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN,
  NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
  
  // API Base URL
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000'
}