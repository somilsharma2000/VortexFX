import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { admin_id, key, value, description, category } = body;
  if (!admin_id || !key) return Response.json({ success: false, error: 'Missing parameters.' });
  try {
    const existing = await base44.asServiceRole.entities.PlatformSetting.filter({ key });
    if (existing && existing.length > 0) {
      const updated = await base44.asServiceRole.entities.PlatformSetting.update(existing[0].id, { value: String(value), description: description || existing[0].description, category: category || existing[0].category, last_updated: new Date().toISOString(), updated_by: admin_id });
      return Response.json({ success: true, setting: updated });
    } else {
      const created = await base44.asServiceRole.entities.PlatformSetting.create({ key, value: String(value), description: description || '', category: category || 'general', last_updated: new Date().toISOString(), updated_by: admin_id });
      return Response.json({ success: true, setting: created });
    }
  } catch (err) { return Response.json({ success: false, error: 'Settings update failed.' }); }
});