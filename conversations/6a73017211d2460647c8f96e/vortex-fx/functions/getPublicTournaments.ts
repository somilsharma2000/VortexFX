import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  try {
    const tournaments = await base44.asServiceRole.entities.Tournament.list({ 
      limit: 50, sort: '-created_date'
    });
    return Response.json({ success: true, tournaments: tournaments || [] });
  } catch (err) {
    return Response.json({ success: true, tournaments: [] });
  }
});