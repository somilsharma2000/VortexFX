/**
 * FORTREX FX — Admin: Get All Dashboard Data
 * Returns stats, waitlist, tournaments, and traders in one call.
 */
export default async function(req, res) {
  const { admin_id } = req.body;
  
  if (!admin_id) {
    return res.json({ success: false, error: "Admin ID required" });
  }

  try {
    const db = base44.asServiceRole;
    
    // Verify admin
    const admins = await db.entities.Trader.list({ filter: { id: admin_id, role: "admin" } });
    if (!admins || admins.length === 0) {
      return res.json({ success: false, error: "Unauthorized: Admin access required" });
    }

    // Fetch all data in parallel
    const [traders, waitlist, tournaments, participants, transactions, checkins, settings] = await Promise.all([
      db.entities.Trader.list({ limit: 500 }),
      db.entities.WaitlistEntry.list({ limit: 500, sort: "position" }),
      db.entities.Tournament.list({ limit: 50, sort: "-created_date" }),
      db.entities.Participant.list({ limit: 500 }),
      db.entities.Transaction.list({ limit: 200, sort: "-created_date" }),
      db.entities.CheckIn.list({ limit: 200, sort: "-created_date" }),
      db.entities.PlatformSetting.list({ limit: 100 })
    ]);

    // Build stats
    const verifiedTraders = traders.filter(t => t.verified).length;
    const activeTraders = traders.filter(t => t.is_active_trader).length;
    const totalRexDistributed = transactions
      .filter(t => t.type === "tournament_prize" || t.type === "bonus" || t.type === "referral")
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalPrizePool = tournaments
      .filter(t => t.status === "live" || t.status === "upcoming")
      .reduce((sum, t) => sum + (t.prize_pool_rex || 0), 0);
    const completedChampionships = tournaments.filter(t => t.status === "completed").length;

    // Format waitlist entries
    const waitlistFormatted = waitlist.map((w, idx) => ({
      id: w.id,
      position: w.position || idx + 1,
      email: w.email || 'n/a',
      phone: w.phone || 'n/a',
      referred_by: w.referred_by || 'Direct',
      discord_joined: !!w.discord_joined,
      telegram_joined: !!w.telegram_joined,
      signup_date: w.created_date ? w.created_date.substring(0, 10) : (w.signup_date || '2026-08-01')
    }));

    // Format tournaments for admin
    const tournamentsFormatted = tournaments.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description || '',
      start_date: t.start_date,
      end_date: t.end_date,
      reveal_date: t.reveal_date,
      status: t.status,
      is_active: t.is_active,
      prize_pool_rex: t.prize_pool_rex || 0,
      entry_criteria_min_deposit: t.entry_criteria_min_deposit || 0,
      markets: t.markets || 'forex',
      participant_count: t.participant_count || 0,
      type: t.type || 'bi-weekly'
    }));

    // Format traders for admin
    const tradersFormatted = traders.map(t => ({
      id: t.id,
      username: t.discord_username || 'Unknown',
      email: t.email || '',
      verified: t.verified,
      mt4_linked: t.mt4_linked,
      mt4_account: t.mt4_account || '',
      role: t.role || 'trader',
      rex_balance: t.rex_balance || 0,
      checkin_streak: t.checkin_streak || 0,
      best_streak: t.best_streak || 0,
      total_checkins: t.total_checkins || 0,
      is_active_trader: t.is_active_trader,
      banned: t.banned,
      banned_reason: t.banned_reason || '',
      joined_date: t.joined_date || t.created_date?.substring(0, 10),
      referral_code: t.referral_code || '',
      invite_count: t.invite_count || 0,
      trader_class: t.trader_class || 'Apprentice',
      battlepass_level: t.battlepass_level || 1,
      experience_level: t.experience_level || 'Beginner'
    }));

    // Format settings
    const settingsFormatted = {};
    settings.forEach(s => {
      settingsFormatted[s.key] = s.value;
    });

    return res.json({
      success: true,
      stats: {
        total_traders: traders.length,
        verified_traders: verifiedTraders,
        active_traders: activeTraders,
        waitlist_count: waitlist.length,
        total_tournaments: tournaments.length,
        completed_championships: completedChampionships,
        total_prize_pool_rex: totalPrizePool,
        total_rex_distributed: totalRexDistributed,
        total_checkins: checkins.length,
        total_transactions: transactions.length,
        registration_count: parseInt(settingsFormatted.registration_count || '0'),
        registration_target: parseInt(settingsFormatted.registration_target || '10000'),
        genesis_max: parseInt(settingsFormatted.genesis_max || '2500')
      },
      waitlist: waitlistFormatted,
      tournaments: tournamentsFormatted,
      traders: tradersFormatted,
      participants: participants,
      recent_transactions: transactions.slice(0, 20),
      settings: settingsFormatted
    });
  } catch (err) {
    return res.json({ success: false, error: "Failed to load admin data: " + (err.message || 'Unknown error') });
  }
}
