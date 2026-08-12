import { base44 } from "@/api/base44Client";

// Idempotent sample-data seeder. Runs once on app load; skips if admin_001 already exists.
let ran = false;

export async function seedSampleData() {
  if (ran) return;
  try {
    const existing = await base44.entities.Trader.filter({ discord_id: "admin_001" });
    if (existing.length) { ran = true; return; }

    const traders = await base44.entities.Trader.bulkCreate([
      { discord_id: "admin_001", discord_username: "FORTREX_Admin", role: "admin", rex_balance: 50000, checkin_streak: 45, total_checkins: 120, best_streak: 45, verified: true, mt4_linked: true, mt4_account: "MT4-ADMIN-001", banned: false, referral_code: "FORTREX-ADMIN", joined_date: "2026-07-01", last_checkin_date: "2026-08-12" },
      { discord_id: "trader_001", discord_username: "CryptoKing", role: "member", rex_balance: 3200, checkin_streak: 12, total_checkins: 34, best_streak: 18, verified: true, mt4_linked: true, mt4_account: "MT4-9023451", banned: false, referral_code: "REX-CRYPTOKING", joined_date: "2026-07-15", last_checkin_date: "2026-08-11" },
      { discord_id: "trader_002", discord_username: "PipSniper", role: "member", rex_balance: 1850, checkin_streak: 7, total_checkins: 21, best_streak: 14, verified: true, mt4_linked: true, mt4_account: "MT4-8819234", banned: false, referral_code: "REX-PIPSNIPER", joined_date: "2026-07-20", last_checkin_date: "2026-08-12" },
      { discord_id: "trader_003", discord_username: "GoldHunter", role: "member", rex_balance: 750, checkin_streak: 3, total_checkins: 8, best_streak: 9, verified: true, mt4_linked: true, mt4_account: "MT4-7756123", banned: false, referral_code: "REX-GOLDHUNTER", joined_date: "2026-08-01", last_checkin_date: "2026-08-10" },
      { discord_id: "trader_004", discord_username: "FxNovice", role: "member", rex_balance: 200, checkin_streak: 1, total_checkins: 2, best_streak: 2, verified: false, mt4_linked: false, mt4_account: "", banned: false, referral_code: "REX-FXNOVICE", joined_date: "2026-08-10", last_checkin_date: "2026-08-11" },
      { discord_id: "trader_005", discord_username: "SwingMaster", role: "member", rex_balance: 5400, checkin_streak: 28, total_checkins: 67, best_streak: 30, verified: true, mt4_linked: true, mt4_account: "MT4-6654892", banned: false, referral_code: "REX-SWINGMASTER", joined_date: "2026-07-05", last_checkin_date: "2026-08-12" },
      { discord_id: "trader_006", discord_username: "ScalpGod", role: "member", rex_balance: 9100, checkin_streak: 52, total_checkins: 95, best_streak: 52, verified: true, mt4_linked: true, mt4_account: "MT4-5534677", banned: false, referral_code: "REX-SCALPGOD", joined_date: "2026-07-03", last_checkin_date: "2026-08-12" },
      { discord_id: "trader_007", discord_username: "TrendRider", role: "member", rex_balance: 2200, checkin_streak: 14, total_checkins: 28, best_streak: 14, verified: true, mt4_linked: true, mt4_account: "MT4-4478912", banned: false, referral_code: "REX-TRENDRIDER", joined_date: "2026-07-18", last_checkin_date: "2026-08-11" },
    ]);
    const id = (i) => traders[i].id;

    const tournament = await base44.entities.Tournament.create({
      name: "FORTREX Championship — August 2026",
      description: "Monthly trading championship. Highest TWRR ROI wins. $200 min balance required.",
      start_date: "2026-08-01", end_date: "2026-08-31", prize_pool_rex: 5000, entry_criteria_min_deposit: 200,
      markets: "Forex, Crypto, Indices, Commodities", status: "active", is_active: true, participant_count: 6,
      created_by: "admin_001", reveal_date: null, admin_notes: "First championship",
    });
    const tnId = tournament.id;
    const tnName = "FORTREX Championship — August 2026";

    await base44.entities.Participant.bulkCreate([
      { tournament_id: tnId, tournament_name: tnName, trader_id: id(1), trader_username: "CryptoKing", mt4_account: "MT4-9023451", starting_balance: 500, final_equity: 725, roi: 45.0, rank: 1, status: "completed", revealed: true, prize_won_rex: 2350 },
      { tournament_id: tnId, tournament_name: tnName, trader_id: id(6), trader_username: "ScalpGod", mt4_account: "MT4-5534677", starting_balance: 1000, final_equity: 1280, roi: 28.0, rank: 2, status: "completed", revealed: true, prize_won_rex: 1350 },
      { tournament_id: tnId, tournament_name: tnName, trader_id: id(5), trader_username: "SwingMaster", mt4_account: "MT4-6654892", starting_balance: 750, final_equity: 885, roi: 18.0, rank: 3, status: "completed", revealed: true, prize_won_rex: 800 },
      { tournament_id: tnId, tournament_name: tnName, trader_id: id(2), trader_username: "PipSniper", mt4_account: "MT4-8819234", starting_balance: 300, final_equity: 345, roi: 15.0, rank: 4, status: "completed", revealed: true, prize_won_rex: 250 },
      { tournament_id: tnId, tournament_name: tnName, trader_id: id(7), trader_username: "TrendRider", mt4_account: "MT4-4478912", starting_balance: 500, final_equity: 540, roi: 8.0, rank: 5, status: "completed", revealed: true, prize_won_rex: 250 },
      { tournament_id: tnId, tournament_name: tnName, trader_id: id(3), trader_username: "GoldHunter", mt4_account: "MT4-7756123", starting_balance: 200, final_equity: 185, roi: -7.5, rank: 6, status: "completed", revealed: true, prize_won_rex: 0 },
    ]);

    await base44.entities.Transaction.bulkCreate([
      { trader_id: id(1), type: "earn", amount: 50, description: "Daily check-in (Day 12)", transaction_date: "2026-08-11", reason: "daily_checkin" },
      { trader_id: id(1), type: "earn", amount: 2350, description: "Tournament prize: FORTREX Championship August 2026 (Rank #1)", transaction_date: "2026-08-31", reason: "tournament_prize" },
      { trader_id: id(6), type: "earn", amount: 35, description: "Daily check-in (Day 52)", transaction_date: "2026-08-12", reason: "daily_checkin" },
      { trader_id: id(6), type: "earn", amount: 1350, description: "Tournament prize: Rank #2", transaction_date: "2026-08-31", reason: "tournament_prize" },
      { trader_id: id(5), type: "earn", amount: 25, description: "Daily check-in (Day 28)", transaction_date: "2026-08-12", reason: "daily_checkin" },
      { trader_id: id(2), type: "spend", amount: -500, description: "Custom color role purchased", transaction_date: "2026-08-05", reason: "store_purchase" },
      { trader_id: id(1), type: "earn", amount: 100, description: "Referral Tier 1: FxNovice stayed 72hrs", transaction_date: "2026-08-13", reason: "referral_tier1" },
      { trader_id: id(3), type: "earn", amount: 15, description: "Daily check-in (Day 3)", transaction_date: "2026-08-10", reason: "daily_checkin" },
      { trader_id: id(7), type: "earn", amount: 20, description: "Daily check-in (Day 14)", transaction_date: "2026-08-11", reason: "daily_checkin" },
      { trader_id: id(6), type: "earn", amount: 1000, description: "100-Day Streak Milestone Bonus!", transaction_date: "2026-08-01", reason: "milestone_bonus" },
    ]);

    await base44.entities.CheckIn.bulkCreate([
      { trader_id: id(1), trader_username: "CryptoKing", checkin_date: "2026-08-11", rex_earned: 50, new_streak: 12, milestone_reached: null, milestone_bonus_rex: 0 },
      { trader_id: id(6), trader_username: "ScalpGod", checkin_date: "2026-08-12", rex_earned: 35, new_streak: 52, milestone_reached: "50-Day Streak! LEGENDARY", milestone_bonus_rex: 500 },
      { trader_id: id(5), trader_username: "SwingMaster", checkin_date: "2026-08-12", rex_earned: 25, new_streak: 28, milestone_reached: null, milestone_bonus_rex: 0 },
      { trader_id: id(2), trader_username: "PipSniper", checkin_date: "2026-08-12", rex_earned: 15, new_streak: 7, milestone_reached: "7-Day Streak!", milestone_bonus_rex: 50 },
      { trader_id: id(7), trader_username: "TrendRider", checkin_date: "2026-08-11", rex_earned: 20, new_streak: 14, milestone_reached: "14-Day Streak!", milestone_bonus_rex: 100 },
    ]);

    await base44.entities.Referral.create({
      referrer_id: id(1), referrer_username: "CryptoKing", referred_id: id(4), referred_username: "FxNovice",
      referral_date: "2026-08-10", qualified: true, qualified_date: "2026-08-13", reward_amount_rex: 100, status: "bonus_pending",
    });

    await base44.entities.PlatformSetting.bulkCreate([
      { key: "welcome_bonus_rex", value: "200", category: "economy", description: "REX given to new traders on signup", last_updated: "2026-08-01", updated_by: "admin_001" },
      { key: "checkin_base_rex", value: "10", category: "economy", description: "Base REX for daily check-in", last_updated: "2026-08-01", updated_by: "admin_001" },
      { key: "prize_pool_percentage", value: "10", category: "economy", description: "Percentage of revenue allocated to prize pool", last_updated: "2026-08-01", updated_by: "admin_001" },
    ]);

    ran = true;
  } catch {
    // Not authenticated or blocked — skip silently; will retry on next load.
  }
}