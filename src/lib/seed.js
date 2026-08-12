import { base44 } from "@/api/base44Client";

// Idempotent sample-data seeder. Runs once on app load.
let ran = false;

export async function seedSampleData() {
  if (ran) return;
  try {
    const existing = await base44.entities.Trader.filter({ discord_id: "admin_001" });
    if (!existing.length) {
      await seedCore();
    }
    await ensureSprints();
    await ensureWaitlist();
    await ensureSettings();
    ran = true;
  } catch {
    // not authenticated or blocked — skip silently; will retry next load
  }
}

async function seedCore() {
  const traders = await base44.entities.Trader.bulkCreate([
    { discord_id: "admin_001", discord_username: "FORTREX_Admin", role: "admin", rex_balance: 50000, checkin_streak: 45, total_checkins: 120, best_streak: 45, verified: true, mt4_linked: true, mt4_account: "MT4-ADMIN-001", banned: false, referral_code: "FORTREX-ADMIN", joined_date: "2026-07-01", last_checkin_date: "2026-08-12", trader_class: "Sniper", battlepass_level: 18, battlepass_xp: 4200 },
    { discord_id: "trader_001", discord_username: "CryptoKing", role: "member", rex_balance: 3200, checkin_streak: 12, total_checkins: 34, best_streak: 18, verified: true, mt4_linked: true, mt4_account: "MT4-9023451", banned: false, referral_code: "REX-CRYPTOKING", joined_date: "2026-07-15", last_checkin_date: "2026-08-11", trader_class: "Sniper", battlepass_level: 15, battlepass_xp: 3000 },
    { discord_id: "trader_002", discord_username: "PipSniper", role: "member", rex_balance: 1850, checkin_streak: 7, total_checkins: 21, best_streak: 14, verified: true, mt4_linked: true, mt4_account: "MT4-8819234", banned: false, referral_code: "REX-PIPSNIPER", joined_date: "2026-07-20", last_checkin_date: "2026-08-12", trader_class: "Scalper", battlepass_level: 8, battlepass_xp: 1200 },
    { discord_id: "trader_003", discord_username: "GoldHunter", role: "member", rex_balance: 750, checkin_streak: 3, total_checkins: 8, best_streak: 9, verified: true, mt4_linked: true, mt4_account: "MT4-7756123", banned: false, referral_code: "REX-GOLDHUNTER", joined_date: "2026-08-01", last_checkin_date: "2026-08-10", trader_class: "Sniper", battlepass_level: 4, battlepass_xp: 500 },
    { discord_id: "trader_004", discord_username: "FxNovice", role: "member", rex_balance: 200, checkin_streak: 1, total_checkins: 2, best_streak: 2, verified: false, mt4_linked: false, mt4_account: "", banned: false, referral_code: "REX-FXNOVICE", joined_date: "2026-08-10", last_checkin_date: "2026-08-11", trader_class: "Rookie", battlepass_level: 1, battlepass_xp: 80 },
    { discord_id: "trader_005", discord_username: "SwingMaster", role: "member", rex_balance: 5400, checkin_streak: 28, total_checkins: 67, best_streak: 30, verified: true, mt4_linked: true, mt4_account: "MT4-6654892", banned: false, referral_code: "REX-SWINGMASTER", joined_date: "2026-07-05", last_checkin_date: "2026-08-12", trader_class: "Swing King", battlepass_level: 22, battlepass_xp: 5200 },
    { discord_id: "trader_006", discord_username: "ScalpGod", role: "member", rex_balance: 9100, checkin_streak: 52, total_checkins: 95, best_streak: 52, verified: true, mt4_linked: true, mt4_account: "MT4-5534677", banned: false, referral_code: "REX-SCALPGOD", joined_date: "2026-07-03", last_checkin_date: "2026-08-12", trader_class: "Scalper", battlepass_level: 28, battlepass_xp: 8500 },
    { discord_id: "trader_007", discord_username: "TrendRider", role: "member", rex_balance: 2200, checkin_streak: 14, total_checkins: 28, best_streak: 14, verified: true, mt4_linked: true, mt4_account: "MT4-4478912", banned: false, referral_code: "REX-TRENDRIDER", joined_date: "2026-07-18", last_checkin_date: "2026-08-11", trader_class: "Swing King", battlepass_level: 12, battlepass_xp: 2400 }
  ]);
  const id = (i) => traders[i].id;

  const tournament = await base44.entities.Tournament.create({
    name: "FORTREX Championship — August 2026",
    description: "Monthly trading championship. Highest TWRR ROI wins. $200 min balance required.",
    start_date: "2026-08-01", end_date: "2026-08-31", prize_pool_rex: 5000, entry_criteria_min_deposit: 200,
    markets: "Forex, Crypto, Indices, Commodities", status: "active", is_active: true, participant_count: 6,
    created_by: "admin_001", reveal_date: null, admin_notes: "First championship", type: "monthly"
  });
  const tnId = tournament.id;
  const tnName = "FORTREX Championship — August 2026";

  await base44.entities.Participant.bulkCreate([
    { tournament_id: tnId, tournament_name: tnName, trader_id: id(1), trader_username: "CryptoKing", mt4_account: "MT4-9023451", starting_balance: 500, final_equity: 725, roi: 45.0, rank: 1, status: "completed", revealed: true, prize_won_rex: 2350 },
    { tournament_id: tnId, tournament_name: tnName, trader_id: id(6), trader_username: "ScalpGod", mt4_account: "MT4-5534677", starting_balance: 1000, final_equity: 1280, roi: 28.0, rank: 2, status: "completed", revealed: true, prize_won_rex: 1350 },
    { tournament_id: tnId, tournament_name: tnName, trader_id: id(5), trader_username: "SwingMaster", mt4_account: "MT4-6654892", starting_balance: 750, final_equity: 885, roi: 18.0, rank: 3, status: "completed", revealed: true, prize_won_rex: 800 },
    { tournament_id: tnId, tournament_name: tnName, trader_id: id(2), trader_username: "PipSniper", mt4_account: "MT4-8819234", starting_balance: 300, final_equity: 345, roi: 15.0, rank: 4, status: "completed", revealed: true, prize_won_rex: 250 },
    { tournament_id: tnId, tournament_name: tnName, trader_id: id(7), trader_username: "TrendRider", mt4_account: "MT4-4478912", starting_balance: 500, final_equity: 540, roi: 8.0, rank: 5, status: "completed", revealed: true, prize_won_rex: 250 },
    { tournament_id: tnId, tournament_name: tnName, trader_id: id(3), trader_username: "GoldHunter", mt4_account: "MT4-7756123", starting_balance: 200, final_equity: 185, roi: -7.5, rank: 6, status: "completed", revealed: true, prize_won_rex: 0 }
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
    { trader_id: id(6), type: "earn", amount: 1000, description: "100-Day Streak Milestone Bonus!", transaction_date: "2026-08-01", reason: "milestone_bonus" }
  ]);

  await base44.entities.CheckIn.bulkCreate([
    { trader_id: id(1), trader_username: "CryptoKing", checkin_date: "2026-08-11", rex_earned: 50, new_streak: 12, milestone_reached: null, milestone_bonus_rex: 0 },
    { trader_id: id(6), trader_username: "ScalpGod", checkin_date: "2026-08-12", rex_earned: 35, new_streak: 52, milestone_reached: "50-Day Streak! LEGENDARY", milestone_bonus_rex: 500 },
    { trader_id: id(5), trader_username: "SwingMaster", checkin_date: "2026-08-12", rex_earned: 25, new_streak: 28, milestone_reached: null, milestone_bonus_rex: 0 },
    { trader_id: id(2), trader_username: "PipSniper", checkin_date: "2026-08-12", rex_earned: 15, new_streak: 7, milestone_reached: "7-Day Streak!", milestone_bonus_rex: 50 },
    { trader_id: id(7), trader_username: "TrendRider", checkin_date: "2026-08-11", rex_earned: 20, new_streak: 14, milestone_reached: "14-Day Streak!", milestone_bonus_rex: 100 }
  ]);

  await base44.entities.Referral.create({
    referrer_id: id(1), referrer_username: "CryptoKing", referred_id: id(4), referred_username: "FxNovice",
    referral_date: "2026-08-10", qualified: true, qualified_date: "2026-08-13", reward_amount_rex: 100, status: "bonus_pending"
  });
}

async function ensureSprints() {
  const existing = await base44.entities.Tournament.filter({ name: "Crypto Weekend Volatility Surge" });
  if (existing.length) return;
  await base44.entities.Tournament.bulkCreate([
    { name: "Crypto Weekend Volatility Surge", description: "Fri-Sun weekend sprint. Highest crypto ROI wins.", start_date: "2026-08-15", end_date: "2026-08-17", prize_pool_rex: 2500, entry_criteria_min_deposit: 200, markets: "Crypto", status: "upcoming", is_active: false, participant_count: 0, type: "sprint", created_by: "admin_001", reveal_date: "2026-08-17", admin_notes: "Weekend sprint" },
    { name: "Gold Scalping Sprint", description: "Mon-Wed sprint. Gold scalping showdown.", start_date: "2026-08-18", end_date: "2026-08-20", prize_pool_rex: 2500, entry_criteria_min_deposit: 200, markets: "Gold, Commodities", status: "upcoming", is_active: false, participant_count: 0, type: "sprint", created_by: "admin_001", reveal_date: "2026-08-20", admin_notes: "Gold sprint" }
  ]);
}

async function ensureWaitlist() {
  const existing = await base44.entities.WaitlistEntry.list("-signup_date", 1);
  if (existing && existing.length) return;
  await base44.entities.WaitlistEntry.bulkCreate([
    { email: "alex.trader@example.com", phone: "", position: 1, referred_by: "", discord_joined: true, telegram_joined: false, signup_date: "2026-08-05" },
    { email: "sam.pips@example.com", phone: "+1234567890", position: 2, referred_by: "FORTREX-ADMIN", discord_joined: true, telegram_joined: true, signup_date: "2026-08-06" },
    { email: "jordan.fx@example.com", phone: "", position: 3, referred_by: "", discord_joined: false, telegram_joined: false, signup_date: "2026-08-07" },
    { email: "casey.scalp@example.com", phone: "", position: 4, referred_by: "REX-CRYPTOKING", discord_joined: true, telegram_joined: false, signup_date: "2026-08-08" },
    { email: "morgan.swing@example.com", phone: "+9876543210", position: 5, referred_by: "", discord_joined: false, telegram_joined: true, signup_date: "2026-08-09" }
  ]);
}

async function ensureSettings() {
  const settings = await base44.entities.PlatformSetting.list("-last_updated", 100);
  const keys = new Set(settings.map((s) => s.key));
  const toCreate = [];
  if (!keys.has("genesis_spots_remaining")) toCreate.push({ key: "genesis_spots_remaining", value: "2492", category: "growth", description: "Remaining Genesis Trader spots", last_updated: "2026-08-12", updated_by: "admin_001" });
  if (!keys.has("welcome_bonus_rex")) toCreate.push({ key: "welcome_bonus_rex", value: "200", category: "economy", description: "REX given to new traders on signup", last_updated: "2026-08-01", updated_by: "admin_001" });
  if (!keys.has("checkin_base_rex")) toCreate.push({ key: "checkin_base_rex", value: "50", category: "economy", description: "Base REX for daily check-in", last_updated: "2026-08-01", updated_by: "admin_001" });
  if (toCreate.length) await base44.entities.PlatformSetting.bulkCreate(toCreate);
}