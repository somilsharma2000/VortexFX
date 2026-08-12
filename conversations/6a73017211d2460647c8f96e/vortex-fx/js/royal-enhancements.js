/* ==========================================================================
   FORTREX FX — Royal Enhancement Scripts
   Interactive features extracted from reference designs
   ========================================================================== */

// REX Calculator (from landing page reference)
class RexCalculator {
    constructor() {
        this.volume = 50;
        this.winRate = 60;
        this.rexRate = 0.485;
    }

    calculate(volume, winRate) {
        const baseRex = volume * 12;
        const winMultiplier = winRate / 100;
        const tournamentBonus = volume > 100 ? 1.5 : 1.0;
        const genesisMultiplier = 1.25;
        const totalRex = Math.round(baseRex * winMultiplier * tournamentBonus * genesisMultiplier);
        const usdValue = (totalRex * this.rexRate).toFixed(2);
        return { rex: totalRex, usd: usdValue };
    }
}

// Countdown Timer (for tournament/tournament reveal)
class CountdownTimer {
    constructor(targetDate, elementId) {
        this.target = new Date(targetDate).getTime();
        this.elementId = elementId;
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    update() {
        const now = Date.now();
        const diff = this.target - now;
        if (diff <= 0) {
            document.getElementById(this.elementId).innerHTML = 'LAUNCHED';
            clearInterval(this.interval);
            return;
        }
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        const el = document.getElementById(this.elementId);
        if (el) {
            el.innerHTML = `${days}d ${String(hours).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m ${String(secs).padStart(2,'0')}s`;
        }
    }
}

// Scroll-triggered fade-in animations
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-up');
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        this.elements.forEach(el => {
            el.style.opacity = '0';
            this.observer.observe(el);
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
});
