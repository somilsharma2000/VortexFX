/**
 * FORTEX FX — Get Leaderboard / Trader Stats
 * Returns streak leaderboard, tournament champions, and trader profile data.
 */
export default async function(req, res) {
  const { type, trader_id, limit } = req.body;
  const maxResults = Math.min(limit || 50, 500);

  // TYPE: Streak leaderboard (most consistent traders)
  if (type === "streak_leaderboard") {
    const traders = await base44.entities.Trader.list({
      filter: { banned: false },
      sort: "-checkin_streak",
      limit: maxResults
    });
    
    const leaderboard = traders.map((t, i) => ({
      rank: i + 1,
      username: t.discord_username,
      current_streak: t.checkin_streak || 0,
      best_streak: t.best_streak || 0,
      total_checkins: t.total_checkins || 0,
      rex_earned: t.rex_balance || 0
    }));
    
    return res.json({ success: true, leaderboard });
  }

  // TYPE: Tournament champions (past winners)
  if (type === "champions") {
    const winners = await base44.entities.Participant.list({
      filter: { revealed: true, rank: 1 },
      sort: "-created_date",
      limit: maxResults
    });
    
    return res.json({ success: true, champions: winners });
  }

  // TYPE: Tournament results (revealed tournaments)
  if (type === "tournament_results") {
    const tournament_id = req.body.tournament_id;
    if (!tournament_id) {
      return res.json({ success: false, error: "Tournament ID required" });
    }
    
    const participants = await base44.entities.Participant.list({
      filter: { tournament_id: tournament_id, revealed: true },
      sort: "rank",
      limit: maxResults
    });
    
    return res.json({ success: true, results: participants });
  }

  // TYPE: Trader profile (full stats for profile page)
  if (type === "trader_profile" && trader_id) {
    const traders = await base44.entities.Trader.list({
      filter: { id: trader_id }
    });
    
    if (!traders || traders.length === 0) {
      return res.json({ success: false, error: "Trader not found" });
    }
    
    const trader = traders[0];
    
    // Get tournament history
    const tournamentHistory = await base44.entities.Participant.list({
      filter: { trader_id: trader_id, revealed: true },
      sort: "-created_date",
      limit: 20
    });
    
    // Get recent transactions
    const transactions = await base44.entities.Transaction.list({
      filter: { trader_id: trader_id },
      sort: "-created_date",
      limit: 20
    });
    
    // Get referral stats
    const referrals = await base44.entities.Referral.list({
      filter: { referrer_id: trader_id }
    });
    
    const qualifiedReferrals = referrals.filter(r => r.qualified).length;
    const referralRexEarned = referrals.reduce((sum, r) => sum + (r.reward_amount_rex || 0), 0);
    
    // Calculate win rate
    const tournamentsWon = tournamentHistory.filter(t => t.rank === 1).length;
    const winRate = tournamentHistory.length > 0 
      ? Math.round((tournamentsWon / tournamentHistory.length) * 100) 
      : 0;
    
    // Best ROI
    const bestRoi = tournamentHistory.length > 0
      ? Math.max(...tournamentHistory.map(t => t.roi || 0))
      : 0;
    
    return res.json({
      success: true,
      trader: {
        id: trader.id,
        username: trader.discord_username,
        avatar: trader.avatar,
        verified: trader.verified,
        mt4_linked: trader.mt4_linked,
        mt4_account: trader.mt4_account,
        joined_date: trader.joined_date,
        role: trader.role,
        rex_balance: trader.rex_balance || 0,
        checkin_streak: trader.checkin_streak || 0,
        best_streak: trader.best_streak || 0,
        total_checkins: trader.total_checkins || 0
      },
      stats: {
        tournaments_entered: tournamentHistory.length,
        tournaments_won: tournamentsWon,
        win_rate: winRate,
        best_roi: bestRoi,
        total_referrals: referrals.length,
        qualified_referrals: qualifiedReferrals,
        referral_rex_earned: referralRexEarned
      },
      tournament_history: tournamentHistory,
      recent_transactions: transactions
    });
  }

  // TYPE: Registration counter
  if (type === "registration_counter") {
    const settings = await base44.entities.PlatformSetting.list({
      filter: { category: "general" }
    });
    
    const getCount = (key) => {
      const s = settings.find(s => s.key === key);
      return s ? parseInt(s.value) : 0;
    };
    
    return res.json({
      success: true,
      current_count: getCount("registration_count"),
      target: getCount("registration_target")
    });
  }

  return res.json({ success: false, error: "Unknown type. Use: streak_leaderboard, champions, tournament_results, trader_profile, registration_counter" });
}
