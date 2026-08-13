import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  let body = {};
  try { body = await req.json(); } catch (e) {}

  const { full_name, email, phone } = body;
  
  if (!full_name || full_name.trim().length < 2) return Response.json({ success: false, error: 'Please enter your full name.' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ success: false, error: 'Please enter a valid email address.' });
  if (!phone || phone.replace(/[^0-9]/g, '').length < 8) return Response.json({ success: false, error: 'Please enter a valid phone number.' });
  
  const cleanEmail = email.toLowerCase().trim();
  
  // Check for duplicate using .filter() method
  let isDuplicate = false;
  try {
    const existing = await base44.asServiceRole.entities.WaitlistEntry.filter({ email: cleanEmail });
    if (existing && existing.length > 0) isDuplicate = true;
  } catch (e) {}
  
  if (isDuplicate) return Response.json({ success: false, error: 'This email is already registered for a Genesis spot.' });
  
  // Count existing entries for position
  let position = 1;
  try {
    const all = await base44.asServiceRole.entities.WaitlistEntry.list();
    if (all && all.length) position = all.length + 1;
  } catch (e) {}
  
  let savedEntry = null;
  try {
    savedEntry = await base44.asServiceRole.entities.WaitlistEntry.create({
      email: cleanEmail, phone, status: 'pending_verification',
      signup_date: new Date().toISOString(), source: 'website_manual_reg', position
    });
  } catch (e) {}
  
  const webhookUrl = Deno.env.get('DISCORD_VERIFICATION_WEBHOOK');
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [{ title: '🔔 New Genesis Registration', color: 0xE5C158, fields: [
          { name: 'Full Name', value: full_name, inline: true },
          { name: 'Email', value: email, inline: true },
          { name: 'Phone', value: phone, inline: false },
          { name: 'Position', value: '#' + position, inline: true },
          { name: 'Status', value: '⏳ Pending Verification', inline: true },
          { name: 'Registered At', value: new Date().toISOString(), inline: false }
        ], footer: { text: 'FORTREX — Master the Charts. Reclaim Your Throne.' }, timestamp: new Date().toISOString() }] })
      });
    } catch (e) {}
  }
  
  return Response.json({ success: true, message: 'Registration received!', position, entry_id: savedEntry?.id || null });
});