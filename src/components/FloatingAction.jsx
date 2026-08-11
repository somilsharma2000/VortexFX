import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function FloatingAction() {
  return (
    <Link
      to="/check-in"
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Daily check-in"
    >
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 animate-float-pulse"
        style={{ backgroundImage: "linear-gradient(135deg, #D4AF37, #00C853)", boxShadow: "0 0 24px rgba(212,175,55,0.4)" }}
      >
        <Sparkles className="w-6 h-6 text-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#0A0E27]" style={{ backgroundColor: "#00C853" }} />
      </div>
    </Link>
  );
}