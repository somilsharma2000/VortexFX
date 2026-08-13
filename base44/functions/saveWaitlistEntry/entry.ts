import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    let body = {};
    try { body = await req.json(); } catch {}

    const email = (body.email || "").toString().trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await base44.asServiceRole.entities.WaitlistEntry.filter({ email });
    if (existing.length) {
      const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
      return Response.json({ ok: true, exists: true, totalTraders: all.length });
    }

    const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
    await base44.asServiceRole.entities.WaitlistEntry.create({
      email,
      signup_date: new Date().toISOString().slice(0, 10),
      position: all.length + 1,
      discord_joined: false,
      telegram_joined: false,
      status: "pending",
      source: body.source || "teaser",
      joinedDate: new Date().toISOString(),
    });

    const apiKey = secrets.get("RESEND_API_KEY");
    const sender = secrets.get("FORTREX_SENDER_EMAIL");
    if (apiKey && sender) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: sender,
            to: email,
            subject: "Welcome to FORTREX — The Gates Are Opening",
            html:
              "<div style='font-family:Inter,Arial,sans-serif;background:#0A0E27;color:#ffffff;padding:40px;text-align:center'>" +
              "<h1 style='color:#D4AF37;margin:0 0 16px'>Welcome to FORTREX</h1>" +
              "<p style='color:#A0A0A0;font-size:15px'>You're on the list. The gates open at 10,000 traders.</p>" +
              "<p style='margin-top:24px'><a href='https://discord.gg/z2qVgJgCg4' style='color:#D4AF37;font-weight:bold'>Join the community</a></p>" +
              "</div>",
          }),
        });
      } catch {}
    }

    return Response.json({ ok: true, exists: false, totalTraders: all.length + 1 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}