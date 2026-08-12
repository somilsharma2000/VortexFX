import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}
  
  const { email, full_name, phone, referred_by } = body;
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ success: false, error: 'Valid email required.' });
  }
  
  const cleanEmail = email.toLowerCase().trim();
  
  // Check for duplicates using .filter() — NOT list({ email })
  let isDuplicate = false;
  try {
    const existing = await base44.asServiceRole.entities.WaitlistEntry.filter({ email: cleanEmail });
    if (existing && existing.length > 0) isDuplicate = true;
  } catch (e) {}
  
  if (isDuplicate) {
    return Response.json({ 
      success: false, 
      error: 'already_registered', 
      message: "You're already on the waitlist!" 
    });
  }
  
  // Count existing entries for position
  let position = 1;
  try {
    const all = await base44.asServiceRole.entities.WaitlistEntry.list();
    if (all && all.length) position = all.length + 1;
  } catch (e) {}
  
  // Create new entry
  let savedEntry = null;
  try {
    savedEntry = await base44.asServiceRole.entities.WaitlistEntry.create({
      email: cleanEmail,
      phone: phone || '',
      position,
      signup_date: new Date().toISOString(),
      discord_joined: false,
      telegram_joined: false,
      status: 'pending_verification',
      source: 'waitlist_join',
      referred_by: referred_by || ''
    });
  } catch (e) {}
  
  return Response.json({ 
    success: true, 
    position, 
    entry_id: savedEntry?.id || null,
    message: "You're on the list. Gates open soon." 
  });
});
