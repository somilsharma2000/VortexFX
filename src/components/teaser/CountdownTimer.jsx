import { useEffect, useState } from "react";

const TARGET = new Date("2026-08-23T23:59:59").getTime();

function getRemaining() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    done: false,
  };
}

function Box({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold tabular-nums"
        style={{
          backgroundColor: "rgba(212,175,55,0.06)",
          border: "1px solid rgba(212,175,55,0.35)",
          color: "#D4AF37",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[0.6rem] sm:text-xs uppercase tracking-[0.2em]" style={{ color: "#666666" }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [t, setT] = useState(getRemaining());
  useEffect(() => {
    const iv = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 sm:gap-4">
        <Box value={t.d} label="Days" />
        <span className="text-2xl" style={{ color: "#D4AF37" }}>:</span>
        <Box value={t.h} label="Hours" />
        <span className="text-2xl" style={{ color: "#D4AF37" }}>:</span>
        <Box value={t.m} label="Minutes" />
        <span className="text-2xl" style={{ color: "#D4AF37" }}>:</span>
        <Box value={t.s} label="Seconds" />
      </div>
      <p className="mt-5 text-sm" style={{ color: "#666666" }}>
        {t.done ? "The gates are open." : "Gates open when the clock hits zero."}
      </p>
    </div>
  );
}