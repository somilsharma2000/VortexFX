import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id } = body;
  
  let isAdmin = false;
  if (admin_id) {
    try { const admin = await base44.asServiceRole.entities.Trader.get(admin_id); isAdmin = admin && admin.role === 'admin'; } catch (e) {}
  }
  
  try {
    const [traders, tournaments, waitlist, settings, transactions, checkins, referrals] = await Promise.all([
      base44.asServiceRole.entities.Trader.list({ limit: 500, sort: '-created_date' }).catch(() => []),
      base44.asServiceRole.entities.Tournament.list({ limit: 50, sort: '-created_date' }).catch(() => []),
      base44.asServiceRole.entities.WaitlistEntry.list({ limit: 10000, sort: '-created_date' }).catch(() => []),
      base44.asServiceRole.entities.PlatformSetting.list({ limit: 100 }).catch(() => []),
      base44.asServiceRole.entities.Transaction.list({ limit: 100, sort: '-created_date' }).catch(() => []),
      base44.asServiceRole.entities.CheckIn.list({ limit: 100, sort: '-created_date' }).catch(() => []),
      base44.asServiceRole.entities.Referral.list({ limit: 100, sort: '-created_date' }).catch(() => [])
    ]);
    
    return Response.json({ success: true, isAdmin, data: { traders: traders || [], tournaments: tournaments || [], waitlist: waitlist || [], settings: settings || [], transactions: transactions || [], checkins: checkins || [], referrals: referrals || [] } });
  } catch (err) {
    return Response.json({ success: false, error: 'Failed to load admin data.' });
  }
});