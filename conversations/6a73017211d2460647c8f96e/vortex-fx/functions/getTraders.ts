import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { limit } = body;
  try {
    const traders = await base44.asServiceRole.entities.Trader.list({ limit: limit || 200, sort: '-created_date' });
    return Response.json({ success: true, traders: traders || [] });
  } catch (err) {
    return Response.json({ success: true, traders: [] });
  }
});