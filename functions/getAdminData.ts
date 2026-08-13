import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id } = body;
  let isAdmin = false;
  if (admin_id) { try { const admin = await base44.asServiceRole.entities.Trader.get(admin_id); isAdmin = admin && admin.role === 'admin'; } catch (e) {} }
  
  try {
    const [traders, tournaments, waitlist, settings, transactions, checkins, referrals] = await Promise.all([
      base44.asServiceRole.entities.Trader.list().catch(() => []),
      base44.asServiceRole.entities.Tournament.list().catch(() => []),
      base44.asServiceRole.entities.WaitlistEntry.list().catch(() => []),
      base44.asServiceRole.entities.PlatformSetting.list().catch(() => []),
      base44.asServiceRole.entities.Transaction.list().catch(() => []),
      base44.asServiceRole.entities.CheckIn.list().catch(() => []),
      base44.asServiceRole.entities.Referral.list().catch(() => [])
    ]);
    // Sort by created_date desc, truncate
    const sortDesc = (arr, n) => { if (arr) { arr.sort((a,b) => new Date(b.created_date||0) - new Date(a.created_date||0)); if (arr.length > n) arr.length = n; } return arr || []; };
    return Response.json({ success: true, isAdmin, data: {
      traders: sortDesc(traders, 500), tournaments: sortDesc(tournaments, 50),
      waitlist: sortDesc(waitlist, 10000), settings: settings || [],
      transactions: sortDesc(transactions, 100), checkins: sortDesc(checkins, 100), referrals: sortDesc(referrals, 100)
    }});
  } catch (err) {
    return Response.json({ success: false, error: 'Failed to load admin data.' });
  }
});