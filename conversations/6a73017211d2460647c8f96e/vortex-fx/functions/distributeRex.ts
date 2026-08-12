import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id, trader_id, amount, reason } = body;
  if (!admin_id || !trader_id || !amount) return Response.json({ success: false, error: 'Missing parameters.' });
  
  try {
    const trader = await base44.asServiceRole.entities.Trader.get(trader_id);
    if (!trader) return Response.json({ success: false, error: 'Trader not found.' });
    
    const newBalance = (trader.rex_balance || 0) + amount;
    await base44.asServiceRole.entities.Trader.update(trader_id, { rex_balance: newBalance });
    
    try { await base44.asServiceRole.entities.Transaction.create({ trader_id, amount, type: amount > 0 ? 'admin_credit' : 'admin_debit', description: reason || 'Admin REX adjustment', reason: 'admin_distribute', transaction_date: new Date().toISOString() }); } catch (e) {}
    
    return Response.json({ success: true, new_balance: newBalance });
  } catch (err) {
    return Response.json({ success: false, error: 'Distribution failed.' });
  }
});