// FORTREX — Core Email Engine
// Accepts: template name, recipient, dynamic data
// Renders FORTREX-branded HTML template → sends via Resend API
// Logs to Transaction entity for audit trail

import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req: Request) => {
  try {
    const { 
      to, 
      template, 
      data = {}, 
      recipient_name = "",
      unsubscribe_token = ""
    } = await req.json();

    if (!to || !template) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "Missing required fields: to, template" 
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SENDER_EMAIL = Deno.env.get("FORTREX_SENDER_EMAIL") || "noreply@fortrex.com";

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: "RESEND_API_KEY not configured" 
      }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // ===== EMAIL TEMPLATE LIBRARY =====
    // Each template returns { subject, html, is_transactional }
    const templates: Record<string, () => { subject: string; html: string; is_transactional: boolean }> = {
      // A. TRANSACTIONAL EMAILS
      teaser_signup: () => ({
        subject: "You're In. The Gates Are Sealing.",
        is_transactional: true,
        html: renderTemplate({
          preheader: "Your spot is reserved. Founding Member status locked.",
          heroText: "YOU'RE IN",
          subText: "The Gates Are Sealing.",
          body: `
            <p>Trader,</p>
            <p>Your spot in FORTREX is reserved. You're now a <strong style="color:#E5C158">Founding Member</strong> — the highest status we offer.</p>
            <p>Here's what happens next:</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 12px;color:#E5C158;font-size:14px;letter-spacing:1px">YOUR POSITION: #${data.position || '—'}</p>
              <p style="margin:0 0 12px;color:#999;font-size:13px">✓ Spot reserved</p>
              <p style="margin:0 0 12px;color:#999;font-size:13px">✓ Founding Member status locked</p>
              <p style="margin:0;color:#999;font-size:13px">⏳ Email verification pending</p>
            </div>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.discord_invite || 'https://discord.gg/9pTSqeTbn'}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Join the Citadel Discord →</a>
            </p>
            <p style="font-size:13px;color:#666">Share FORTREX with your network:</p>
            <p style="font-size:13px">
              <a href="https://wa.me/?text=Join%20FORTREX%20-${data.referral_link || ''}" style="color:#E5C158;text-decoration:none;margin-right:16px">WhatsApp</a>
              <a href="https://twitter.com/intent/tweet?text=Just%20secured%20my%20spot%20in%20FORTREX%20${data.referral_link || ''}" style="color:#E5C158;text-decoration:none;margin-right:16px">X</a>
              <a href="${data.referral_link || ''}" style="color:#E5C158;text-decoration:none">Copy Referral Link</a>
            </p>
          `
        })
      }),

      email_verification: () => ({
        subject: "Verify Your Email to Lock Your Spot",
        is_transactional: true,
        html: renderTemplate({
          preheader: "Unverified spots are released in 24 hours.",
          heroText: "VERIFY YOUR EMAIL",
          subText: "Lock your spot before it's released.",
          body: `
            <p>Trader,</p>
            <p>Your spot is reserved, but it's not locked yet. You have <strong style="color:#E5C158">24 hours</strong> to verify your email before your position is released.</p>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.verification_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Verify Email Now →</a>
            </p>
            <p style="font-size:13px;color:#666;text-align:center">This link expires in 24 hours. Don't lose your spot.</p>
          `
        })
      }),

      discord_welcome: () => ({
        subject: "Welcome to the Inner Circle",
        is_transactional: true,
        html: renderTemplate({
          preheader: "You're inside. Here's how to earn REX.",
          heroText: "WELCOME TO THE INNER CIRCLE",
          subText: "You're in. Now let's get you earning.",
          body: `
            <p>Trader,</p>
            <p>You've joined the Citadel. You're now part of the inner circle — the traders who'll be first through the gates.</p>
            <p>Here's how to start earning REX right now:</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 12px;color:#E5C158;font-size:14px;letter-spacing:1px">HOW TO EARN REX</p>
              <p style="margin:0 0 10px;color:#999;font-size:13px">1. Daily check-in → +5 REX per day</p>
              <p style="margin:0 0 10px;color:#999;font-size:13px">2. Refer friends → +50 REX per qualified referral</p>
              <p style="margin:0 0 10px;color:#999;font-size:13px">3. Win tournaments → Prize pool in REX</p>
              <p style="margin:0;color:#999;font-size:13px">4. Streak milestones → Bonus REX rewards</p>
            </div>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.checkin_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Do Your First Check-in →</a>
            </p>
          `
        })
      }),

      registration_complete: () => ({
        subject: "Registration Complete. Next: Verification.",
        is_transactional: true,
        html: renderTemplate({
          preheader: "Your account is created. Complete verification to start trading.",
          heroText: "REGISTRATION COMPLETE",
          subText: "One step closer to the arena.",
          body: `
            <p>Trader,</p>
            <p>Your FORTREX account is live. But before you can enter the arena, you need to complete verification.</p>
            <p>Here's what's next:</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 12px;color:#999;font-size:13px">Step 1: <span style="color:#E5C158">✓ Registration</span></p>
              <p style="margin:0 0 12px;color:#999;font-size:13px">Step 2: KYC verification (upload documents)</p>
              <p style="margin:0 0 12px;color:#999;font-size:13px">Step 3: MT4 account linking</p>
              <p style="margin:0;color:#999;font-size:13px">Step 4: Broker onboarding & deposit</p>
            </div>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.kyc_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Complete KYC →</a>
            </p>
          `
        })
      }),

      tournament_registered: () => ({
        subject: `Registered for ${data.tournament_name || 'Tournament'}`,
        is_transactional: true,
        html: renderTemplate({
          preheader: "You're in. We'll notify you when it starts.",
          heroText: "TOURNAMENT REGISTERED",
          subText: data.tournament_name || 'Tournament',
          body: `
            <p>Trader,</p>
            <p>You're registered for <strong style="color:#E5C158">${data.tournament_name || 'the tournament'}</strong>.</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Dates:</strong> ${data.start_date || 'TBD'} → ${data.end_date || 'TBD'}</p>
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Format:</strong> Highest ROI wins</p>
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Markets:</strong> ${data.markets || 'Forex & Crypto'}</p>
              <p style="margin:0;color:#999;font-size:13px"><strong>Prize Pool:</strong> ${data.prize_pool || 'TBD'} REX</p>
            </div>
            <p>Standings are sealed until reveal day. Trade smart. We'll notify you 24 hours before the arena opens.</p>
          `
        })
      }),

      tournament_start_24h: () => ({
        subject: `${data.tournament_name || 'Tournament'} Starts Tomorrow`,
        is_transactional: true,
        html: renderTemplate({
          preheader: "Final reminder. The arena opens in 24 hours.",
          heroText: "STARTS TOMORROW",
          subText: data.tournament_name || 'Tournament',
          body: `
            <p>Trader,</p>
            <p>The arena opens in <strong style="color:#E5C158">24 hours</strong>. This is your final reminder.</p>
            <p>Quick recap:</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Format:</strong> Highest ROI wins</p>
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Markets:</strong> ${data.markets || 'Forex & Crypto'}</p>
              <p style="margin:0;color:#999;font-size:13px"><strong>Rule:</strong> Trade on your own MT4. We track results.</p>
            </div>
            <p>Trade smart. Manage your risk. We'll see you in the arena.</p>
          `
        })
      }),

      tournament_live: () => ({
        subject: "The Arena is Open. Start Trading.",
        is_transactional: true,
        html: renderTemplate({
          preheader: `${data.tournament_name || 'Tournament'} is live. Good luck.`,
          heroText: "THE ARENA IS OPEN",
          subText: "Start trading. Standings are sealed.",
          body: `
            <p>Trader,</p>
            <p><strong style="color:#E5C158">${data.tournament_name || 'The tournament'}</strong> is now live.</p>
            <p>Trade on your MT4 terminal as you normally would. We'll track your performance behind the scenes. Standings are sealed until reveal day — no live leaderboard, no mid-tournament rankings.</p>
            <p style="text-align:center;margin:32px 0;font-size:24px;color:#E5C158;letter-spacing:2px">GOOD LUCK</p>
          `
        })
      }),

      leaderboard_reveal: () => ({
        subject: "The Standings Are Revealed.",
        is_transactional: true,
        html: renderTemplate({
          preheader: "The results are in. See where you rank.",
          heroText: "STANDINGS REVEALED",
          subText: data.tournament_name || 'Tournament Results',
          body: `
            <p>Trader,</p>
            <p>The wait is over. The standings for <strong style="color:#E5C158">${data.tournament_name || 'the tournament'}</strong> are revealed.</p>
            ${data.is_winner ? `
              <div style="margin:24px 0;padding:24px;border:2px solid #E5C158;border-radius:8px;background:rgba(229,193,88,0.05);text-align:center">
                <p style="margin:0 0 8px;font-size:18px;color:#E5C158;font-weight:600">🏆 YOU WON</p>
                <p style="margin:0;color:#999;font-size:14px">Prize: ${data.prize_amount || ''} REX — on the way to your wallet</p>
              </div>
            ` : `
              <p>Your final position: <strong style="color:#E5C158">#${data.rank || '—'}</strong></p>
            `}
            <p style="text-align:center;margin:32px 0">
              <a href="${data.leaderboard_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">View Full Leaderboard →</a>
            </p>
          `
        })
      }),

      checkin_complete: () => ({
        subject: `Daily Check-in Complete. +${data.rex_earned || 5} REX`,
        is_transactional: true,
        html: renderTemplate({
          preheader: "Streak alive. REX earned.",
          heroText: "CHECK-IN COMPLETE",
          subText: `+${data.rex_earned || 5} REX earned`,
          body: `
            <p>Trader,</p>
            <p>Daily check-in complete. You earned <strong style="color:#E5C158">+${data.rex_earned || 5} REX</strong>.</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Current Streak:</strong> ${data.streak || 1} days 🔥</p>
              <p style="margin:0;color:#999;font-size:13px"><strong>Total REX Balance:</strong> ${data.total_rex || '—'}</p>
            </div>
            <p style="font-size:13px;color:#666">Come back tomorrow to keep your streak alive.</p>
          `
        })
      }),

      streak_milestone: () => ({
        subject: `${data.streak || 7}-Day Streak! You're On Fire.`,
        is_transactional: true,
        html: renderTemplate({
          preheader: "Milestone hit. Bonus REX incoming.",
          heroText: "STREAK MILESTONE",
          subText: `${data.streak || 7} days in a row`,
          body: `
            <p>Trader,</p>
            <p>You just hit a <strong style="color:#E5C158">${data.streak || 7}-day check-in streak</strong>. That's dedication.</p>
            <div style="margin:24px 0;padding:24px;border:2px solid #E5C158;border-radius:8px;background:rgba(229,193,88,0.05);text-align:center">
              <p style="margin:0 0 8px;font-size:16px;color:#E5C158;font-weight:600">BONUS EARNED</p>
              <p style="margin:0;color:#999;font-size:14px">+${data.bonus_rex || 25} REX added to your wallet</p>
            </div>
            <p>Keep it going. Don't break the streak.</p>
          `
        })
      }),

      referral_qualified: () => ({
        subject: `Your Friend Just Qualified. +50 REX`,
        is_transactional: true,
        html: renderTemplate({
          preheader: "Referral reward earned.",
          heroText: "REFERRAL QUALIFIED",
          subText: "+50 REX earned",
          body: `
            <p>Trader,</p>
            <p>Your referral <strong style="color:#E5C158">${data.referred_name || 'a trader'}</strong> just completed onboarding.</p>
            <p>You earned <strong style="color:#E5C158">+50 REX</strong> for the qualified referral.</p>
            <p style="font-size:13px;color:#666">Keep inviting. Every qualified referral = 50 REX.</p>
            <p style="text-align:center;margin:24px 0">
              <a href="${data.referral_link || ''}" style="display:inline-block;padding:12px 28px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Invite More →</a>
            </p>
          `
        })
      }),

      kyc_review: () => ({
        subject: "KYC Under Review",
        is_transactional: true,
        html: renderTemplate({
          preheader: "We're verifying your documents. 48h timeline.",
          heroText: "KYC UNDER REVIEW",
          subText: "Verification in progress.",
          body: `
            <p>Trader,</p>
            <p>We've received your KYC documents and are verifying them now. This typically takes <strong style="color:#E5C158">48 hours</strong>.</p>
            <p>You'll receive an email as soon as your verification is complete. No action needed from your end.</p>
          `
        })
      }),

      kyc_approved: () => ({
        subject: "You're Verified. The Arena Awaits.",
        is_transactional: true,
        html: renderTemplate({
          preheader: "KYC approved. Next step: broker onboarding.",
          heroText: "YOU'RE VERIFIED",
          subText: "The arena awaits.",
          body: `
            <p>Trader,</p>
            <p>Your KYC is approved. You're a verified FORTREX trader.</p>
            <p>Next step: link your MT4 account and complete your broker onboarding.</p>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.onboarding_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Continue Onboarding →</a>
            </p>
          `
        })
      }),

      mt4_linked: () => ({
        subject: "MT4 Account Linked. You're Ready.",
        is_transactional: true,
        html: renderTemplate({
          preheader: "Account verified. Tournament registration is open.",
          heroText: "MT4 LINKED",
          subText: "You're ready to compete.",
          body: `
            <p>Trader,</p>
            <p>Your MT4 account <strong style="color:#E5C158">${data.mt4_account || ''}</strong> is linked and verified.</p>
            <p>You can now register for tournaments and start competing.</p>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.tournaments_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">View Tournaments →</a>
            </p>
          `
        })
      }),

      onboarding_complete: () => ({
        subject: "You're a Verified Trader. Welcome to FORTREX.",
        is_transactional: true,
        html: renderTemplate({
          preheader: "Full access granted. Your REX welcome bonus is in your wallet.",
          heroText: "WELCOME TO FORTREX",
          subText: "You're fully verified. Let's compete.",
          body: `
            <p>Trader,</p>
            <p>You've completed onboarding. You're now a fully verified FORTREX trader with full platform access.</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>REX Balance:</strong> ${data.rex_balance || '500'} REX (welcome bonus)</p>
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Discord Role:</strong> Verified Trader</p>
              <p style="margin:0;color:#999;font-size:13px"><strong>Status:</strong> Tournament-ready</p>
            </div>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.tournaments_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Register for Tournament →</a>
            </p>
          `
        })
      }),

      prize_payout: () => ({
        subject: "Prize On the Way",
        is_transactional: true,
        html: renderTemplate({
          preheader: "Your tournament prize is being distributed.",
          heroText: "PRIZE ON THE WAY",
          subText: `${data.prize_amount || ''} REX`,
          body: `
            <p>Trader,</p>
            <p>Congratulations on your tournament finish. Your prize of <strong style="color:#E5C158">${data.prize_amount || ''} REX</strong> is being distributed to your wallet.</p>
            <p style="font-size:13px;color:#666">Prize distribution timeline: up to 7 days. You'll see it reflected in your REX balance.</p>
          `
        })
      }),

      // B. PROMOTIONAL EMAILS (include unsubscribe)
      weekly_newsletter: () => ({
        subject: `FORTREX Weekly — ${data.date || 'This Week'}`,
        is_transactional: false,
        html: renderTemplate({
          preheader: "Market recap, tournament news, and community highlights.",
          heroText: "FORTREX WEEKLY",
          subText: data.date || 'This Week',
          body: `
            <p>Trader,</p>
            <p style="font-size:15px;color:#E5C158;margin-bottom:24px"><strong>📊 MARKET RECAP</strong></p>
            <p style="font-size:14px;color:#ccc">${data.market_recap || 'Markets were volatile this week with major moves in EUR/USD and BTC/USD. The dollar strengthened against major pairs after Fed comments.'}</p>
            
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0">
            
            <p style="font-size:15px;color:#E5C158;margin-bottom:12px"><strong>🏆 TOURNAMENT NEWS</strong></p>
            <p style="font-size:14px;color:#ccc">${data.tournament_news || 'The current tournament is live. Standings are sealed until reveal day. Keep trading.'}</p>
            
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0">
            
            <p style="font-size:15px;color:#E5C158;margin-bottom:12px"><strong>💬 TRADER QUOTE OF THE WEEK</strong></p>
            <p style="font-size:14px;color:#ccc;font-style:italic">"${data.quote || 'Risk management is not optional. It\'s the difference between a trader and a gambler.'}"</p>
            
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0">
            
            <p style="font-size:15px;color:#E5C158;margin-bottom:12px"><strong>🎯 COMMUNITY HIGHLIGHT</strong></p>
            <p style="font-size:14px;color:#ccc">${data.community_highlight || 'Join the conversation in Discord. Top discussion: position sizing strategies for tournament trading.'}</p>
            
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.06);margin:24px 0">
            
            <p style="font-size:15px;color:#E5C158;margin-bottom:12px"><strong>💰 REX ECONOMY</strong></p>
            <p style="font-size:14px;color:#ccc">${data.rex_update || 'Total REX distributed: 0. Check in daily to earn yours.'}</p>
            
            <p style="text-align:center;margin:32px 0">
              <a href="https://discord.gg/9pTSqeTbn" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Join Discord →</a>
            </p>
            
            <p style="font-size:12px;color:#666;text-align:center">See you next Sunday.</p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      launch_announcement: () => ({
        subject: "The Gates Are Open. FORTREX is Live.",
        is_transactional: false,
        html: renderTemplate({
          preheader: "The wait is over. Register now.",
          heroText: "THE GATES ARE OPEN",
          subText: "FORTREX is live. Register now.",
          body: `
            <p>Trader,</p>
            <p>The wait is over. <strong style="color:#E5C158">FORTREX is live.</strong></p>
            <p>As a Founding Member, you have priority access. Complete your registration now to lock your spot in the Genesis Championship.</p>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.register_link || ''}" style="display:inline-block;padding:16px 40px;background:#E5C158;color:#06070A;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:1px;font-size:16px">REGISTER NOW →</a>
            </p>
            <p style="font-size:13px;color:#666">The Genesis Championship starts soon. Don't miss it.</p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      waitlist_milestone: () => ({
        subject: `We Just Hit ${data.milestone || '1,000'}. ${data.remaining || '9,000'} to Go.`,
        is_transactional: false,
        html: renderTemplate({
          preheader: "The movement is growing. Bring your people.",
          heroText: "THE MOVEMENT IS GROWING",
          subText: `${data.milestone || '1,000'} traders and counting`,
          body: `
            <p>Trader,</p>
            <p>We just hit <strong style="color:#E5C158">${data.milestone || '1,000'} traders</strong> on the waitlist. The momentum is real.</p>
            <p>But we're not stopping. Every referral moves you up the list — and earns you REX when they qualify.</p>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.referral_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Invite Your People →</a>
            </p>
            <p style="font-size:13px;color:#666">${data.remaining || '9,000'} spots left until launch.</p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      re_engagement_7d: () => ({
        subject: "The Charts Miss You.",
        is_transactional: false,
        html: renderTemplate({
          preheader: "Come back. New content and tournaments waiting.",
          heroText: "THE CHARTS MISS YOU",
          subText: "It's been a week.",
          body: `
            <p>Trader,</p>
            <p>You haven't checked in for 7 days. Your streak is at risk.</p>
            <p>Here's what you're missing:</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 10px;color:#999;font-size:13px">📅 New tournament announced</p>
              <p style="margin:0 0 10px;color:#999;font-size:13px">💬 Active discussions in Discord</p>
              <p style="margin:0;color:#999;font-size:13px">🔥 Your check-in streak is fading</p>
            </div>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.checkin_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Check In Now →</a>
            </p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      re_engagement_14d: () => ({
        subject: "Your Spot Might Not Hold Forever.",
        is_transactional: false,
        html: renderTemplate({
          preheader: "14 days inactive. Last chance.",
          heroText: "DON'T LOSE YOUR SPOT",
          subText: "14 days is too long.",
          body: `
            <p>Trader,</p>
            <p>You've been inactive for 14 days. A new tournament is starting soon, and your Founding Member status has an expiry date.</p>
            <p>Don't lose everything you've built. Come back now.</p>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.dashboard_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Return to FORTREX →</a>
            </p>
            <p style="font-size:13px;color:#666">Your streak. Your REX. Your status. Don't let them fade.</p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      pre_launch_hype: () => ({
        subject: `${data.days_left || '10'} Days Until the Arena Opens`,
        is_transactional: false,
        html: renderTemplate({
          preheader: "The countdown begins. Get ready.",
          heroText: "THE COUNTDOWN BEGINS",
          subText: `${data.days_left || '10'} days until launch`,
          body: `
            <p>Trader,</p>
            <p>The arena opens in <strong style="color:#E5C158">${data.days_left || '10'} days</strong>. Here's what to expect:</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 10px;color:#999;font-size:13px">🏆 Genesis Championship — first tournament</p>
              <p style="margin:0 0 10px;color:#999;font-size:13px">💰 REX wallet goes live</p>
              <p style="margin:0 0 10px;color:#999;font-size:13px">📊 Tournament registration opens</p>
              <p style="margin:0;color:#999;font-size:13px">🔥 Full platform access for Founding Members</p>
            </div>
            <p style="font-size:13px;color:#666">Get your Discord ready. Get your MT4 set up. The gates are opening.</p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      new_tournament: () => ({
        subject: `New Tournament: ${data.tournament_name || 'TBA'}`,
        is_transactional: false,
        html: renderTemplate({
          preheader: "A new arena is opening. Register now.",
          heroText: "NEW TOURNAMENT",
          subText: data.tournament_name || 'Registration open',
          body: `
            <p>Trader,</p>
            <p>A new tournament is open for registration:</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(229,193,88,0.2);border-radius:8px;background:rgba(229,193,88,0.03)">
              <p style="margin:0 0 8px;color:#E5C158;font-size:16px;font-weight:600">${data.tournament_name || 'Tournament'}</p>
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Dates:</strong> ${data.start_date || 'TBD'} → ${data.end_date || 'TBD'}</p>
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Prize Pool:</strong> ${data.prize_pool || 'TBD'} REX</p>
              <p style="margin:0;color:#999;font-size:13px"><strong>Markets:</strong> ${data.markets || 'Forex & Crypto'}</p>
            </div>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.register_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Register Now →</a>
            </p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      community_spotlight: () => ({
        subject: `Trader of the Week: ${data.trader_name || 'TBA'}`,
        is_transactional: false,
        html: renderTemplate({
          preheader: "Meet this week's featured trader.",
          heroText: "TRADER OF THE WEEK",
          subText: data.trader_name || 'Featured Community Member',
          body: `
            <p>Trader,</p>
            <p>This week, we're spotlighting <strong style="color:#E5C158">${data.trader_name || 'a community member'}</strong>.</p>
            <p style="font-size:14px;color:#ccc;font-style:italic;margin:20px 0">"${data.trader_quote || 'I started with nothing but a laptop and a Discord server. FORTREX changed how I approach trading.'}"</p>
            <p style="font-size:14px;color:#999">${data.trader_story || 'Read their full journey and trading strategy on our Discord.'}</p>
            <p style="text-align:center;margin:32px 0">
              <a href="https://discord.gg/9pTSqeTbn" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Read More on Discord →</a>
            </p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      content_drop: () => ({
        subject: `New Video: ${data.video_title || 'New Content'}`,
        is_transactional: false,
        html: renderTemplate({
          preheader: "Fresh trading content. Watch and learn.",
          heroText: "NEW CONTENT",
          subText: data.video_title || 'New video dropped',
          body: `
            <p>Trader,</p>
            <p>We just dropped new content: <strong style="color:#E5C158">${data.video_title || 'New Video'}</strong></p>
            <p style="font-size:14px;color:#ccc">${data.video_description || 'Watch and learn new trading strategies.'}</p>
            <p style="text-align:center;margin:32px 0">
              <a href="${data.video_link || ''}" style="display:inline-block;padding:14px 32px;background:#E5C158;color:#06070A;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:0.5px">Watch Now →</a>
            </p>
          `,
          unsubscribe: true,
          unsubscribe_token: unsubscribe_token,
          recipient_email: to
        })
      }),

      security_login: () => ({
        subject: "New Login Detected",
        is_transactional: true,
        html: renderTemplate({
          preheader: "Security notification — new device logged in.",
          heroText: "NEW LOGIN DETECTED",
          subText: "Was this you?",
          body: `
            <p>Trader,</p>
            <p>A new login was detected on your FORTREX account.</p>
            <div style="margin:24px 0;padding:20px;border:1px solid rgba(255,100,100,0.15);border-radius:8px;background:rgba(255,100,100,0.03)">
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>Time:</strong> ${data.login_time || 'Unknown'}</p>
              <p style="margin:0 0 8px;color:#999;font-size:13px"><strong>IP:</strong> ${data.ip_address || 'Unknown'}</p>
              <p style="margin:0;color:#999;font-size:13px"><strong>Device:</strong> ${data.device || 'Unknown'}</p>
            </div>
            <p style="font-size:13px;color:#666">If this wasn't you, contact us immediately in Discord.</p>
          `
        })
      }),
    };

    // Get the template
    const templateFn = templates[template];
    if (!templateFn) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Unknown template: ${template}. Available: ${Object.keys(templates).join(', ')}` 
      }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const emailContent = templateFn();
    const fromName = "FORTREX";
    const fromEmail = SENDER_EMAIL;

    // Build unsubscribe header for promotional emails
    const headers: Record<string, string> = {
      "X-Entity-Ref-ID": `fortrex_${template}_${Date.now()}`,
    };

    if (!emailContent.is_transactional && unsubscribe_token) {
      headers["List-Unsubscribe"] = `<https://somilsharma2000.github.io/VortexFX/unsubscribe.html?token=${unsubscribe_token}&email=${encodeURIComponent(to)}>`;
      headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
    }

    // Send via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: recipient_name ? `${recipient_name} <${to}>` : to,
        subject: emailContent.subject,
        html: emailContent.html,
        headers,
        tags: [
          { name: "template", value: template },
          { name: "type", value: emailContent.is_transactional ? "transactional" : "promotional" }
        ]
      })
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: `Resend API error: ${resendData.message || 'Unknown error'}`,
        details: resendData
      }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // Log to database
    try {
      const base44 = createClientFromRequest(req);
      await base44.asServiceRole.entities.Transaction.create({
        data: {
          type: "email_sent",
          amount: 0,
          description: `Email: ${emailContent.subject}`,
          reason: template,
          reference_id: resendData.id || null,
          trader_id: data.trader_id || null,
          transaction_date: new Date().toISOString()
        }
      });
    } catch (dbErr) {
      // Email sent successfully, just couldn't log — don't fail the request
      console.log("DB log failed:", dbErr);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message_id: resendData.id,
      template,
      recipient: to,
      subject: emailContent.subject,
      type: emailContent.is_transactional ? "transactional" : "promotional"
    }), { status: 200, headers: { "Content-Type": "application/json" } });

  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});

// ===== FORTREX EMAIL TEMPLATE RENDERER =====
function renderTemplate(opts: {
  preheader: string;
  heroText: string;
  subText: string;
  body: string;
  unsubscribe?: boolean;
  unsubscribe_token?: string;
  recipient_email?: string;
}): string {
  const unsubscribeHtml = opts.unsubscribe && opts.unsubscribe_token && opts.recipient_email
    ? `<tr><td style="padding:24px 0;text-align:center">
         <p style="font-size:12px;color:#555">You're receiving this because you opted in to FORTREX updates.</p>
         <p style="font-size:12px;margin:8px 0">
           <a href="https://somilsharma2000.github.io/VortexFX/unsubscribe.html?token=${opts.unsubscribe_token}&email=${encodeURIComponent(opts.recipient_email)}" style="color:#666;text-decoration:underline">Unsubscribe</a>
         </p>
       </td></tr>`
    : `<tr><td style="padding:24px 0;text-align:center">
         <p style="font-size:12px;color:#555">This is a transactional email from FORTREX. You cannot unsubscribe from this.</p>
       </td></tr>`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>FORTREX</title>
</head>
<body style="margin:0;padding:0;background:#06070A;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif">
  <!-- Preheader (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${opts.preheader}</div>
  
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#06070A">
    <tr>
      <td align="center" style="padding:20px">
        <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background:#0A0B0F;border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden">
          
          <!-- Logo + Brand -->
          <tr>
            <td style="padding:32px 24px 16px;text-align:center;background:linear-gradient(180deg,#0A0B0F 0%,#06070A 100%)">
              <div style="display:inline-block;width:48px;height:48px;margin-bottom:12px">
                <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 4 L56 14 L56 32 C56 46 44 56 32 60 C20 56 8 46 8 32 L8 14 Z" stroke="#E5C158" stroke-width="1.5" fill="none" opacity="0.4"/>
                  <path d="M22 18 L42 18 L42 24 L28 24 L28 30 L38 30 L38 36 L28 36 L28 46 L22 46 Z" fill="#E5C158"/>
                </svg>
              </div>
              <h1 style="margin:0;font-size:20px;font-weight:200;letter-spacing:6px;color:#fff">FORTREX</h1>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="padding:0">
              <div style="height:1px;background:linear-gradient(90deg,transparent 0%,rgba(229,193,88,0.3) 50%,transparent 100%)"></div>
            </td>
          </tr>

          <!-- Hero text -->
          <tr>
            <td style="padding:40px 24px 8px;text-align:center">
              <h2 style="margin:0;font-size:22px;font-weight:600;letter-spacing:2px;color:#E5C158">${opts.heroText}</h2>
              <p style="margin:8px 0 0;font-size:14px;font-weight:300;color:#666;letter-spacing:0.5px">${opts.subText}</p>
            </td>
          </tr>

          <!-- Body content -->
          <tr>
            <td style="padding:24px 32px 32px;font-size:15px;line-height:1.7;color:#ccc">
              ${opts.body}
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="padding:0">
              <div style="height:1px;background:linear-gradient(90deg,transparent 0%,rgba(229,193,88,0.2) 50%,transparent 100%)"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;text-align:center">
              <p style="margin:0 0 12px;font-size:13px;color:#E5C158;letter-spacing:1px">FORTREX</p>
              <p style="margin:0 0 8px;font-size:11px;color:#555">Seychelles IBC · Offshore Entity</p>
              <p style="margin:0 0 16px;font-size:11px;color:#444">
                <a href="https://somilsharma2000.github.io/VortexFX/terms.html" style="color:#555;text-decoration:none">Terms</a> · 
                <a href="https://somilsharma2000.github.io/VortexFX/privacy.html" style="color:#555;text-decoration:none">Privacy</a> · 
                <a href="https://discord.gg/9pTSqeTbn" style="color:#555;text-decoration:none">Discord</a>
              </p>
            </td>
          </tr>

          <!-- Unsubscribe / Transactional notice -->
          ${unsubscribeHtml}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
