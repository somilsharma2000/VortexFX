/* ============================================
   FORTREX — SHARED AUTH MODULE
   Handles Discord OAuth, guild membership check,
   session management, API calls, and
   PRE-LAUNCH STEALTH MODE.
   ============================================ */

const FORTREX_AUTH = {
  API_BASE: 'https://koda-a0d26f88.base44.app/functions',
  
  DISCORD_CLIENT_ID: '1536976658836230254',
  DISCORD_REDIRECT_URI: 'https://somilsharma2000.github.io/VortexFX/signin.html',
  // 'identify' + 'guilds' = we check if user is in our Discord server
  DISCORD_SCOPES: 'identify guilds',
  DISCORD_GUILD_ID: '1526348728108322946',
  DISCORD_INVITE: 'https://discord.gg/9pTSqeTbn',
  
  TRADER_KEY: 'fortrex_trader',
  TOKEN_KEY: 'fortrex_discord_token',
  
  // Pre-launch: pages that require login
  LOCKED_PAGES: ['profile.html', 'checkin.html'],
  
  isLoggedIn() {
    const trader = localStorage.getItem(this.TRADER_KEY);
    return trader ? JSON.parse(trader) : null;
  },
  
  loginWithDiscord(referralCode) {
    const params = new URLSearchParams({
      client_id: this.DISCORD_CLIENT_ID,
      redirect_uri: this.DISCORD_REDIRECT_URI,
      response_type: 'token',
      scope: this.DISCORD_SCOPES
    });
    
    if (referralCode) {
      params.set('state', referralCode);
    }
    
    window.location.href = `https://discord.com/api/oauth2/authorize?${params.toString()}`;
  },
  
  async handleCallback() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const state = params.get('state');
    
    if (!accessToken) return null;
    
    window.history.replaceState({}, document.title, window.location.pathname);
    
    try {
      const response = await fetch(`${this.API_BASE}/discordAuth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: accessToken,
          referral_code: state || ''
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem(this.TRADER_KEY, JSON.stringify(data.trader));
        localStorage.setItem(this.TOKEN_KEY, accessToken);
        return data;
      } else {
        // If the error is about guild membership, show the join link
        if (data.error && data.error.includes('Discord server')) {
          return { 
            success: false, 
            error: data.error,
            needs_guild: true,
            invite_url: this.DISCORD_INVITE
          };
        }
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to connect to server' };
    }
  },
  
  logout() {
    localStorage.removeItem(this.TRADER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    window.location.href = 'index.html';
  },
  
  async callFunction(name, payload) {
    try {
      const response = await fetch(`${this.API_BASE}/${name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await response.json();
    } catch (err) {
      return { success: false, error: 'Network error' };
    }
  },
  
  updateNav() {
    const trader = this.isLoggedIn();
    const navCta = document.querySelector('.nav-cta');
    if (!navCta) return;
    
    if (trader) {
      // Show username as a small label before the button
      const enterBtn = navCta.querySelector('.btn-primary');
      if (enterBtn) {
        // Create username display
        const username = trader.username || trader.trader_username || 'Trader';
        const userSpan = document.createElement('span');
        userSpan.className = 'nav-username';
        userSpan.textContent = username;
        userSpan.style.cssText = 'color: rgba(229,193,88,0.8); font-size: 12px; font-weight: 500; padding-right: 8px; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
        userSpan.title = username;
        userSpan.onclick = () => { window.location.href = 'profile.html'; };
        userSpan.style.cursor = 'pointer';
        enterBtn.parentNode.insertBefore(userSpan, enterBtn);
        
        // Transform button to logout
        enterBtn.textContent = 'Logout';
        enterBtn.href = '#';
        enterBtn.onclick = (e) => {
          e.preventDefault();
          this.logout();
        };
      }
      
      // Show internal nav links
      document.querySelectorAll('.nav-internal').forEach(el => el.style.display = '');
    }
  }
};

// ===== PRE-LAUNCH STEALTH MODE LOCK =====
(function() {
  const currentPage = window.location.pathname.split('/').pop();
  const trader = FORTREX_AUTH.isLoggedIn();
  
  // admin.html has its own passcode gate — don't redirect it
  if (currentPage === 'admin.html') return;
  if (FORTREX_AUTH.LOCKED_PAGES.includes(currentPage) && !trader) {
    window.location.href = 'index.html';
    return;
  }
})();

// Auto-update nav on every page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FORTREX_AUTH.updateNav());
} else {
  FORTREX_AUTH.updateNav();
}
