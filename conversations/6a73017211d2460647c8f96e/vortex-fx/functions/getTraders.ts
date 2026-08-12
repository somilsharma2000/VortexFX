import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { limit } = body;
  try {
    let traders = await base44.asServiceRole.entities.Trader.list();
    if (traders) traders.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    const n = limit || 200;
    if (traders && traders.length > n) traders = traders.slice(0, n);
    return Response.json({ success: true, traders: traders || [] });
  } catch (err) { return Response.json({ success: true, traders: [] }); }
});