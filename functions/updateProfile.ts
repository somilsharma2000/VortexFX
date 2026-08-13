import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { trader_id, full_name, email, phone } = body;
  if (!trader_id) return Response.json({ success: false, error: 'No trader ID provided.' });
  const updateData = {};
  if (full_name) updateData.full_name = full_name;
  if (email) updateData.email = email;
  if (phone) updateData.phone = phone;
  try {
    const updated = await base44.asServiceRole.entities.Trader.update(trader_id, updateData);
    return Response.json({ success: true, trader: updated });
  } catch (err) {
    return Response.json({ success: false, error: 'Profile update failed.' });
  }
});