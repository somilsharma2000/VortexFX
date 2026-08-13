import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { tournament_id } = body;
  try {
    let participants;
    if (tournament_id) {
      participants = await base44.asServiceRole.entities.Participant.filter({ tournament_id });
    } else {
      participants = await base44.asServiceRole.entities.Participant.list();
    }
    if (participants) participants.sort((a, b) => (Number(b.roi) || 0) - (Number(a.roi) || 0));
    if (participants && participants.length > 100) participants = participants.slice(0, 100);
    return Response.json({ success: true, participants: participants || [] });
  } catch (err) {
    return Response.json({ success: true, participants: [] });
  }
});