import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  
  try {
    const body = await req.json();
    const { email } = body;
    
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ success: false, error: 'Valid email required' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const cleanEmail = email.toLowerCase().trim();
    
    // Check for duplicates
    const existing = await base44.entities.WaitlistEntry.list({ email: cleanEmail });
    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'already_registered', 
        message: "You're already on the waitlist!" 
      }), { headers: { 'Content-Type': 'application/json' }});
    }
    
    // Count existing entries for position
    const allEntries = await base44.entities.WaitlistEntry.list();
    const position = (allEntries?.length || 0) + 1;
    
    // Create new entry
    await base44.entities.WaitlistEntry.create({
      email: cleanEmail,
      position: position,
      signup_date: new Date().toISOString().split('T')[0],
      discord_joined: false,
      telegram_joined: false
    });
    
    return new Response(JSON.stringify({ 
      success: true, 
      position: position, 
      message: "You're on the list. Gates open August 23." 
    }), { headers: { 'Content-Type': 'application/json' }});
    
  } catch (err: any) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: err?.message || 'Server error' 
    }), { headers: { 'Content-Type': 'application/json' }});
  }
});