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
    try { checkins = await base44.asServiceRole.entities.CheckIn.filter({ trader_id }); checkins.sort((a,b) => new Date(b.created_date) - new Date(a.created_date)); if (checkins.length > 30) checkins = checkins.slice(0, 30); } catch (e) {}
    try { transactions = await base44.asServiceRole.entities.Transaction.filter({ trader_id }); transactions.sort((a,b) => new Date(b.created_date) - new Date(a.created_date)); if (transactions.length > 20) transactions = transactions.slice(0, 20); } catch (e) {}
    try { tournaments = await base44.asServiceRole.entities.Participant.filter({ trader_id }); tournaments.sort((a,b) => new Date(b.created_date) - new Date(a.created_date)); if (tournaments.length > 10) tournaments = tournaments.slice(0, 10); } catch (e) {}
    
    return Response.json({ success: true, trader, checkins, transactions, tournaments });
  } catch (err) {
    return Response.json({ success: false, error: 'Failed to load profile.' });
  }
});