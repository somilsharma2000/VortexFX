/**
 * FORTEX FX — Discord Auth Backend Function
 * Handles Discord OAuth callback: creates or updates trader record.
 */
export default async function(req, res) {
  const { discord_id, discord_username, avatar, referral_code } = req.body;
  
  if (!discord_id || !discord_username) {
    return res.json({ success: false, error: "Discord ID and username required" });
  }

  // Check if trader already exists
  const existing = await base44.entities.Trader.list({ 
    filter: { discord_id: discord_id } 
  });

  if (existing && existing.length > 0) {
    const trader = existing[0];
    
    if (trader.banned) {
      return res.json({ success: false, error: "Account suspended" });
    }

    // Update last login info
    await base44.entities.Trader.update(trader.id, {
      discord_username: discord_username,
      avatar: avatar || trader.avatar
    });

    return res.json({
      success: true,
      trader_id: trader.id,
      is_new: false,
      trader: {
        id: trader.id,
        username: discord_username,
        avatar: avatar || trader.avatar,
        verified: trader.verified,
        mt4_linked: trader.mt4_linked,
        rex_balance: trader.rex_balance,
        checkin_streak: trader.checkin_streak,
        role: trader.role
      }
    });
  }

  // Create new trader
  const newTraderData = {
    discord_id: discord_id,
    discord_username: discord_username,
    avatar: avatar || "",
    verified: false,
    mt4_linked: false,
    mt4_account: "",
    rex_balance: 0,
    checkin_streak: 0,
    best_streak: 0,
    total_checkins: 0,
    last_checkin_date: "",
    joined_date: new Date().toISOString().split('T')[0],
    role: "trader",
    banned: false,
    referral_code: `${discord_username.slice(0, 6).toUpperCase()}${discord_id.slice(-4)}`,
    referred_by: referral_code || ""
  };

  const newTrader = await base44.entities.Trader.create(newTraderData);

  // If referred, create referral record
  if (referral_code) {
    const referrers = await base44.entities.Trader.list({
      filter: { referral_code: referral_code }
    });
    
    if (referrers && referrers.length > 0) {
      const referrer = referrers[0];
      await base44.entities.Referral.create({
        referrer_id: referrer.id,
        referrer_username: referrer.discord_username,
        referred_id: newTrader.id,
        referred_username: discord_username,
        referral_date: new Date().toISOString().split('T')[0],
        status: "pending",
        qualified: false,
        reward_amount_rex: 0
      });
    }
  }

  // Update registration count
  const regCountSettings = await base44.entities.PlatformSetting.list({
    filter: { key: "registration_count" }
  });
  
  if (regCountSettings && regCountSettings.length > 0) {
    const currentCount = parseInt(regCountSettings[0].value) + 1;
    await base44.entities.PlatformSetting.update(regCountSettings[0].id, {
      value: String(currentCount),
      last_updated: new Date().toISOString().split('T')[0]
    });
  }

  return res.json({
    success: true,
    trader_id: newTrader.id,
    is_new: true,
    trader: {
      id: newTrader.id,
      username: discord_username,
      avatar: avatar || "",
      verified: false,
      mt4_linked: false,
      rex_balance: 0,
      checkin_streak: 0,
      role: "trader"
    }
  });
}
