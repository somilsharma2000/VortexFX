import { useCallback, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import TeaserBackground from "@/components/teaser/TeaserBackground";
import TeaserNav from "@/components/teaser/TeaserNav";
import CountdownTimer from "@/components/teaser/CountdownTimer";
import RegistrationProgress from "@/components/teaser/RegistrationProgress";
import EmailCapture from "@/components/teaser/EmailCapture";
import CrypticCards from "@/components/teaser/CrypticCards";
import ShareSection from "@/components/teaser/ShareSection";
import TeaserFooter from "@/components/teaser/TeaserFooter";

const DISCORD_URL = "https://discord.gg/z2qVgJgCg4";

export default function Teaser() {
  const [count, setCount] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("teaserEntry", { action: "stats" });
      if (res.data && typeof res.data.count === "number") setCount(res.data.count);
    } catch {
      /* keep last known count */
    }
  }, []);

  useEffect(() => {
    refresh();
    const iv = setInterval(refresh, 30000);
    return () => clearInterval(iv);
  }, [refresh]);

  return (
    <div className="relative min-h-screen flex flex-col" style={{ backgroundColor: "#000000" }}>
      <TeaserBackground />
      <TeaserNav />
      <main className="flex-1 flex flex-col items-center justify-center px-5 py-24 text-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-[0.2em] mb-4" style={{ color: "#D4AF37" }}>
          FORTREX
        </h1>
        <div className="h-px w-[200px] mx-auto mb-10" style={{ backgroundColor: "#D4AF37" }} />

        <h2 className="text-2xl sm:text-4xl font-bold tracking-[0.15em] mb-3" style={{ color: "#ffffff" }}>
          SOMETHING BIG IS COMING.
        </h2>
        <p className="text-base sm:text-lg mb-12 max-w-md" style={{ color: "#666666" }}>
          The competitive arena for traders. Nothing else like it exists.
        </p>

        <div className="mb-12"><CountdownTimer /></div>
        <div className="mb-12 w-full"><RegistrationProgress count={count} /></div>
        <div className="mb-10 w-full"><EmailCapture onJoined={refresh} /></div>

        <div className="w-full max-w-md mx-auto mb-8">
          <div className="h-px w-full mb-6" style={{ backgroundColor: "rgba(212,175,55,0.15)" }} />
          <p className="text-sm mb-3" style={{ color: "#666666" }}>Want early access? Join the inner circle.</p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition-transform hover:scale-105"
            style={{ backgroundColor: "#5865F2", color: "#ffffff" }}
          >
            JOIN THE COMMUNITY
          </a>
          <p className="mt-4 text-xs" style={{ color: "#666666" }}>Be part of the first 10,000.</p>
        </div>

        <div className="mb-12"><CrypticCards /></div>
        <div className="mb-6"><ShareSection /></div>
      </main>
      <TeaserFooter />
    </div>
  );
}