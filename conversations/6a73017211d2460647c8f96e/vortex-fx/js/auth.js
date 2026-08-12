/* ============================================
   FORTEX FX — SHARED AUTH MODULE
   Handles Discord OAuth, session management,
   API calls, and PRE-LAUNCH STEALTH MODE.
   ============================================ */

const FORTEX_AUTH = {
  API_BASE: 'https://api.base44.com/v1/apps/6a73016f9b626430a0d26f88/functions',
  
  DISCORD_CLIENT_ID: '1536976658836230254',
  DISCORD_REDIRECT_URI: 'https://somilsharma2000.github.io/VortexFX/signin.html',
  DISCORD_SCOPES: 'identify',
  
  TRADER_KEY: 'fortex_trader',
  TOKEN_KEY: 'fortex_discord_token',
  
  // Pre-launch: pages that require login
  LOCKED_PAGES: ['profile.html', 'checkin.html', 'leaderboard.html', 'offers.html', 'invite.html', 'admin.html', 'resources.html'],
  
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

// ===== PRE-LAUNCH STEALTH MODE LOCK =====
// All inner pages redirect to homepage unless logged in
(function() {
  const currentPage = window.location.pathname.split('/').pop();
  const trader = FORTEX_AUTH.isLoggedIn();
  
  if (FORTEX_AUTH.LOCKED_PAGES.includes(currentPage) && !trader) {
    window.location.href = 'index.html';
    return;
  }
})();

// Auto-update nav on every page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => FORTEX_AUTH.updateNav());
} else {
  FORTEX_AUTH.updateNav();
}
