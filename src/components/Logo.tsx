import React from "react";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "vertical" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  theme?: "dark" | "light";
}

export default function Logo({
  className = "",
  variant = "horizontal",
  size = "md",
  theme = "dark"
}: LogoProps) {
  // Dimensions based on size
  const sizes = {
    sm: { icon: "w-6 h-6", text: "text-sm", desc: "text-[9px]" },
    md: { icon: "w-8 h-8", text: "text-base", desc: "text-[10px]" },
    lg: { icon: "w-12 h-12", text: "text-xl", desc: "text-xs" },
    xl: { icon: "w-20 h-20", text: "text-3xl", desc: "text-sm" }
  };

  const activeSize = sizes[size];
  const isLight = theme === "light";

  const renderIcon = () => (
    <div className={`relative ${activeSize.icon} shrink-0`} id="logo-icon-svg-wrapper">
      {/* Liquid Glass Background Reflection Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-sky-500/10 to-emerald-500/20 rounded-full blur-[2px] border border-white/10 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]"></div>
      
      {/* Vector SVG Emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_2px_8px_rgba(99,102,241,0.4)]"
      >
        <defs>
          <linearGradient id="dnaGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="dnaGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <radialGradient id="glassGloss" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>

        {/* Circular Outer Emblem */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#dnaGrad1)"
          strokeWidth="2.5"
          strokeDasharray="4 2"
          className="animate-spin-slow origin-center"
          style={{ transformOrigin: "center", animationDuration: "30s" }}
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />

        {/* Upward Growth Arrow Path / Helix Nodes */}
        {/* Left Strand of Helix curving upward into arrow */}
        <path
          d="M 28,75 C 33,65 38,60 50,60 C 62,60 67,50 72,40 L 78,25 L 60,30 M 78,25 L 75,43"
          stroke="url(#dnaGrad1)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Strand of Helix weaving and climbing */}
        <path
          d="M 72,75 C 67,65 62,60 50,60 C 38,60 33,50 28,40 C 25,34 24,28 26,22"
          stroke="url(#dnaGrad2)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Weaving Ladders (Inter-strand connectors) representing career steps */}
        <line x1="33" y1="67" x2="67" y2="67" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="1 2" />
        <line x1="50" y1="60" x2="50" y2="60" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <line x1="33" y1="45" x2="67" y2="45" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="1 2" />
        <line x1="42" y1="33" x2="68" y2="33" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />

        {/* Glowing Base/Nucleus Nodes */}
        <circle cx="28" cy="75" r="5" fill="#6366f1" />
        <circle cx="72" cy="75" r="5" fill="#a855f7" />
        <circle cx="28" cy="40" r="4.5" fill="#38bdf8" />
        <circle cx="72" cy="40" r="4.5" fill="#34d399" />
        <circle cx="78" cy="25" r="5.5" fill="#34d399" className="animate-pulse" />

        {/* Gloss overlay */}
        <circle cx="50" cy="50" r="44" fill="url(#glassGloss)" opacity="0.35" pointerEvents="none" />
      </svg>
    </div>
  );

  if (variant === "icon") {
    return renderIcon();
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`} id="brand-logo-vertical">
        {renderIcon()}
        <div className="space-y-1">
          <h1 className={`font-black tracking-tight ${activeSize.text} ${isLight ? "text-slate-900" : "bg-gradient-to-r from-white via-slate-100 to-indigo-100 bg-clip-text text-transparent"}`}>
            Career DNA <span className="text-indigo-500 font-extrabold">Web</span>
          </h1>
          <p className={`font-bold uppercase tracking-widest ${activeSize.desc} ${isLight ? "text-slate-500" : "text-indigo-400"}`}>
            LIFETIME CAREER OS
          </p>
        </div>
      </div>
    );
  }

  // Default: Horizontal logo
  return (
    <div className={`flex items-center gap-3 ${className}`} id="brand-logo-horizontal">
      {renderIcon()}
      <div className="flex flex-col text-left">
        <span className={`font-black tracking-tight leading-tight ${activeSize.text} ${isLight ? "text-slate-900" : "bg-gradient-to-r from-white via-slate-100 to-indigo-100 bg-clip-text text-transparent"}`}>
          Career DNA <span className="text-indigo-500 font-black">Web</span>
        </span>
        <span className={`font-bold uppercase tracking-widest ${activeSize.desc} leading-none mt-1 ${isLight ? "text-slate-400" : "text-indigo-400/90"}`}>
          LIFETIME CAREER OPERATING SYSTEM
        </span>
      </div>
    </div>
  );
}
