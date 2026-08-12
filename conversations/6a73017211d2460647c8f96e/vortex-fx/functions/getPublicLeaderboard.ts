import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { tournament_id } = body;
  try {
    if (tournament_id) {
      const participants = await base44.asServiceRole.entities.Participant.list({
        filter: { tournament_id }, limit: 500, sort: '-roi'
      });
      return Response.json({ success: true, participants: participants || [] });
    }
    const participants = await base44.asServiceRole.entities.Participant.list({
      limit: 100, sort: '-roi'
    });
    return Response.json({ success: true, participants: participants || [] });
  } catch (err) {
    return Response.json({ success: true, participants: [] });
  }
});