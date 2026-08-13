import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

export default function ComingSoonPage({ pageName }) {
  return (
    <div className="max-w-3xl mx-auto px-5 py-24 text-center">
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
        style={{ border: "1px solid rgba(212,175,55,0.4)", backgroundColor: "rgba(212,175,55,0.08)" }}
      >
        <Lock size={28} style={{ color: "#D4AF37" }} />
      </div>
      <p className="text-xs tracking-[0.3em] mb-3" style={{ color: "#D4AF37" }}>COMING SOON</p>
      <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif" }}>{pageName}</h1>
      <p className="max-w-md mx-auto mb-8" style={{ color: "#A0A0A0" }}>
        This section unlocks as the FORTREX arena expands. The gates are opening — stay close.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:-translate-y-0.5"
        style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37" }}
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>
    </div>
  );
}