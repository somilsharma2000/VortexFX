/* ============================================
   VortexFX — Registration Counter & Locked Tournaments
   ============================================ */

// Registration counter state
const REG_TARGET = 10000;
const STORAGE_KEY = 'vortexfx_reg_count';

function getRegCount() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return parseInt(stored);
  // Start at a believable number
  return 3742;
}

function saveRegCount(count) {
  localStorage.setItem(STORAGE_KEY, count.toString());
}

function initRegCounter(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let count = getRegCount();
  const targetStr = REG_TARGET.toLocaleString();
  
  // Render the counter
  el.innerHTML = `
    <div class="reg-counter">
      <div class="reg-counter-label">LIVE REGISTRATION COUNTER</div>
      <div class="reg-counter-numbers" id="reg-digits"></div>
      <div class="reg-counter-target">TARGET: ${targetStr} TRADERS</div>
      <div class="reg-counter-progress">
        <div class="reg-counter-bar" id="reg-bar" style="width: ${(count/REG_TARGET)*100}%"></div>
      </div>
      <div class="reg-counter-target" id="reg-percent">${((count/REG_TARGET)*100).toFixed(1)}% — ${(REG_TARGET - count).toLocaleString()} SLOTS REMAINING</div>
    </div>
  `;

  // Render digits
  const digitsContainer = document.getElementById('reg-digits');
  function renderDigits(num) {
    const padded = num.toString().padStart(5, '0');
    digitsContainer.innerHTML = '';
    for (const digit of padded) {
      const d = document.createElement('div');
      d.className = 'reg-digit';
      d.textContent = digit;
      digitsContainer.appendChild(d);
    }
  }

  renderDigits(count);

  // Simulate live registrations
  function tick() {
    // Random increment: sometimes 1, sometimes 2-5, occasionally a burst
    const burst = Math.random() > 0.95 ? Math.floor(Math.random() * 8) + 3 : Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
    if (burst > 0 && count < REG_TARGET) {
      count = Math.min(count + burst, REG_TARGET);
      saveRegCount(count);
      
      // Animate digits
      const oldDigits = digitsContainer.querySelectorAll('.reg-digit');
      const oldStr = (count - burst).toString().padStart(5, '0');
      const newStr = count.toString().padStart(5, '0');
      
      oldDigits.forEach((d, i) => {
        if (oldStr[i] !== newStr[i]) {
          d.classList.add('flip');
          setTimeout(() => {
            d.textContent = newStr[i];
            d.classList.remove('flip');
          }, 300);
        }
      });

      // Update progress bar
      const bar = document.getElementById('reg-bar');
      if (bar) bar.style.width = ((count / REG_TARGET) * 100) + '%';
      
      const pct = document.getElementById('reg-percent');
      if (pct) {
        const remaining = REG_TARGET - count;
        if (remaining > 0) {
          pct.textContent = `${((count/REG_TARGET)*100).toFixed(1)}% — ${remaining.toLocaleString()} SLOTS REMAINING`;
        } else {
          pct.textContent = 'TARGET REACHED — ALL TOURNAMENTS UNLOCKED';
          pct.style.color = 'var(--cyan-bright)';
          // Unlock tournaments
          document.querySelectorAll('.tournament-locked').forEach(el => {
            el.classList.remove('tournament-locked');
            el.querySelector('.lock-overlay')?.remove();
          });
        }
      }
    }
  }

  // Run tick every 2-5 seconds
  function scheduleTick() {
    tick();
    setTimeout(scheduleTick, 2000 + Math.random() * 3000);
  }
  scheduleTick();
}

// Lock tournaments on page load
function initLockedTournaments() {
  const count = getRegCount();
  if (count < REG_TARGET) {
    // Add lock overlay to free tournament cards
    document.querySelectorAll('[data-tournament="free"]').forEach(card => {
      if (!card.classList.contains('tournament-locked')) {
        card.classList.add('tournament-locked');
        const overlay = document.createElement('div');
        overlay.className = 'lock-overlay';
        overlay.innerHTML = `
          <div class="lock-icon">
            <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
          </div>
          <div class="lock-title">Tournament Locked</div>
          <div class="lock-desc">Unlocks when we reach ${REG_TARGET.toLocaleString()} registered traders</div>
          <div class="lock-progress">
            <div class="lock-progress-fill" style="width: ${(count/REG_TARGET)*100}%"></div>
          </div>
          <div class="lock-progress-text">${count.toLocaleString()} / ${REG_TARGET.toLocaleString()}</div>
        `;
        card.appendChild(overlay);
      }
    });
  }
}

// Auto-init on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initLockedTournaments();
    const counterEl = document.getElementById('reg-counter');
    if (counterEl) initRegCounter('reg-counter');
  });
} else {
  initLockedTournaments();
  const counterEl = document.getElementById('reg-counter');
  if (counterEl) initRegCounter('reg-counter');
}
