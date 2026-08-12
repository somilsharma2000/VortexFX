export default async function joinWaitlist(req: any) {
  const { email } = req.body || req;

  if (!email || !email.includes('@')) {
    return { success: false, error: 'Valid email required' };
  }

  const cleanEmail = email.toLowerCase().trim();

  // Check for duplicates
  const existing = await base44.entities.WaitlistEntry.list({ email: cleanEmail });
  if (existing && existing.length > 0) {
    return { success: false, error: 'already_registered', message: "You're already on the waitlist!" };
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

  return { success: true, position: position, message: "You're on the list. Gates open August 23." };
}