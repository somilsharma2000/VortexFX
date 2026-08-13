import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    let body = {};
    try { body = await req.json(); } catch {}
    const tournamentId = (body.tournamentId || "").toString();

    let entries;
    if (tournamentId) {
      entries = await base44.asServiceRole.entities.LeaderboardEntry.filter({ tournament_id: tournamentId });
    } else {
      entries = await base44.asServiceRole.entities.LeaderboardEntry.list("-rank", 500);
    }

    const verified = entries.filter((e) => e.mt4_verified === true);
    return Response.json({ entries: verified });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}