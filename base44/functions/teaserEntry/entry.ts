import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    let body = {};
    try { body = await req.json(); } catch {}

    if (body.action === "stats") {
      const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
      return Response.json({ count: all.length });
    }

    if (body.action === "join") {
      const email = (body.email || "").toString().trim().toLowerCase();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return Response.json({ error: "Invalid email" }, { status: 400 });
      }
      const existing = await base44.asServiceRole.entities.WaitlistEntry.filter({ email });
      if (existing.length) {
        const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
        return Response.json({ ok: true, exists: true, count: all.length });
      }
      const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
      await base44.asServiceRole.entities.WaitlistEntry.create({
        email,
        signup_date: new Date().toISOString().slice(0, 10),
        position: all.length + 1,
        discord_joined: false,
        telegram_joined: false,
        status: "pending",
        source: "teaser",
        joinedDate: new Date().toISOString(),
      });
      return Response.json({ ok: true, exists: false, count: all.length + 1 });
    }

    return Response.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}