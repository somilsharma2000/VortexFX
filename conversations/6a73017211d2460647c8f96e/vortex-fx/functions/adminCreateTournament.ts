import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id, name, description, type, start_date, end_date, reveal_date, entry_criteria_min_deposit, prize_pool_rex, markets } = body;
  if (!admin_id) return Response.json({ success: false, error: 'Admin ID required.' });
  if (!name) return Response.json({ success: false, error: 'Tournament name required.' });
  
  try {
    const tournament = await base44.asServiceRole.entities.Tournament.create({
      name, description: description || '', type: type || 'monthly', status: 'upcoming',
      start_date: start_date || '', end_date: end_date || '', reveal_date: reveal_date || '',
      entry_criteria_min_deposit: entry_criteria_min_deposit || 100, prize_pool_rex: prize_pool_rex || 0,
      markets: markets || 'Forex, Crypto', is_active: false, participant_count: 0, created_by: admin_id
    });
    return Response.json({ success: true, tournament });
  } catch (err) {
    return Response.json({ success: false, error: 'Failed to create tournament.' });
  }
});