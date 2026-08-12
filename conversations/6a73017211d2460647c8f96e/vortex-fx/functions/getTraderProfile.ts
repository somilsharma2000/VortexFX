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
    if (trader.banned) return Response.json({ success: false, error: 'Account banned: ' + (trader.banned_reason || 'Violation of terms.') });
    
    let checkins = [], transactions = [], tournaments = [];
    try { checkins = await base44.asServiceRole.entities.CheckIn.list({ filter: { trader_id }, limit: 30, sort: '-created_date' }); } catch (e) {}
    try { transactions = await base44.asServiceRole.entities.Transaction.list({ filter: { trader_id }, limit: 20, sort: '-created_date' }); } catch (e) {}
    try { tournaments = await base44.asServiceRole.entities.Participant.list({ filter: { trader_id }, limit: 10, sort: '-created_date' }); } catch (e) {}
    
    return Response.json({ success: true, trader, checkins: checkins || [], transactions: transactions || [], tournaments: tournaments || [] });
  } catch (err) {
    return Response.json({ success: false, error: 'Failed to load profile.' });
  }
});