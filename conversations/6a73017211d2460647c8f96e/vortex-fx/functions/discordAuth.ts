import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { access_token, referral_code } = body;
  if (!access_token) return Response.json({ success: false, error: 'No access token provided.' });
  
  try {
    const userRes = await fetch('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${access_token}` } });
    if (!userRes.ok) return Response.json({ success: false, error: 'Failed to get Discord user info.' });
    const discordUser = await userRes.json();
    
    const guildRes = await fetch('https://discord.com/api/users/@me/guilds', { headers: { Authorization: `Bearer ${access_token}` } });
    let inGuild = false;
    if (guildRes.ok) { const guilds = await guildRes.json(); inGuild = guilds.some(g => g.id === '1526348728108322946'); }
    
    if (!inGuild) return Response.json({ success: false, error: 'You must join our Discord server first.', needs_guild: true, invite_url: 'https://discord.gg/9pTSqeTbn' });
    
    let trader;
    try {
      const existing = await base44.asServiceRole.entities.Trader.filter({ discord_id: discordUser.id });
      if (existing && existing.length > 0) {
        trader = existing[0];
        await base44.asServiceRole.entities.Trader.update(trader.id, { discord_username: discordUser.username });
      } else {
        const allTraders = await base44.asServiceRole.entities.Trader.list();
        const position = allTraders ? allTraders.length + 1 : 1;
        trader = await base44.asServiceRole.entities.Trader.create({
          discord_id: discordUser.id, discord_username: discordUser.username,
          avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : '',
          role: 'member', verified: true, rex_balance: position <= 2500 ? 50 : 0,
          checkin_streak: 0, total_checkins: 0, battlepass_level: 1, battlepass_xp: 0,
          trader_class: 'Rookie', mt4_linked: false, banned: false,
          joined_date: new Date().toISOString(),
          referral_code: 'FORTREX-' + discordUser.id.slice(-6).toUpperCase(),
          referred_by: referral_code || ''
        });
      }
    } catch (e) {
      trader = { id: discordUser.id, discord_id: discordUser.id, discord_username: discordUser.username,
        avatar: discordUser.avatar ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png` : '',
        role: 'member', verified: true, rex_balance: 0, checkin_streak: 0, total_checkins: 0,
        battlepass_level: 1, battlepass_xp: 0, trader_class: 'Rookie', mt4_linked: false, banned: false,
        joined_date: new Date().toISOString(), referral_code: 'FORTREX-' + discordUser.id.slice(-6).toUpperCase() };
    }
    return Response.json({ success: true, trader });
  } catch (err) {
    return Response.json({ success: false, error: 'Authentication failed.' });
  }
});