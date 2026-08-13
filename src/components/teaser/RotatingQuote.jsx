import { useEffect, useState } from "react";

const QUOTES = [
  "The market rewards patience, not adrenaline.",
  "Risk management is the only edge that lasts.",
  "Capital preserved is capital earned.",
  "Discipline turns probability into profit.",
  "The best traders lose less than they win.",
];

export default function RotatingQuote() {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setI((p) => (p + 1) % QUOTES.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <p
      className="text-xl sm:text-2xl italic transition-opacity duration-500"
      style={{ opacity: fade ? 1 : 0, color: "#fff", fontFamily: "Space Grotesk, sans-serif" }}
    >
      “{QUOTES[i]}”
    </p>
  );
}