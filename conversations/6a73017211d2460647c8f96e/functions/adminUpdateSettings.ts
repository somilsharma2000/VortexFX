/**
 * FORTEX FX — Admin: Update Platform Settings
 * Admin updates reward amounts, entry criteria, and other configurable values.
 */
export default async function(req, res) {
  const { admin_id, settings } = req.body;
  
  // Verify admin
  if (!admin_id) {
    return res.json({ success: false, error: "Admin ID required" });
  }
  
  const admins = await base44.entities.Trader.list({ 
    filter: { id: admin_id, role: "admin" } 
  });
  
  if (!admins || admins.length === 0) {
    return res.json({ success: false, error: "Unauthorized: Admin access required" });
  }

  if (!settings || !Array.isArray(settings)) {
    return res.json({ success: false, error: "Settings array required" });
  }

  const today = new Date().toISOString().split('T')[0];
  let updatedCount = 0;

  for (const setting of settings) {
    const existing = await base44.entities.PlatformSetting.list({
      filter: { key: setting.key }
    });
    
    if (existing && existing.length > 0) {
      await base44.entities.PlatformSetting.update(existing[0].id, {
        value: String(setting.value),
        last_updated: today,
        updated_by: admin_id
      });
      updatedCount++;
    }
  }

  return res.json({
    success: true,
    message: `${updatedCount} setting(s) updated.`,
    updated_count: updatedCount
  });
}
