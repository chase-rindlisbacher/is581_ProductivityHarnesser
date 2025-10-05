// Popup script for Productivity Harnesser extension

class PopupApp {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadStatus();
        this.setupEventListeners();
        this.updateUI();
    }

    async loadStatus() {
        try {
            const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
            this.data = response;
        } catch (error) {
            console.error('Failed to load status:', error);
        }
    }

    setupEventListeners() {
        // Goals
        document.getElementById('save-goals').addEventListener('click', () => this.saveGoals());
        
        // Blocking toggle
        document.getElementById('blocking-toggle').addEventListener('change', (e) => {
            this.toggleBlocking(e.target.checked);
        });
        
        // Action buttons
        document.getElementById('manage-sites').addEventListener('click', () => {
            this.openDashboard();
        });
        
        document.getElementById('open-dashboard').addEventListener('click', () => {
            this.openDashboard();
        });
    }

    updateUI() {
        if (!this.data) return;

        const today = new Date().toDateString();
        const hasGoalsToday = this.data.lastGoalDate === today && this.data.dailyGoals;
        
        // Update status indicator
        const statusText = document.getElementById('status-text');
        const statusDot = document.querySelector('.status-dot');
        
        if (hasGoalsToday) {
            statusText.textContent = 'Goals Set - Focus Active';
            statusDot.style.background = '#10b981';
        } else {
            statusText.textContent = 'Set Goals to Unlock';
            statusDot.style.background = '#f59e0b';
        }

        // Update goals section
        if (hasGoalsToday) {
            document.getElementById('goals-text').textContent = 'Goals set for today!';
            document.getElementById('goals-input').value = this.data.dailyGoals;
            document.getElementById('goals-input').style.display = 'none';
            document.getElementById('save-goals').textContent = 'Edit Goals';
        } else {
            document.getElementById('goals-text').textContent = 'Set your goals to unlock focus mode';
            document.getElementById('goals-input').style.display = 'block';
            document.getElementById('save-goals').textContent = 'Set Goals';
        }

        // Update blocking toggle
        document.getElementById('blocking-toggle').checked = this.data.isBlockingActive;
        document.getElementById('blocking-status').textContent = this.data.isBlockingActive ? 'Active' : 'Inactive';

        // Update stats (mock data for now)
        this.updateStats();
    }

    async saveGoals() {
        const goalsInput = document.getElementById('goals-input');
        const goals = goalsInput.value.trim();
        
        if (goals.length < 10) {
            this.showError('Please write meaningful goals (at least 10 characters)');
            return;
        }

        try {
            const response = await chrome.runtime.sendMessage({
                action: 'setGoals',
                goals: goals
            });

            if (response.success) {
                await this.loadStatus();
                this.updateUI();
                this.showSuccess('Goals set successfully!');
            }
        } catch (error) {
            this.showError('Failed to save goals');
        }
    }

    async toggleBlocking(active) {
        try {
            const response = await chrome.runtime.sendMessage({
                action: 'toggleBlocking',
                active: active
            });

            if (response.success) {
                this.data.isBlockingActive = active;
                document.getElementById('blocking-status').textContent = active ? 'Active' : 'Inactive';
            }
        } catch (error) {
            this.showError('Failed to update blocking settings');
        }
    }

    openDashboard() {
        // Open the main web app in a new tab
        chrome.tabs.create({
            url: 'http://localhost:3000'
        });
        window.close();
    }

    updateStats() {
        // Mock stats - in a real implementation, these would be tracked
        const blockedCount = Math.floor(Math.random() * 20) + 5;
        const focusTime = Math.floor(Math.random() * 8) + 1;
        
        document.getElementById('blocked-count').textContent = blockedCount;
        document.getElementById('focus-time').textContent = focusTime + 'h';
    }

    showError(message) {
        // Simple error display
        const originalText = document.getElementById('save-goals').textContent;
        document.getElementById('save-goals').textContent = message;
        document.getElementById('save-goals').style.background = '#ef4444';
        
        setTimeout(() => {
            document.getElementById('save-goals').textContent = originalText;
            document.getElementById('save-goals').style.background = '';
        }, 3000);
    }

    showSuccess(message) {
        // Simple success display
        const originalText = document.getElementById('save-goals').textContent;
        document.getElementById('save-goals').textContent = message;
        document.getElementById('save-goals').style.background = '#10b981';
        
        setTimeout(() => {
            document.getElementById('save-goals').textContent = originalText;
            document.getElementById('save-goals').style.background = '';
        }, 2000);
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PopupApp();
});
