import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    let body = {};
    try { body = await req.json(); } catch {}

    if (body.action === "join") {
      const email = String(body.email || "").trim().toLowerCase();
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
      }
      const existing = await base44.asServiceRole.entities.WaitlistEntry.filter({ email });
      if (existing && existing.length) {
        const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
        return Response.json({ ok: true, exists: true, count: all.length });
      }
      const today = new Date().toISOString().slice(0, 10);
      const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
      await base44.asServiceRole.entities.WaitlistEntry.create({
        email,
        signup_date: today,
        position: all.length + 1,
        discord_joined: false,
        telegram_joined: false,
      });
      return Response.json({ ok: true, exists: false, count: all.length + 1 });
    }

    // default: stats
    const list = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
    return Response.json({ ok: true, count: list.length });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}