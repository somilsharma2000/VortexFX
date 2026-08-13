import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const all = await base44.asServiceRole.entities.WaitlistEntry.list("-signup_date", 10000);
    const totalTraders = all.length;
    const target = 10000;
    const remaining = Math.max(0, target - totalTraders);
    const progressPercent = Math.min(100, Math.round((totalTraders / target) * 1000) / 10);
    return Response.json({ totalTraders, remaining, progressPercent, target });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}