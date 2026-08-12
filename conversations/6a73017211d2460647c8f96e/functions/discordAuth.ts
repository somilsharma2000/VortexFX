/**
 * FORTEX FX — Discord Auth Backend Function
 * Full OAuth flow: receives Discord auth code, exchanges for token,
 * fetches user info, creates or updates trader record.
 */
export default async function(req, res) {
  const { code, referral_code } = req.body;

  if (!code) {
    return res.json({ success: false, error: "Authorization code required" });
  }

  // Discord OAuth credentials from environment
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || "https://somilsharma2000.github.io/VortexFX/signin.html";

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.json({ success: false, error: "Discord OAuth not configured. Contact admin." });
  }

  // Step 1: Exchange code for access token
  let tokenResponse;
  try {
    tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI
      })
    });
  } catch (err) {
    return res.json({ success: false, error: "Failed to reach Discord for token exchange" });
  }

  if (!tokenResponse.ok) {
    return res.json({ success: false, error: "Discord token exchange failed — code may be expired" });
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;
  const refreshToken = tokenData.refresh_token;

  if (!accessToken) {
    return res.json({ success: false, error: "No access token received from Discord" });
  }

  // Step 2: Fetch user info from Discord
  let userResponse;
  try {
    userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  } catch (err) {
    return res.json({ success: false, error: "Failed to fetch Discord user info" });
  }

  if (!userResponse.ok) {
    return res.json({ success: false, error: "Failed to get Discord profile" });
  }

  const discordUser = await userResponse.json();
  const discord_id = discordUser.id;
  const discord_username = discordUser.username;
  const avatar = discordUser.avatar 
    ? `https://cdn.discordapp.com/avatars/${discord_id}/${discordUser.avatar}.png`
    : "";

  if (!discord_id || !discord_username) {
    return res.json({ success: false, error: "Could not retrieve Discord profile" });
  }

  // Step 3: Check if trader already exists
  const existing = await base44.entities.Trader.list({
    filter: { discord_id: discord_id }
  });

  if (existing && existing.length > 0) {
    const trader = existing[0];

    if (trader.banned) {
      return res.json({ success: false, error: "Account suspended. Contact admin." });
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
        best_streak: trader.best_streak,
        total_checkins: trader.total_checkins,
        role: trader.role,
        referral_code: trader.referral_code
      }
    });
  }

  // Step 4: Create new trader
  const genReferralCode = `${discord_username.slice(0, 6).toUpperCase().replace(/[^A-Z0-9]/g, 'X')}${discord_id.slice(-4)}`;

  const newTraderData = {
    discord_id: discord_id,
    discord_username: discord_username,
    avatar: avatar,
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
    banned_reason: "",
    referral_code: genReferralCode,
    referred_by: referral_code || ""
  };

  const newTrader = await base44.entities.Trader.create(newTraderData);

  // Step 5: Create referral record if referred
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

  // Step 6: Increment registration count
  const regCountSettings = await base44.entities.PlatformSetting.list({
    filter: { key: "registration_count" }
  });

  if (regCountSettings && regCountSettings.length > 0) {
    const currentCount = parseInt(regCountSettings[0].value) + 1;
    await base44.entities.PlatformSetting.update(regCountSettings[0].id, {
      value: String(currentCount),
      last_updated: new Date().toISOString(),
      updated_by: "discordAuth"
    });
  } else {
    // Create the setting if it doesn't exist
    await base44.entities.PlatformSetting.create({
      key: "registration_count",
      value: "1",
      category: "stats",
      description: "Total registered traders",
      last_updated: new Date().toISOString(),
      updated_by: "discordAuth"
    });
  }

  return res.json({
    success: true,
    trader_id: newTrader.id,
    is_new: true,
    trader: {
      id: newTrader.id,
      username: discord_username,
      avatar: avatar,
      verified: false,
      mt4_linked: false,
      rex_balance: 0,
      checkin_streak: 0,
      best_streak: 0,
      total_checkins: 0,
      role: "trader",
      referral_code: genReferralCode
    }
  });
}
