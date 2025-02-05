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

// app.use(cors({
//   origin: ' http://localhost:5173/', // Be more specific in production
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.use(express.json());
app.use(cors());


// Connect to MongoDB
mongoose.connect('process.env.MONGODB_URI', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});



// User model
const Client = mongoose.model('Client', {
  email: String,
  password: String,
});

// Portfolio model
const Portfolio = mongoose.model('Portfolio', {
  userId: mongoose.Schema.Types.ObjectId,
  data: Object,
  deployUrl: String,
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

app.get('/api/portfolio', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('Fetching portfolio for userId:', userId); // Debug log
    
    const portfolio = await Portfolio.findOne({ userId });
    console.log('Found portfolio:', portfolio); // Debug log
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio.data);
  } catch (error) {
    console.error('Server error:', error); // More detailed error logging
    res.status(500).json({ message: 'Server error', error: error.message });
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

