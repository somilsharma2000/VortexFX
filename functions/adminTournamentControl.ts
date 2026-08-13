import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id, tournament_id, action } = body;
  if (!admin_id || !tournament_id || !action) return Response.json({ success: false, error: 'Missing parameters.' });
  try {
    const tournament = await base44.asServiceRole.entities.Tournament.get(tournament_id);
    if (!tournament) return Response.json({ success: false, error: 'Tournament not found.' });
    const actions = { activate: { status: 'active', is_active: true }, pause: { status: 'upcoming', is_active: false }, reveal: { status: 'revealing' }, complete: { status: 'completed', is_active: false }, cancel: { status: 'cancelled', is_active: false } };
    if (!actions[action]) return Response.json({ success: false, error: 'Invalid action: ' + action });
    const updated = await base44.asServiceRole.entities.Tournament.update(tournament_id, actions[action]);
    return Response.json({ success: true, tournament: updated });
  } catch (err) { return Response.json({ success: false, error: 'Action failed.' }); }
});