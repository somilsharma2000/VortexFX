/* ============================================
   FORTREX — SHARED AUTH MODULE
   Handles Discord OAuth, guild membership check,
   session management, API calls, and
   FULL STEALTH MODE — nothing visible until login.
   ============================================ */

const FORTREX_AUTH = {
  API_BASE: 'https://koda-a0d26f88.base44.app/functions',
  
  DISCORD_CLIENT_ID: '1536976658836230254',
  DISCORD_REDIRECT_URI: 'https://somilsharma2000.github.io/VortexFX/signin.html',
  DISCORD_SCOPES: 'identify guilds',
  DISCORD_GUILD_ID: '1526348728108322946',
  DISCORD_INVITE: 'https://discord.gg/9pTSqeTbn',
  
  TRADER_KEY: 'fortrex_trader',
  TOKEN_KEY: 'fortrex_discord_token',
  
  // PUBLIC pages — accessible without login
  PUBLIC_PAGES: ['index.html', 'terms.html', 'privacy.html', 'signin.html', '404.html', ''],
  
  // ALL other pages require authentication
  isLoggedIn() {
    try {
      const trader = localStorage.getItem(this.TRADER_KEY);
      return trader ? JSON.parse(trader) : null;
    } catch (e) {
      return null;
    }
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
  }
};

// ===== FULL STEALTH MODE LOCK =====
// Only index.html, terms.html, privacy.html, signin.html are public.
// EVERYTHING else requires authentication — redirect to index.html if not logged in.
(function() {
  const currentPage = window.location.pathname.split('/').pop();
  const trader = FORTREX_AUTH.isLoggedIn();
  
  // If on a public page, allow access
  if (FORTREX_AUTH.PUBLIC_PAGES.includes(currentPage)) return;
  
  // admin.html has its own passcode gate — don't redirect it
  if (currentPage === 'admin.html') return;
  
  // All other pages — require login
  if (!trader) {
    window.location.href = 'index.html';
    return;
  }
  
  // If banned, redirect to index
  if (trader.banned) {
    localStorage.removeItem(FORTREX_AUTH.TRADER_KEY);
    localStorage.removeItem(FORTREX_AUTH.TOKEN_KEY);
    window.location.href = 'index.html';
    return;
  }
})();
