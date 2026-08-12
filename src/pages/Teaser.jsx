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
      <main className="flex-1 w-full mx-auto px-5" style={{ maxWidth: 800, paddingTop: 96 }}>
        <RotatingQuote />
        <RegistrationGate />
        <EmailCapture />
        <FoundingSection />
        <DiscordCTA />
        <ShareSection />
        <TeaserFooter />
      </main>
    </div>
  );
}