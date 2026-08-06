import React, { useState } from 'react';

export default function FortrexHero() {
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);
  const slotsFilled = 718;
  const totalSlots = 1000;
  const fillPercent = (slotsFilled / totalSlots) * 100;

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden font-sans">

      {/* 1. BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-150 origin-top-left opacity-25 filter grayscale contrast-125"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-in-motion-31780-large.mp4" type="video/mp4" />
        </video>

        {/* Dark Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>

        {/* Cyan Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00F2FE]/8 blur-[140px] rounded-full pointer-events-none"></div>
      </div>

      {/* 2. NAVBAR */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-16 py-6 bg-transparent">
        {/* Logo + Pre-Launch Badge */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black tracking-widest text-white font-mono uppercase">
            FORTREX
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/20 text-[10px] font-mono font-semibold tracking-wider text-[#00F2FE] uppercase">
            Pre-Launch
          </span>
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#arenas" className="hover:text-[#00F2FE] transition-colors duration-200">Live Arenas</a>
          <a href="#rebates" className="hover:text-[#00F2FE] transition-colors duration-200">Volume Rebates</a>
          <a href="#how" className="hover:text-[#00F2FE] transition-colors duration-200">How It Works</a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-6">
          <a href="#signin" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Sign in
          </a>
          <a
            href="#get-started"
            className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold tracking-tight hover:bg-[#00F2FE] transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* 3. HERO CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 pt-28 pb-8 max-w-5xl mx-auto">

        {/* Glassmorphic Pill Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" style={{ boxShadow: '0 0 10px #00F2FE' }}></span>
          <span className="text-[11px] font-mono tracking-[0.15em] text-[#00F2FE] uppercase font-medium">
            Founder Passes Active • Limited Access
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tight uppercase text-white leading-[0.95] mb-8">
          Your Edge.<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00F2FE] via-[#00B4FF] to-[#3B82F6]">
            Your Arena.
          </span>
          <br />
          Your Legacy.
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-10">
          Deposit $100. Trade your strategy. Win cash prizes, earn free funded accounts, and get paid a $3/lot rebate on every order. Welcome to the Citadel.
        </p>

        {/* Primary CTA */}
        <div className="mb-12">
          <a
            href="#citadel"
            className="inline-block px-10 py-4 rounded-full bg-white text-black font-extrabold text-base tracking-wide hover:bg-[#00F2FE] transition-all duration-300 shadow-xl shadow-[#00F2FE]/10 transform hover:scale-105"
          >
            Enter FORTREX Citadel
          </a>
        </div>

        {/* 4. WAITLIST & SCARCITY ENGINE */}
        <div className="w-full max-w-md">
          {!claimed ? (
            <div className="flex items-center gap-2 p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-white text-sm font-medium placeholder:text-slate-500 outline-none px-4 py-1"
              />
              <button
                onClick={() => email && setClaimed(true)}
                className="px-5 py-2.5 rounded-full bg-[#00F2FE] text-black text-xs font-bold tracking-wide uppercase hover:bg-[#00B4FF] transition-all duration-300 whitespace-nowrap"
              >
                Claim Access
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/20 backdrop-blur-md">
              <span className="text-sm font-mono text-[#00F2FE] tracking-wide">✓ You're on the list. Check your inbox.</span>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">Founder Slots Filled</span>
              <span className="text-[10px] font-mono tracking-wider text-[#00F2FE] font-semibold">{slotsFilled} / {totalSlots.toLocaleString()}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00F2FE] to-[#3B82F6] transition-all duration-1000"
                style={{ width: `${fillPercent}%`, boxShadow: '0 0 12px #00F2FE40' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FOOTER TRUST STRIP */}
      <div className="relative z-10 w-full border-t border-white/5 bg-black/40 backdrop-blur-md py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-around items-center gap-4 text-[11px] font-mono text-slate-400 tracking-wider uppercase">
          <div className="flex items-center gap-1.5"><span className="text-[#00F2FE]">✓</span> Verified Traders Only</div>
          <div className="flex items-center gap-1.5"><span className="text-[#00F2FE]">✓</span> $3/Lot Automated Rebate</div>
          <div className="flex items-center gap-1.5"><span className="text-[#00F2FE]">✓</span> Free Funded Accounts</div>
        </div>
      </div>

    </section>
  );
}
