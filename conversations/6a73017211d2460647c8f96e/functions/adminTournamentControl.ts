/**
 * FORTEX FX — Admin: Enter ROI Data & Reveal Results
 * Admin manually enters trader ROI data and optionally reveals results.
 * This is the sealed results system — no live rankings, admin controls everything.
 */
export default async function(req, res) {
  const { admin_id, tournament_id, action, participants_data } = req.body;
  
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

  if (!tournament_id) {
    return res.json({ success: false, error: "Tournament ID required" });
  }

  const tournaments = await base44.entities.Tournament.list({
    filter: { id: tournament_id }
  });
  
  if (!tournaments || tournaments.length === 0) {
    return res.json({ success: false, error: "Tournament not found" });
  }

  const tournament = tournaments[0];

  // ACTION: Enter ROI data (sealed — not visible to traders yet)
  if (action === "enter_roi" && participants_data) {
    let updatedCount = 0;
    
    for (const p of participants_data) {
      const participants = await base44.entities.Participant.list({
        filter: { tournament_id: tournament_id, trader_id: p.trader_id }
      });
      
      if (participants && participants.length > 0) {
        const roi = p.starting_balance > 0 
          ? ((p.final_equity - p.starting_balance) / p.starting_balance) * 100 
          : 0;
        
        await base44.entities.Participant.update(participants[0].id, {
          starting_balance: p.starting_balance,
          final_equity: p.final_equity,
          roi: roi,
          status: "completed"
        });
        updatedCount++;
      }
    }

    return res.json({
      success: true,
      message: `${updatedCount} participant(s) ROI data updated. Results remain sealed.`,
      tournament_status: tournament.status
    });
  }

  // ACTION: Reveal results (calculate rankings, assign prizes)
  if (action === "reveal") {
    // Get all completed participants sorted by ROI (highest first)
    const participants = await base44.entities.Participant.list({
      filter: { tournament_id: tournament_id, status: "completed" }
    });
    
    // Sort by ROI descending
    participants.sort((a, b) => (b.roi || 0) - (a.roi || 0));
    
    // Assign ranks
    const prizeDistribution = [
      { rank: 1, percentage: 40 },  // 1st: 40% of prize pool
      { rank: 2, percentage: 25 },  // 2nd: 25%
      { rank: 3, percentage: 15 },  // 3rd: 15%
      { rank: 4, percentage: 10 },  // 4th: 10%
      { rank: 5, percentage: 5 },   // 5th: 5%
      // Remaining 5% split among ranks 6-10
    ];
    
    const remainingPrize = tournament.prize_pool_rex * 0.05;
    const top10plusCount = Math.max(0, participants.length - 5);
    const perTraderBonus = top10plusCount > 0 ? remainingPrize / Math.min(top10plusCount, 5) : 0;

    for (let i = 0; i < participants.length; i++) {
      const rank = i + 1;
      let prizeWon = 0;
      
      if (rank <= 5) {
        prizeWon = (tournament.prize_pool_rex * prizeDistribution[rank - 1].percentage) / 100;
      } else if (rank <= 10) {
        prizeWon = perTraderBonus;
      }
      
      await base44.entities.Participant.update(participants[i].id, {
        rank: rank,
        prize_won_rex: prizeWon,
        revealed: true
      });
      
      // If prize won, create transaction and update trader balance
      if (prizeWon > 0) {
        await base44.entities.Transaction.create({
          trader_id: participants[i].trader_id,
          type: "tournament_prize",
          amount: prizeWon,
          description: `${tournament.name} — Rank #${rank} prize`,
          transaction_date: new Date().toISOString().split('T')[0],
          reference_id: `tournament_${tournament_id}_rank_${rank}`
        });
        
        // Update trader REX balance
        const traderRecords = await base44.entities.Trader.list({
          filter: { id: participants[i].trader_id }
        });
        
        if (traderRecords && traderRecords.length > 0) {
          const trader = traderRecords[0];
          await base44.entities.Trader.update(trader.id, {
            rex_balance: (trader.rex_balance || 0) + prizeWon
          });
        }
      }
    }

    // Update tournament status to revealed
    await base44.entities.Tournament.update(tournament_id, {
      status: "revealing"
    });

    return res.json({
      success: true,
      message: `Results revealed! ${participants.length} participants ranked. Prizes distributed.`,
      total_prizes_distributed: tournament.prize_pool_rex,
      participants_ranked: participants.length
    });
  }

  // ACTION: Complete tournament (after reveal is done)
  if (action === "complete") {
    await base44.entities.Tournament.update(tournament_id, {
      status: "completed",
      is_active: false
    });
    
    return res.json({
      success: true,
      message: `Tournament '${tournament.name}' marked as completed.`
    });
  }

  // ACTION: Activate tournament (start it)
  if (action === "activate") {
    await base44.entities.Tournament.update(tournament_id, {
      status: "live",
      is_active: true
    });
    
    return res.json({
      success: true,
      message: `Tournament '${tournament.name}' is now LIVE.`
    });
  }

  // ACTION: Cancel tournament
  if (action === "cancel") {
    await base44.entities.Tournament.update(tournament_id, {
      status: "cancelled",
      is_active: false
    });
    
    return res.json({
      success: true,
      message: `Tournament '${tournament.name}' cancelled.`
    });
  }

  return res.json({ success: false, error: "Unknown action. Use: enter_roi, reveal, complete, activate, cancel" });
}
