# 🎯 Productivity Harnesser

A powerful productivity app that helps you stay focused by blocking distractions and requiring mindful daily goal setting.

## ✨ Features

- **Daily Goal Setting**: Must set meaningful goals each morning to unlock the app
- **Website Blocking**: Blocks access to distracting sites like Facebook, Instagram, YouTube, etc.
- **Notification Control**: Silences notifications except for essential apps you specify
- **Cross-Platform**: Works on desktop and mobile as a Progressive Web App (PWA)
- **Focus Mode**: Prevents access to blocked content until goals are completed
- **Offline Support**: Works even without internet connection

## 🚀 Quick Start

### Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   npm start
   ```

3. **Access the App**:
   - Open your browser and go to `http://localhost:3000`
   - On mobile: Add to home screen for app-like experience

### Mobile Installation

1. Open the app in your mobile browser
2. Look for "Add to Home Screen" option
3. Install as a native app
4. The app will work offline and block distracting websites

## 🎯 How It Works

### Daily Goal Setting
- Each morning, you must set meaningful goals (minimum 10 characters)
- The app remains locked until goals are set
- This ensures you start each day with intention

### Website Blocking
- Automatically blocks distracting websites
- Default blocked sites: Facebook, Instagram, YouTube, Twitter, TikTok, Reddit, Netflix, Twitch, Discord
- You can add/remove sites as needed
- Temporary bypass available (5 minutes)

### Notification Management
- Silences all notifications by default
- Allow specific apps: Messages, Phone Calls, Email, Calendar, Reminders
- Customizable notification preferences

## 🛠️ Customization

### Adding Blocked Sites
1. Open the app dashboard
2. Click "Manage Sites"
3. Add new websites to block
4. Remove sites you want to allow

### Notification Settings
1. Go to the Notifications section
2. Enable notifications if needed
3. Select which apps can send notifications
4. Save your preferences

## 🔧 Technical Details

### Architecture
- **Backend**: Node.js with Express
- **Frontend**: Vanilla JavaScript with modern CSS
- **PWA**: Service Worker for offline functionality
- **Storage**: In-memory (easily upgradeable to database)

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

### Mobile Support
- iOS Safari
- Android Chrome
- Progressive Web App features

## 🚀 Production Deployment

### Environment Setup
1. Set up a web server (Nginx, Apache, or cloud hosting)
2. Configure HTTPS (required for PWA features)
3. Set up a database for persistent storage
4. Configure environment variables

### Database Integration
Replace the in-memory storage in `server.js` with a database:
- MongoDB
- PostgreSQL
- SQLite
- Firebase

### Security Considerations
- Implement user authentication
- Add rate limiting
- Use HTTPS in production
- Validate all inputs
- Implement proper CORS policies

## 📱 PWA Features

- **Installable**: Add to home screen on mobile/desktop
- **Offline**: Works without internet connection
- **Push Notifications**: (Future feature)
- **Background Sync**: (Future feature)

## 🎨 Customization

### Themes
The app supports:
- Light mode (default)
- Dark mode (automatic based on system preference)
- Custom color schemes (modify CSS variables)

### Branding
- Update `manifest.json` for app name/description
- Replace icons in `/public/` directory
- Modify colors in `styles.css`

## 🔮 Future Features

- [ ] User accounts and data sync
- [ ] Advanced analytics and insights
- [ ] Team/family sharing
- [ ] Advanced scheduling
- [ ] Integration with calendar apps
- [ ] AI-powered goal suggestions
- [ ] Habit tracking
- [ ] Focus sessions with timers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use and modify for your needs.

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Ensure you're using a supported browser
3. Try clearing browser cache
4. Restart the server

## 🎯 Philosophy

This app is designed around the principle that **mindful intention leads to meaningful productivity**. By requiring daily goal setting and blocking distractions, it helps you:

- Start each day with purpose
- Stay focused on what matters
- Build better habits
- Achieve your goals
- Live a more meaningful life

Remember: The goal isn't to be busy, but to be productive in ways that align with your values and aspirations.
