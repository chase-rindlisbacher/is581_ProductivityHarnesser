// Content script for Productivity Harnesser extension

// Check if this is a blocked page
if (window.location.href.includes('blocked.html')) {
  return;
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'goalsReset') {
    // Handle goals reset if needed
    console.log('Daily goals have been reset');
  }
});

// Check if current site should be blocked
async function checkCurrentSite() {
  try {
    const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
    
    if (!response) return;
    
    const { blockedSites, dailyGoals, lastGoalDate, isBlockingActive } = response;
    const today = new Date().toDateString();
    const hasGoalsToday = lastGoalDate === today && dailyGoals;
    
    // If blocking is active and goals are set, check current URL
    if (isBlockingActive && hasGoalsToday) {
      const currentUrl = window.location.href;
      const isBlocked = blockedSites.some(site => {
        try {
          const urlObj = new URL(currentUrl);
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
        window.location.href = chrome.runtime.getURL('blocked.html');
      }
    }
  } catch (error) {
    console.error('Error checking blocked sites:', error);
  }
}

// Run check when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkCurrentSite);
} else {
  checkCurrentSite();
}
