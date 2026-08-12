import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id, trader_id, banned, banned_reason } = body;
  if (!admin_id || !trader_id) return Response.json({ success: false, error: 'Missing parameters.' });
  
  try {
    const updated = await base44.asServiceRole.entities.Trader.update(trader_id, { banned: banned !== false, banned_reason: banned_reason || '' });
    return Response.json({ success: true, trader: updated });
  } catch (err) {
    return Response.json({ success: false, error: 'Ban action failed.' });
  }
});