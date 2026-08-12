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
      }, 450);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="text-center transition-opacity duration-500 px-4" style={{ opacity: show ? 1 : 0, minHeight: "150px" }}>
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide max-w-3xl mx-auto leading-snug">
        “{QUOTES[i]}”
      </p>
      <p className="mt-5 text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase" style={{ color: "#666666" }}>
        — Trader's Truth
      </p>
    </div>
  );
}