const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store user data in memory (in production, use a database)
let userData = {
  dailyGoals: null,
  blockedSites: [
    'facebook.com',
    'instagram.com', 
    'youtube.com',
    'youtube.com/shorts',
    'twitter.com',
    'x.com',
    'tiktok.com',
    'reddit.com',
    'netflix.com',
    'twitch.tv',
    'discord.com'
  ],
  allowedNotifications: [],
  isBlockingActive: true,
  lastGoalDate: null
};

// API Routes
app.get('/api/status', (req, res) => {
  const today = new Date().toDateString();
  const hasGoalsToday = userData.lastGoalDate === today && userData.dailyGoals;
  
  res.json({
    hasGoalsToday,
    dailyGoals: userData.dailyGoals,
    blockedSites: userData.blockedSites,
    allowedNotifications: userData.allowedNotifications,
    isBlockingActive: userData.isBlockingActive
  });
});

app.post('/api/goals', (req, res) => {
  const { goals } = req.body;
  if (!goals || goals.trim().length < 10) {
    return res.status(400).json({ error: 'Please provide meaningful goals (at least 10 characters)' });
  }
  
  userData.dailyGoals = goals;
  userData.lastGoalDate = new Date().toDateString();
  
  res.json({ success: true, message: 'Goals set successfully!' });
});

app.post('/api/notifications', (req, res) => {
  const { allowed } = req.body;
  userData.allowedNotifications = allowed || [];
  res.json({ success: true });
});

app.post('/api/blocking', (req, res) => {
  const { active } = req.body;
  userData.isBlockingActive = active;
  res.json({ success: true });
});

app.post('/api/sites', (req, res) => {
  const { sites } = req.body;
  userData.blockedSites = sites || [];
  res.json({ success: true });
});

// Serve the main app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Productivity Harnesser running on http://localhost:${PORT}`);
  console.log('Install as PWA on mobile/desktop for full functionality');
});
