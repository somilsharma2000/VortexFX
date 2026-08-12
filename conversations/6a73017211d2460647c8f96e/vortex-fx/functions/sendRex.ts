import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { trader_id, recipient_id, amount, note } = body;
  if (!trader_id || !recipient_id || !amount || amount <= 0) return Response.json({ success: false, error: 'Invalid transfer parameters.' });
  
  try {
    const sender = await base44.asServiceRole.entities.Trader.get(trader_id);
    if (!sender) return Response.json({ success: false, error: 'Sender not found.' });
    if (sender.banned) return Response.json({ success: false, error: 'Account banned.' });
    if ((sender.rex_balance || 0) < amount) return Response.json({ success: false, error: 'Insufficient REX balance.' });
    
    const recipient = await base44.asServiceRole.entities.Trader.get(recipient_id);
    if (!recipient) return Response.json({ success: false, error: 'Recipient not found.' });
    
    await base44.asServiceRole.entities.Trader.update(trader_id, { rex_balance: (sender.rex_balance || 0) - amount });
    await base44.asServiceRole.entities.Trader.update(recipient_id, { rex_balance: (recipient.rex_balance || 0) + amount });
    
    try {
      await base44.asServiceRole.entities.Transaction.create({ trader_id, amount: -amount, type: 'send_rex', description: 'Sent REX to ' + (recipient.discord_username || recipient_id), reason: 'transfer', transaction_date: new Date().toISOString() });
      await base44.asServiceRole.entities.Transaction.create({ trader_id: recipient_id, amount, type: 'receive_rex', description: 'Received REX from ' + (sender.discord_username || trader_id), reason: 'transfer', transaction_date: new Date().toISOString() });
    } catch (e) {}
    
    return Response.json({ success: true, new_balance: (sender.rex_balance || 0) - amount });
  } catch (err) {
    return Response.json({ success: false, error: 'Transfer failed.' });
  }
});