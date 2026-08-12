import { useEffect, useState } from "react";

const QUOTES = [
  "The market rewards patience. The impatient pay the market.",
  "90% of traders fail. The other 10% know something you don't.",
  "Your strategy didn't fail. Your discipline did.",
  "The best traders don't predict. They react.",
  "Risk management is not a skill. It's the only skill.",
  "Profit is what happens between mistakes.",
  "The chart doesn't care about your feelings.",
  "Discipline is doing what you hate, when you need to.",
  "You don't trade the market. You trade your beliefs about the market.",
  "The throne isn't given. It's taken.",
];

export default function RotatingQuote() {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % QUOTES.length);
        setShow(true);
      }, 500);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section style={{ marginBottom: 60, textAlign: "center" }}>
      <div style={{ minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p
          className="text-[22px] md:text-[28px] font-bold text-white mx-auto"
          style={{ maxWidth: 600, letterSpacing: "0.5px", lineHeight: 1.4, transition: "opacity 0.5s ease", opacity: show ? 1 : 0 }}
        >
          {QUOTES[i]}
        </p>
      </div>
      <p className="mt-4 text-xs" style={{ color: "#666666", textTransform: "uppercase", letterSpacing: "3px" }}>
        — Trader's Truth
      </p>
    </section>
  );
}