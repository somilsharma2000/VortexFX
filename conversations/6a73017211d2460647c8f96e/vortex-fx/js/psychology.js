/**
 * FORTEX FX — Psychology Rotation Engine
 * Randomizes psychological trigger phrases on every page load.
 * Future: Rex AI will analyze which phrases drive engagement per trader
 * and personalize the copy based on individual behavior patterns.
 */

const PsychologyEngine = {
  // Hero headlines — EGO + IDENTITY triggers
  heroHeadlines: [
    "You already have the skill. Now prove it.",
    "Your trading deserves an audience.",
    "Trade. Compete. Get recognized.",
    "The best trader in the room is you. Now there's a room full of traders.",
    "Stop trading for nobody. Start trading for the leaderboard.",
    "Your strategy works. Now let it count for something.",
    "You didn't learn trading to trade in silence.",
    "Every chart you've read prepared you for this.",
    "The skill is yours. The arena is waiting.",
    "Profit in silence or profit on the leaderboard. Your call.",
  ],

  // Pain point statements — LOSS AVERSION + PAIN
  painPoints: [
    "You spend hours analyzing charts. You manage risk. You take disciplined trades. But at the end of the month — nobody sees your results.",
    "Trading alone is just numbers on a screen. Where's the recognition? Where's the proof that you're better?",
    "Every day you trade without competing, someone with less skill is earning prizes you could have won.",
    "You've put in the hours. You've built the edge. But nobody knows your name.",
    "The market doesn't care how good you are. The tournament does.",
  ],

  // Solution framings — RECIPROCITY + BENEFIT
  solutions: [
    "Where your trading finally counts.",
    "Same skill. Same markets. Real prizes. Real recognition.",
    "Your trading, but with stakes that matter.",
    "Turn your daily trades into a competition worth winning.",
    "The platform that pays you back for the skill you already have.",
  ],

  // Urgency / FOMO lines
  urgencyLines: [
    "247 traders are competing right now. The longer you wait, the more prize pools you miss.",
    "Every tournament you skip is prize money you'll never earn back.",
    "Registration takes 30 seconds. Missing the next tournament takes longer to regret.",
    "The next tournament starts soon. The prize pool is already filling.",
    "While you're reading this, someone is climbing the leaderboard.",
    "The traders who join today are the ones who win next month.",
  ],

  // Free value reassurances — RECIPROCITY
  freeValue: [
    "No credit card. No subscription. No catch. Just your MT4/MT5 account and your trading skill.",
    "Free to join. Free to compete. Free to win. We earn through broker partnerships, not from you.",
    "$0 subscription. $0 entry fee. $0 hidden charges. 100% yours to keep.",
    "The platform costs you nothing. The competition costs you everything you've got.",
    "You bring the skill. We bring the arena, the prizes, and the recognition. Nobody pays.",
  ],

  // Social proof variations
  socialProof: [
    "3,742 traders have already joined. You're the one still reading.",
    "47 tournaments run. $890K in prizes paid. Still free to join.",
    "247 traders competing right now. $50,000 on the line. You're not one of them yet.",
    "Join 3,742 traders who stopped trading in silence.",
    "The community is already here. The prizes are already flowing. You're late, but not too late.",
  ],

  // Sealed results explanations — CURIOSITY GAP
  sealedExplanations: [
    "No live rankings. On purpose. The surprise is the point.",
    "Sealed results mean pure focus. No tilt. No gaming. Just skill.",
    "14 days of not knowing. One moment of revelation.",
    "The only leaderboard that builds suspense instead of stress.",
    "Trade blind. Win blind. The reveal is everything.",
  ],

  // Final CTA variations — COMMITMENT
  finalCTAs: [
    "Stop trading in silence.",
    "Your move.",
    "The arena is open. Are you?",
    "Join the competition. Or keep trading for nobody.",
    "30 seconds from now, you could be in the next tournament.",
    "The traders who win next month are joining today.",
  ],

  // Community / belonging
  communityLines: [
    "You're not trading alone anymore.",
    "The Citadel isn't just a Discord. It's your trading family.",
    "Every Fortex FX trader belongs to the Citadel. You're either in or you're out.",
    "Trading is lonely. It doesn't have to be.",
  ],

  // Daily check-in psychology
  checkinLines: [
    "Don't break the streak. Your future self will thank you.",
    "Every check-in compounds. Every missed day resets.",
    "The traders who show up daily are the ones who win tournaments.",
    "Consistency is the edge nobody talks about. Check in. Build it.",
    "You've built a streak. Breaking it costs more than keeping it.",
  ],

  // Rex AI personalization
  rexAILines: [
    "Rex AI learns your trading patterns. The more you trade, the smarter it gets.",
    "Your AI co-pilot. Educational analysis, not investment advice.",
    "Rex AI sees patterns you'd miss. Use it or don't. It's free either way.",
    "The only AI that analyzes YOUR trades, not the market.",
  ],

  // Randomly select one phrase from a category
  get(category) {
    const pool = this[category];
    if (!pool || !pool.length) return '';
    return pool[Math.floor(Math.random() * pool.length)];
  },

  // Apply random phrases to elements with data-psychology attributes
  apply() {
    document.querySelectorAll('[data-psychology]').forEach(el => {
      const category = el.getAttribute('data-psychology');
      const phrase = this.get(category);
      if (phrase) el.textContent = phrase;
    });
  }
};

// Auto-apply on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PsychologyEngine.apply());
} else {
  PsychologyEngine.apply();
}
