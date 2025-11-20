// Background script for Productivity Harnesser extension

// Default blocked sites
const DEFAULT_BLOCKED_SITES = [
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
  'discord.com',
  'snapchat.com',
  'pinterest.com',
  'linkedin.com/feed',
  '9gag.com',
  'imgur.com',
  'buzzfeed.com',
  'dailymail.co.uk',
  'huffpost.com',
  'cnn.com/entertainment',
  'tmz.com'
];

// Initialize extension data
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get([
    'blockedSites',
    'dailyGoals',
    'lastGoalDate',
    'isBlockingActive',
    'allowedNotifications'
  ]);

  if (!data.blockedSites) {
    await chrome.storage.local.set({
      blockedSites: DEFAULT_BLOCKED_SITES,
      dailyGoals: '',
      lastGoalDate: null,
      isBlockingActive: true,
      allowedNotifications: []
    });
  }

  // Set up daily reset alarm
  chrome.alarms.create('dailyReset', {
    when: getNextMidnight(),
    periodInMinutes: 24 * 60 // 24 hours
  });
});

// Handle daily reset
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyReset') {
    resetDailyGoals();
  }
});

// Listen for tab updates to check for blocked sites
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    await checkAndBlockSite(tabId, tab.url);
  }
});

// Check if a site should be blocked
async function checkAndBlockSite(tabId, url) {
  try {
    const data = await chrome.storage.local.get([
      'blockedSites',
      'dailyGoals',
      'lastGoalDate',
      'isBlockingActive'
    ]);

    // Check if blocking is active and goals are set
    const today = new Date().toDateString();
    const hasGoalsToday = data.lastGoalDate === today && data.dailyGoals;
    
    if (!data.isBlockingActive || !hasGoalsToday) {
      return;
    }

    // Check if URL matches any blocked site
    const blockedSites = data.blockedSites || [];
    const isBlocked = blockedSites.some(site => {
      try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        const siteLower = site.toLowerCase();
        
        // Handle sites with paths (e.g., "youtube.com/shorts")
        if (siteLower.includes('/')) {
          const siteParts = siteLower.split('/');
          const siteHostname = siteParts[0];
          const sitePath = siteParts.slice(1).join('/');
          const urlPath = urlObj.pathname.toLowerCase();
          
          // Check if hostname matches and path matches (if specified)
          if (hostname === siteHostname || hostname.endsWith('.' + siteHostname)) {
            if (!sitePath || urlPath.startsWith('/' + sitePath) || urlPath === '/' + sitePath) {
              return true;
            }
          }
        } else {
          // For sites without paths, check exact match or subdomain
          return hostname === siteLower || hostname.endsWith('.' + siteLower);
        }
        
        return false;
      } catch (e) {
        return false;
      }
    });

    if (isBlocked) {
      // Redirect to blocked page
      await chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL('blocked.html')
      });
    }
  } catch (error) {
    console.error('Error checking blocked sites:', error);
  }
}

// Reset daily goals at midnight
async function resetDailyGoals() {
  await chrome.storage.local.set({
    dailyGoals: '',
    lastGoalDate: null
  });
  
  // Notify content scripts
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { action: 'goalsReset' }).catch(() => {
        // Ignore errors for tabs that don't have content script
      });
    });
  });
}

// Get next midnight timestamp
function getNextMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime();
}

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'getStatus':
      chrome.storage.local.get([
        'blockedSites',
        'dailyGoals',
        'lastGoalDate',
        'isBlockingActive',
        'allowedNotifications'
      ]).then(sendResponse);
      return true;

    case 'setGoals':
      chrome.storage.local.set({
        dailyGoals: request.goals,
        lastGoalDate: new Date().toDateString()
      }).then(() => sendResponse({ success: true }));
      return true;

    case 'toggleBlocking':
      chrome.storage.local.set({
        isBlockingActive: request.active
      }).then(() => sendResponse({ success: true }));
      return true;

    case 'updateBlockedSites':
      chrome.storage.local.set({
        blockedSites: request.sites
      }).then(() => sendResponse({ success: true }));
      return true;

    case 'updateNotifications':
      chrome.storage.local.set({
        allowedNotifications: request.notifications
      }).then(() => sendResponse({ success: true }));
      return true;
  }
});
