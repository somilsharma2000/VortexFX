import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  try {
    let tournaments = await base44.asServiceRole.entities.Tournament.list();
    if (tournaments) tournaments.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    if (tournaments && tournaments.length > 50) tournaments = tournaments.slice(0, 50);
    return Response.json({ success: true, tournaments: tournaments || [] });
  } catch (err) {
    return Response.json({ success: true, tournaments: [] });
  }
});