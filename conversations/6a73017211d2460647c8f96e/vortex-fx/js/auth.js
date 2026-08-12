/* ============================================
   FORTEX FX — SHARED AUTH MODULE
   Handles Discord OAuth, session management,
   and API calls to Base44 backend functions.
   Included on every page for auth state.
   ============================================ */

const FORTEX_AUTH = {
  // Base44 backend function endpoint
  API_BASE: 'https://api.base44.com/v1/apps/6a73016f9b626430a0d26f88/functions',
  
  // Discord OAuth config (client_id will be set by Somil)
  DISCORD_CLIENT_ID: 'PLACEHOLDER_REPLACE_WITH_DISCORD_CLIENT_ID',
  DISCORD_REDIRECT_URI: 'https://somilsharma2000.github.io/VortexFX/signin.html',
  DISCORD_SCOPES: 'identify',
  
  // Storage keys
  TRADER_KEY: 'fortex_trader',
  TOKEN_KEY: 'fortex_discord_token',
  
  // ===== CHECK IF LOGGED IN =====
  isLoggedIn() {
    const trader = localStorage.getItem(this.TRADER_KEY);
    return trader ? JSON.parse(trader) : null;
  },
  
  // ===== INITIATE DISCORD LOGIN =====
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
  
  // ===== HANDLE OAUTH CALLBACK =====
  async handleCallback() {
    // Check URL fragment for access_token (implicit flow)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const state = params.get('state'); // referral code
    
    if (!accessToken) return null;
    
    // Clean the URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    // Call backend function to verify and create trader
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
        // Store trader info
        localStorage.setItem(this.TRADER_KEY, JSON.stringify(data.trader));
        localStorage.setItem(this.TOKEN_KEY, accessToken);
        return data;
      } else {
        return { success: false, error: data.error };
      }
    } catch (err) {
      return { success: false, error: 'Failed to connect to server' };
    }
  },
  
  // ===== LOGOUT =====
  logout() {
    localStorage.removeItem(this.TRADER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    window.location.href = 'index.html';
  },
  
  // ===== CALL BACKEND FUNCTION =====
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
  
  // ===== UPDATE NAV BASED ON LOGIN STATE =====
  updateNav() {
    const trader = this.isLoggedIn();
    const navCta = document.querySelector('.nav-cta');
    if (!navCta) return;
    
    if (trader) {
      // User is logged in — show profile + logout
      const signinLink = navCta.querySelector('a[href="signin.html"]');
      if (signinLink) {
        signinLink.textContent = trader.username || 'Profile';
        signinLink.href = 'profile.html';
      }
      
      const enterBtn = navCta.querySelector('.btn-primary');
      if (enterBtn) {
        enterBtn.textContent = 'Logout';
        enterBtn.href = '#';
        enterBtn.onclick = (e) => {
          e.preventDefault();
          this.logout();
        };
      }
    }
  }
};

// Auto-update nav on every page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FORTEX_AUTH.updateNav());
} else {
  FORTEX_AUTH.updateNav();
}
