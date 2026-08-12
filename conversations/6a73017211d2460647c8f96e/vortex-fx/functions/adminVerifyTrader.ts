import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id, trader_id } = body;
  if (!admin_id || !trader_id) return Response.json({ success: false, error: 'Missing parameters.' });
  
  try {
    const updated = await base44.asServiceRole.entities.Trader.update(trader_id, { verified: true });
    try {
      const trader = await base44.asServiceRole.entities.Trader.get(trader_id);
      if (trader && trader.email) {
        const wl = await base44.asServiceRole.entities.WaitlistEntry.list({ filter: { email: trader.email }, limit: 1 });
        if (wl && wl.length > 0) await base44.asServiceRole.entities.WaitlistEntry.update(wl[0].id, { status: 'verified' });
      }
    } catch (e) {}
    return Response.json({ success: true, trader: updated });
  } catch (err) {
    return Response.json({ success: false, error: 'Verification failed.' });
  }
});