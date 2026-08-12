import TeaserBackground from "@/components/teaser/TeaserBackground";
import TeaserNav from "@/components/teaser/TeaserNav";
import RotatingQuote from "@/components/teaser/RotatingQuote";
import RegistrationGate from "@/components/teaser/RegistrationGate";
import EmailCapture from "@/components/teaser/EmailCapture";
import FoundingSection from "@/components/teaser/FoundingSection";
import DiscordCTA from "@/components/teaser/DiscordCTA";
import ShareSection from "@/components/teaser/ShareSection";
import TeaserFooter from "@/components/teaser/TeaserFooter";

export default function Teaser() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <TeaserBackground />
      <TeaserNav />
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 pt-28 pb-10 gap-14">
        <div className="text-center">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.2em]"
            style={{ color: "#D4AF37" }}
          >
            FORTREX
          </h1>
          <div className="mx-auto mt-4 h-px" style={{ width: "200px", backgroundColor: "#D4AF37" }} />
        </div>

        <RotatingQuote />
        <RegistrationGate />
        <EmailCapture />
        <FoundingSection />
        <DiscordCTA />
        <ShareSection />
      </main>
      <TeaserFooter />
    </div>
  );
}