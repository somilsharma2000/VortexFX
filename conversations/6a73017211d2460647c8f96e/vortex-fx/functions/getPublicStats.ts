import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  let regCount = 0, activeTournaments = 0, totalPrizePool = 0, totalTraders = 0;
  let genesisCap = 2500, waitlistTarget = 10000;
  
  try {
    const entries = await base44.asServiceRole.entities.WaitlistEntry.list({ limit: 10000 });
    regCount = entries ? entries.length : 0;
  } catch (e) {}
  
  try {
    const tournaments = await base44.asServiceRole.entities.Tournament.list({ limit: 100 });
    if (tournaments) for (const t of tournaments) {
      if (t.status === 'active') {
        activeTournaments++;
        totalPrizePool += (t.prize_pool_rex || 0);
      }
    }
  } catch (e) {}
  
  try {
    const traders = await base44.asServiceRole.entities.Trader.list({ limit: 10000 });
    totalTraders = traders ? traders.length : 0;
  } catch (e) {}
  
  try {
    const settings = await base44.asServiceRole.entities.PlatformSetting.list({ limit: 100 });
    if (settings) for (const s of settings) {
      if (s.key === 'genesis_cap') genesisCap = parseInt(s.value) || 2500;
      if (s.key === 'waitlist_target') waitlistTarget = parseInt(s.value) || 10000;
    }
  } catch (e) {}
  
  return Response.json({
    success: true,
    stats: {
      registration_count: regCount,
      waitlist_count: regCount,
      active_tournaments: activeTournaments,
      total_prize_pool: totalPrizePool,
      total_traders: totalTraders,
      genesis_cap: genesisCap,
      waitlist_target: waitlistTarget,
      genesis_remaining: Math.max(0, genesisCap - regCount)
    }
  });
});