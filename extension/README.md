# 🎯 Productivity Harnesser Browser Extension

**System-wide website blocking that actually works!**

This browser extension provides **true system-wide blocking** that prevents access to distracting websites across all tabs, windows, and even new browser sessions.

## 🚀 **Why This Extension is Different**

Unlike the web app, this extension:
- ✅ **Blocks websites system-wide** across all tabs and windows
- ✅ **Works even if you try to open new tabs**
- ✅ **Prevents access to blocked sites completely**
- ✅ **Redirects to motivational blocking page**
- ✅ **Requires daily goals to unlock blocking**

## 📦 **Installation**

### Chrome Installation
1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `extension` folder: `/Users/elcdevmbp/IS_581/ProductivityHarnesser/extension`
5. Pin the extension to your toolbar

### Firefox Installation
1. Open Firefox and go to `about:debugging`
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select `manifest.json` from the extension folder

## 🎯 **How It Works**

### Daily Goal Requirement
- **Must set goals each morning** to unlock the extension
- **Goals reset at midnight** - fresh start each day
- **Extension locks** until meaningful goals are set

### System-Wide Blocking
- **Blocks across ALL tabs** - not just one tab
- **Works on new tabs** you try to open
- **Redirects blocked sites** to motivational page
- **Prevents circumvention** by opening new windows

### Default Blocked Sites
- Facebook, Instagram, YouTube, Twitter, TikTok
- Reddit, Netflix, Twitch, Discord, Snapchat
- Pinterest, LinkedIn feed, 9gag, Imgur
- BuzzFeed, Daily Mail, HuffPost, TMZ

## 🛠️ **Usage**

### Morning Setup
1. **Click extension icon** in browser toolbar
2. **Set your daily goals** (minimum 10 characters)
3. **Enable blocking** if not already on
4. **Start your focused work day!**

### During the Day
- **Try to visit blocked sites** → redirected to motivational page
- **Extension popup** shows your progress and stats
- **Goals reminder** keeps you focused on what matters

### Emergency Access
- **Temporary bypass** available (5 minutes)
- **Edit goals** to unlock if needed
- **Toggle blocking** off if necessary

## ⚡ **Quick Controls**

### Extension Popup
- **Set daily goals** quickly
- **Toggle blocking** on/off
- **View focus statistics**
- **Open full dashboard**

### Full Dashboard
- **Manage blocked sites** (add/remove)
- **Notification settings**
- **Advanced configuration**
- **Progress tracking**

## 🔧 **Technical Details**

### Architecture
- **Manifest V3** for Chrome compatibility
- **Content scripts** for page-level blocking
- **Background service worker** for system-wide control
- **Local storage** for user data

### Permissions
- **Storage**: Save user settings and goals
- **Tabs**: Monitor and redirect blocked sites
- **ActiveTab**: Access current tab information
- **DeclarativeNetRequest**: Block network requests
- **Alarms**: Daily reset functionality

### Security
- **All data stored locally** on your device
- **No external servers** or data collection
- **Open source** and transparent
- **You control everything**

## 🎨 **Features**

### Smart Blocking
- **Real-time detection** of blocked sites
- **Instant redirection** to motivational page
- **Prevents new tab circumvention**
- **Works across browser sessions**

### Goal Management
- **Daily goal requirement** for unlocking
- **Meaningful goal validation** (minimum 10 characters)
- **Automatic reset** at midnight
- **Progress tracking** throughout the day

### User Experience
- **Beautiful blocking page** with motivation
- **Extension popup** for quick controls
- **Full dashboard** for advanced settings
- **Mobile-responsive** design

## 🚨 **Troubleshooting**

### Extension Not Blocking Sites?
1. **Check if goals are set** for today
2. **Verify blocking is enabled** in popup
3. **Try refreshing the page**
4. **Check if site is in blocked list**
5. **Restart your browser**

### Goals Not Saving?
1. **Check browser permissions**
2. **Try setting goals again**
3. **Restart the extension**
4. **Clear browser cache**

### Sites Not in Blocked List?
1. **Open full dashboard** (click "Full Dashboard")
2. **Go to Manage Sites**
3. **Add the website** you want to block
4. **Save changes**

## 🔮 **Future Features**

- [ ] **Advanced scheduling** (block during work hours)
- [ ] **Habit tracking** and analytics
- [ ] **Team/family sharing** of blocked sites
- [ ] **Integration with calendar** apps
- [ ] **AI-powered goal suggestions**
- [ ] **Focus session timers**
- [ ] **Productivity insights**

## 📱 **Mobile Support**

While this extension works on desktop browsers, for mobile devices:
1. **Use the web app** at `http://localhost:3000`
2. **Install as PWA** on your phone
3. **Use browser's built-in** site blocking features
4. **Consider mobile-specific** productivity apps

## 🎯 **Philosophy**

This extension is designed around the principle that **true productivity comes from eliminating distractions, not just managing them**. By requiring daily goal setting and providing system-wide blocking, it helps you:

- **Start each day with intention**
- **Stay focused on what matters**
- **Build better habits**
- **Achieve your goals**
- **Live a more meaningful life**

Remember: **Every blocked distraction is a step toward your dreams!** 🚀
