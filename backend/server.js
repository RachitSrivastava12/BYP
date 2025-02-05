const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const { PORT,MONGODB_URI
,VERCEL_ACCESS_TOKEN,
VERCEL_PROJECT_ID
} = require('./config.js');
const { createDeployment } = require('@vercel/client');

const corsOptions = {
  origin: ['https://your-vercel-frontend-domain.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// app.use(cors({
//   origin: ' http://localhost:5173/', // Be more specific in production
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions));


// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Don't exit the process, but log the error
    console.error('Server will continue running and retry connection');
  });

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});


// User model
const Client = mongoose.model('Client', {
  email: String,
  password: String,
});

// Portfolio model
// const Portfolio = mongoose.model('Portfolio', {
//   userId: mongoose.Schema.Types.ObjectId,
//   data: Object,
//   deployUrl: String,
// });




const Portfolio = mongoose.model('Portfolio', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client'
  },
  data: {
    type: Object,
    required: true
  },
  deployUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

console.log("cors has been used");


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


// Utility function to generate static files
const generateStaticFiles = async (portfolioData, buildDir) => {
  // Create build directory if it doesn't exist
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  // Generate index.html with portfolio data
  const template = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${portfolioData.title || 'Portfolio'}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <div id="portfolio-root">
          ${generatePortfolioHTML(portfolioData)}
        </div>
      </body>
    </html>
  `;
  
  fs.writeFileSync(path.join(buildDir, 'index.html'), template);
  fs.writeFileSync(path.join(buildDir, 'styles.css'), generateStyles(portfolioData));
};






app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
})

// User registration
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await Client.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new Client({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Client.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Save portfolio
app.post('/api/portfolio', authenticateToken, async (req, res) => {
  try {
    const { data } = req.body;
    const userId = req.user.userId;
    console.log(data);
    // Find and update or create new portfolio
    await Portfolio.findOneAndUpdate(
      { userId },
      { userId, data },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: 'Portfolio saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }y
});
// Fetch portfolio
// app.get('/api/portfolio', authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const portfolio = await Portfolio.findOne({ userId });

//     if (!portfolio) {
//       return res.status(404).json({ message: 'Portfolio not found' });
//     }

//     res.json(portfolio.data);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

  // app.get('/api/portfolio', authenticateToken, async (req, res) => {
  //   try {
  //     const userId = req.user.userId;
  //     console.log('Fetching portfolio for userId:', userId); // Debug log
      
  //     const portfolio = await Portfolio.findOne({ userId });
  //     console.log('Found portfolio:', portfolio); // Debug log
      
  //     if (!portfolio) {
  //       return res.status(404).json({ message: 'Portfolio not found' });
  //     }
  //     res.json(portfolio.data);
  //   } catch (error) {
  //     console.error('Server error:', error); // More detailed error logging
  //     res.status(500).json({ message: 'Server error', error: error.message });
  //   }
  // });


  app.get('/api/portfolio', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      
      // Validate userId
      if (!userId) {
        console.error('No userId provided in request');
        return res.status(400).json({ message: 'UserId is required' });
      }
      
      console.log('Attempting to fetch portfolio for userId:', userId);
  
      // Check MongoDB connection
      if (mongoose.connection.readyState !== 1) {
        console.error('MongoDB connection is not ready');
        return res.status(500).json({ message: 'Database connection error' });
      }
  
      // Fetch portfolio with error handling
      let portfolio;
      try {
        portfolio = await Portfolio.findOne({ userId });
        console.log('Database query completed');
      } catch (dbError) {
        console.error('Database query error:', dbError);
        return res.status(500).json({ message: 'Database query failed', error: dbError.message });
      }
  
      // Log the found portfolio (but sanitize sensitive data)
      console.log('Portfolio found:', portfolio ? 'Yes' : 'No');
      
      if (!portfolio) {
        console.log(`No portfolio found for userId: ${userId}`);
        return res.status(404).json({ message: 'Portfolio not found' });
      }
  
      // Validate portfolio data
      if (!portfolio.data) {
        console.error(`Portfolio found but no data for userId: ${userId}`);
        return res.status(404).json({ message: 'Portfolio data is empty' });
      }
  
      // Set proper headers
      res.setHeader('Content-Type', 'application/json');
      
      // Send response
      res.json(portfolio.data);
  
    } catch (error) {
      console.error('Unexpected server error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({ 
        message: 'Server error', 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });

async function getFilesFromDirectory(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory()) {
      files.push(...await getFilesFromDirectory(fullPath));
    } else {
      const file = {
        file: item.name,
        data: fs.readFileSync(fullPath),
        encoding: 'base64'
      };
      files.push(file);
    }
  }

  return files;
}

app.post('/api/portfolio/:id/deploy', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const portfolio = await Portfolio.findOne({ userId });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Create temporary directory for the build
    const buildDir = path.join(__dirname, 'temp', userId);
    
    // Generate static files based on portfolio data
    await generateStaticFiles(portfolio.data, buildDir);

    // Configure Vercel deployment
    const vercelConfig = {
      token: process.env.VERCEL_ACCESS_TOKEN,
      projectId: process.env.VERCEL_PROJECT_ID,
    };

    // Create deployment using Vercel API
    const deployment = await createDeployment({
      token: vercelConfig.token,
      project: vercelConfig.projectId,
      files: await getFilesFromDirectory(buildDir),
      builds: [
        {
          src: '**/*',
          use: '@vercel/static'
        }
      ]
    });

    // Wait for deployment to complete
    const deployUrl = `https://${deployment.url}`;
    
    // Save deployment URL to portfolio
    portfolio.deployUrl = deployUrl;
    await portfolio.save();

    // Clean up temporary directory
    fs.rmSync(buildDir, { recursive: true, force: true });

    res.json({ url: deployUrl });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      message: 'Deployment failed', 
      error: error.message 
    });
  }
}); 
// app.post('/api/portfolio/:id/deploy', authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const portfolio = await Portfolio.findOne({ userId });
    
//     if (!portfolio) {
//       return res.status(404).json({ message: 'Portfolio not found' });
//     }

//     // Create a temporary directory for the build
//     const buildDir = path.join(__dirname, 'temp', userId);
    
//     // Generate static files based on the portfolio data
//     await generateStaticFiles(portfolio.data, buildDir);

//     // Deploy to Netlify using their CLI
//      exec(`netlify deploy --dir ${buildDir} --prod`, async(error, stdout, stderr) => {
//       if (error) {
//         console.error('Deployment error:', error);
//         return res.status(500).json({ message: 'Deployment failed' });
//       }
      
//       // Extract the deployment URL from Netlify output
//       const deployUrl = stdout.match(/Website URL: (https:\/\/.+)/)[1];
      
//       // Save the deployment URL to the portfolio document
//       portfolio.deployUrl = deployUrl;
//       await portfolio.save();
      
//       res.json({ url: deployUrl });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

