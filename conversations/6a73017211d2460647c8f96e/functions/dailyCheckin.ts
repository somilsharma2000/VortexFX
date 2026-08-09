/**
 * FORTEX FX — Daily Check-in Backend Function
 * Processes a daily check-in: calculates streak, milestone, REX reward.
 * Admin controls all reward amounts via PlatformSetting entity.
 */
export default async function(req, res) {
  const { trader_id } = req.body;
  
  if (!trader_id) {
    return res.json({ success: false, error: "Trader ID required" });
  }

  // Get trader
  const traders = await base44.entities.Trader.list({ filter: { id: trader_id } });
  if (!traders || traders.length === 0) {
    return res.json({ success: false, error: "Trader not found" });
  }
  
  const trader = traders[0];
  
  if (trader.banned) {
    return res.json({ success: false, error: "Account suspended" });
  }

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Check if already checked in today
  if (trader.last_checkin_date === today) {
    return res.json({ 
      success: false, 
      error: "Already checked in today",
      current_streak: trader.checkin_streak,
      rex_balance: trader.rex_balance
    });
  }

  // Calculate new streak
  let newStreak = 1;
  if (trader.last_checkin_date) {
    const lastDate = new Date(trader.last_checkin_date);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      newStreak = (trader.checkin_streak || 0) + 1;
    } else if (diffDays > 1) {
      newStreak = 1; // Streak broken
    }
  }

  // Get reward settings
  const settings = await base44.entities.PlatformSetting.list({ 
    filter: { category: "checkin" } 
  });
  
  const getSetting = (key) => {
    const s = settings.find(s => s.key === key);
    return s ? parseFloat(s.value) : 0;
  };

  const dailyReward = getSetting("checkin_daily_reward");
  
  // Check milestones
  let milestone = "none";
  let milestoneBonus = 0;
  
  if (newStreak === 7) {
    milestone = "7";
    milestoneBonus = getSetting("checkin_milestone_7");
  } else if (newStreak === 14) {
    milestone = "14";
    milestoneBonus = getSetting("checkin_milestone_14");
  } else if (newStreak === 30) {
    milestone = "30";
    milestoneBonus = getSetting("checkin_milestone_30");
  } else if (newStreak === 90) {
    milestone = "90";
    milestoneBonus = getSetting("checkin_milestone_90");
  }

  const totalRexEarned = dailyReward + milestoneBonus;
  const newRexBalance = (trader.rex_balance || 0) + totalRexEarned;
  const newTotalCheckins = (trader.total_checkins || 0) + 1;
  const newBestStreak = Math.max(trader.best_streak || 0, newStreak);

  // Update trader record
  await base44.entities.Trader.update(trader.id, {
    checkin_streak: newStreak,
    last_checkin_date: today,
    total_checkins: newTotalCheckins,
    best_streak: newBestStreak,
    rex_balance: newRexBalance
  });

  // Create check-in record
  await base44.entities.CheckIn.create({
    trader_id: trader.id,
    trader_username: trader.discord_username,
    checkin_date: today,
    new_streak: newStreak,
    rex_earned: totalRexEarned,
    milestone_reached: milestone,
    milestone_bonus_rex: milestoneBonus
  });

  // Create transaction record
  await base44.entities.Transaction.create({
    trader_id: trader.id,
    type: milestone !== "none" ? "checkin_milestone" : "checkin_reward",
    amount: totalRexEarned,
    description: milestone !== "none" 
      ? `Daily check-in + ${milestone}-day milestone bonus` 
      : `Daily check-in reward`,
    transaction_date: today,
    reference_id: `checkin_${today}_${trader.id}`
  });

  return res.json({
    success: true,
    new_streak: newStreak,
    rex_earned: totalRexEarned,
    milestone_reached: milestone,
    milestone_bonus: milestoneBonus,
    new_rex_balance: newRexBalance,
    best_streak: newBestStreak,
    message: milestone !== "none" 
      ? `Streak ${newStreak}! Milestone bonus unlocked!` 
      : `Checked in! Streak: ${newStreak}`
  });
}
