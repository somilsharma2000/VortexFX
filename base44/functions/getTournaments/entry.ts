import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const tournaments = await base44.asServiceRole.entities.Tournament.list("-start_date", 100);
    return Response.json({ tournaments });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}