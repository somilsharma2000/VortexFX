import { Send, ArrowRight } from "lucide-react";

const WA_URL =
  "https://wa.me/?text=Something%20big%20is%20coming%20for%20traders.%20Join%20the%20waitlist%20before%2010%2C000%20spots%20fill.%20https%3A%2F%2Fdiscord.gg%2Fz2qVgJgCg4";
const X_URL =
  "https://twitter.com/intent/tweet?text=Something%20big%20is%20coming%20for%20traders.%20Join%20the%20waitlist%20before%2010%2C000%20spots%20fill.";

export default function ShareSection() {
  return (
    <div className="text-center">
      <p className="text-sm mb-4" style={{ color: "#666666" }}>Know a trader who'd want in?</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-transform hover:scale-105"
          style={{ backgroundColor: "rgba(37,211,102,0.12)", color: "#25D366", border: "1px solid rgba(37,211,102,0.4)" }}
        >
          <Send className="w-4 h-4" /> Share on WhatsApp
        </a>
        <a
          href={X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-transform hover:scale-105"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)" }}
        >
          Share on X <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}