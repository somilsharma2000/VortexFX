/**
 * FORTEX FX — Link MT4/MT5 Account
 * Links a broker account number to a trader profile.
 */
export default async function(req, res) {
  const { trader_id, mt4_account } = req.body;
  
  if (!trader_id || !mt4_account) {
    return res.json({ success: false, error: "Trader ID and MT4 account number required" });
  }

  // Check if MT4 account is already linked to another trader
  const existing = await base44.entities.Trader.list({
    filter: { mt4_account: mt4_account, mt4_linked: true }
  });

  if (existing && existing.length > 0 && existing[0].id !== trader_id) {
    return res.json({ 
      success: false, 
      error: "This MT4/MT5 account is already linked to another trader" 
    });
  }

  // Update trader
  await base44.entities.Trader.update(trader_id, {
    mt4_account: mt4_account,
    mt4_linked: true
  });

  return res.json({
    success: true,
    message: "MT4/MT5 account linked successfully"
  });
}
