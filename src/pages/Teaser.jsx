import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import TeaserBackground from "@/components/teaser/TeaserBackground";
import RotatingQuote from "@/components/teaser/RotatingQuote";
import RegistrationGate from "@/components/teaser/RegistrationGate";
import EmailCapture from "@/components/teaser/EmailCapture";
import DiscordCTA from "@/components/teaser/DiscordCTA";
import ShareSection from "@/components/teaser/ShareSection";

export default function Teaser() {
  const [stats, setStats] = useState({ totalTraders: 0, remaining: 10000, progressPercent: 0, target: 10000 });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await base44.functions.invoke("getWaitlistCount", {});
      setStats(res.data || { totalTraders: 0, remaining: 10000, progressPercent: 0, target: 10000 });
    } catch {
      // keep defaults
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="relative">
      <TeaserBackground />
      <section className="relative max-w-4xl mx-auto px-5 pt-20 pb-8 text-center">
        <p className="text-xs tracking-[0.3em] mb-5" style={{ color: "#D4AF37" }}>SEALED · LAUNCHING AUGUST 23</p>
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-5" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          THE GATES OPEN AT <span style={{ color: "#D4AF37" }}>10,000</span>
        </h1>
        <p className="max-w-xl mx-auto text-base sm:text-lg mb-8" style={{ color: "#A0A0A0" }}>
          A skill-based trading competition community. Verified accounts. Sealed standings. Variable prize pools funded by platform revenue.
        </p>
        <RotatingQuote />
      </section>
      <RegistrationGate stats={stats} loading={loading} />
      <EmailCapture onJoined={loadStats} />
      <DiscordCTA />
      <ShareSection />
    </div>
  );
}