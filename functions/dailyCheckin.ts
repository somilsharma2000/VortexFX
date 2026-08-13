import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { trader_id } = body;
  if (!trader_id) return Response.json({ success: false, error: 'No trader ID provided.' });
  
  try {
    const trader = await base44.asServiceRole.entities.Trader.get(trader_id);
    if (!trader) return Response.json({ success: false, error: 'Trader not found.' });
    if (trader.banned) return Response.json({ success: false, error: 'Account banned.' });
    
    const today = new Date().toISOString().split('T')[0];
    if (trader.last_checkin_date === today) return Response.json({ success: false, error: 'Already checked in today!', alreadyCheckedIn: true, streak: trader.checkin_streak || 0 });
    
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = (trader.last_checkin_date === yesterday) ? (trader.checkin_streak || 0) + 1 : 1;
    
    // Get Genesis multiplier (default 1.0 if not set)
    const multiplier = trader.genesis_multiplier || 1.0;
    
    // Base check-in reward: 5 REX, multiplied by Genesis tier
    const baseReward = 5;
    let milestoneReached = '';
    let baseMilestoneBonus = 0;
    const milestones = { 3:{rex:10,name:'3-Day Streak'}, 7:{rex:25,name:'7-Day Streak Master'}, 14:{rex:50,name:'14-Day Warrior'}, 30:{rex:100,name:'30-Day Legend'}, 60:{rex:250,name:'60-Day Dynasty'}, 100:{rex:500,name:'100-Day Immortal'} };
    if (milestones[newStreak]) { milestoneReached = milestones[newStreak].name; baseMilestoneBonus = milestones[newStreak].rex; }
    
    // Apply Genesis multiplier to BOTH base reward and milestone bonus
    const multipliedBase = Math.round(baseReward * multiplier);
    const multipliedMilestone = Math.round(baseMilestoneBonus * multiplier);
    const totalRexEarned = multipliedBase + multipliedMilestone;
    
    const newBalance = (trader.rex_balance || 0) + totalRexEarned;
    const newTotalCheckins = (trader.total_checkins || 0) + 1;
    const newBPXP = (trader.battlepass_xp || 0) + (totalRexEarned * 2);
    const newBPLevel = Math.floor(newBPXP / 100) + 1;
    
    await base44.asServiceRole.entities.Trader.update(trader_id, {
      checkin_streak: newStreak, last_checkin_date: today, total_checkins: newTotalCheckins,
      rex_balance: newBalance, battlepass_xp: newBPXP, battlepass_level: newBPLevel,
      best_streak: Math.max(trader.best_streak || 0, newStreak)
    });
    
    try { await base44.asServiceRole.entities.CheckIn.create({ trader_id, trader_username: trader.discord_username || '', checkin_date: today, new_streak: newStreak, rex_earned: totalRexEarned, milestone_reached: milestoneReached, milestone_bonus_rex: multipliedMilestone }); } catch (e) {}
    try { await base44.asServiceRole.entities.Transaction.create({ trader_id, amount: totalRexEarned, type: 'checkin_reward', description: 'Daily Check-In (' + multiplier + 'x)' + (milestoneReached ? ' + ' + milestoneReached : ''), reason: 'daily_checkin', transaction_date: new Date().toISOString() }); } catch (e) {}
    
    return Response.json({ 
      success: true, 
      streak: newStreak, 
      rex_earned: totalRexEarned, 
      base_rex: multipliedBase, 
      milestone_bonus: multipliedMilestone,
      multiplier: multiplier,
      new_balance: newBalance, 
      milestone: milestoneReached, 
      battlepass_xp: newBPXP, 
      battlepass_level: newBPLevel 
    });
  } catch (err) {
    return Response.json({ success: false, error: 'Check-in failed.' });
  }
});
