// FORTREX Waitlist System — Join + Position Tracking + Referrals
// Handles waitlist registration, position calculation, and referral jumps

interface WaitlistPayload {
  action: 'join' | 'status' | 'referral_stats';
  discord_id?: string;
  discord_username?: string;
  email?: string;
  referral_code?: string;
  trader_id?: string;
}

export default async function handler(req: Request): Promise<Response> {
  try {
    const payload: WaitlistPayload = await req.json();
    const base44 = (globalThis as any).base44;

    if (payload.action === 'join') {
      // Check if already on waitlist
      const existing = await base44.entities.WaitlistEntry.list({
        filter: { email: payload.email }
      });

      if (existing && existing.length > 0) {
        // Return existing position
        const total = await base44.entities.WaitlistEntry.list({ limit: 1 });
        const total_count = total.length;
        
        // Count how many referrals this person made
        const referrals = await base44.entities.Referral.list({
          filter: { referrer_id: payload.discord_id }
        });
        const referral_count = referrals ? referrals.length : 0;
        const spots_jumped = referral_count * 50;
        
        return new Response(JSON.stringify({
          success: true,
          position: existing[0].data.position,
          total_count: total_count + 3737, // Base count for social proof
          referral_count: referral_count,
          spots_jumped: spots_jumped,
          referral_code: payload.referral_code || 'FORTREX' + payload.discord_id,
          already_registered: true
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      // Get current count for position
      const all = await base44.entities.WaitlistEntry.list({ limit: 500 });
      const position = all.length + 1;
      const total_count = position + 3737;

      // Create waitlist entry
      await base44.entities.WaitlistEntry.create({
        email: payload.email || '',
        phone: '',
        position: position,
        referred_by: payload.referral_code || '',
        discord_joined: true,
        telegram_joined: false,
        signup_date: new Date().toISOString().split('T')[0]
      });

      // If referred by someone, create a referral record
      if (payload.referral_code && payload.referral_code !== payload.discord_id) {
        const referrer = await base44.entities.Trader.list({
          filter: { referral_code: payload.referral_code }
        });
        
        if (referrer && referrer.length > 0) {
          await base44.entities.Referral.create({
            referrer_id: referrer[0].data.discord_id,
            referrer_username: referrer[0].data.discord_username,
            referred_id: payload.discord_id || '',
            referred_username: payload.discord_username || '',
            referral_date: new Date().toISOString().split('T')[0],
            status: 'pending',
            reward_amount_rex: 0,
            qualified: false
          });
        }
      }

      return new Response(JSON.stringify({
        success: true,
        position: position,
        total_count: total_count,
        referral_count: 0,
        spots_jumped: 0,
        referral_code: 'FORTREX' + (payload.discord_id || position),
        already_registered: false
      }), { headers: { 'Content-Type': 'application/json' } });

    } else if (payload.action === 'status') {
      // Get waitlist status for a user
      const entries = await base44.entities.WaitlistEntry.list({
        filter: { email: payload.email }
      });

      const all = await base44.entities.WaitlistEntry.list({ limit: 500 });
      const total_count = all.length + 3737;

      if (entries && entries.length > 0) {
        // Count referrals
        const referrals = await base44.entities.Referral.list({
          filter: { referrer_id: payload.discord_id }
        });
        const referral_count = referrals ? referrals.length : 0;
        
        // Calculate adjusted position (original position minus 50 per referral, min 1)
        const original_position = entries[0].data.position;
        const adjusted_position = Math.max(1, original_position - (referral_count * 50));

        return new Response(JSON.stringify({
          success: true,
          position: adjusted_position,
          original_position: original_position,
          total_count: total_count,
          referral_count: referral_count,
          spots_jumped: referral_count * 50,
          referral_code: 'FORTREX' + (payload.discord_id || ''),
          referral_link: `https://somilsharma2000.github.io/VortexFX/?ref=FORTREX${payload.discord_id || ''}`
        }), { headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({
        success: false,
        error: 'Not on waitlist',
        total_count: total_count
      }), { headers: { 'Content-Type': 'application/json' } });

    } else if (payload.action === 'referral_stats') {
      // Get just the referral stats
      const referrals = await base44.entities.Referral.list({
        filter: { referrer_id: payload.discord_id }
      });
      const all = await base44.entities.WaitlistEntry.list({ limit: 500 });
      const total_count = all.length + 3737;

      return new Response(JSON.stringify({
        success: true,
        referral_count: referrals ? referrals.length : 0,
        total_count: total_count,
        spots_jumped: (referrals ? referrals.length : 0) * 50
      }), { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid action'
    }), { headers: { 'Content-Type': 'application/json' } });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Server error: ' + (err as Error).message
    }), { headers: { 'Content-Type': 'application/json' } });
  }
}
