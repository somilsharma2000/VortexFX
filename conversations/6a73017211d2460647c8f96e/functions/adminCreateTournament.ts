/**
 * FORTEX FX — Admin: Create Tournament
 * Admin creates a new tournament with configurable parameters.
 */
export default async function(req, res) {
  const { admin_id, name, description, start_date, end_date, reveal_date, 
          prize_pool_rex, entry_criteria_min_deposit, markets } = req.body;
  
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

  if (!name || !start_date || !end_date) {
    return res.json({ success: false, error: "Name, start date, and end date required" });
  }

  // Get default min deposit from settings if not provided
  let minDeposit = entry_criteria_min_deposit || 200;
  if (!entry_criteria_min_deposit) {
    const settings = await base44.entities.PlatformSetting.list({
      filter: { key: "tournament_min_deposit" }
    });
    if (settings && settings.length > 0) {
      minDeposit = parseFloat(settings[0].value);
    }
  }

  const tournament = await base44.entities.Tournament.create({
    name: name,
    description: description || "",
    start_date: start_date,
    end_date: end_date,
    reveal_date: reveal_date || end_date,
    prize_pool_rex: prize_pool_rex || 0,
    entry_criteria_min_deposit: minDeposit,
    markets: markets || "forex",
    status: "upcoming",
    is_active: false,
    participant_count: 0,
    created_by: admin_id,
    admin_notes: ""
  });

  return res.json({
    success: true,
    tournament_id: tournament.id,
    message: `Tournament '${name}' created. Status: Upcoming.`
  });
}
