import { useState } from "react";

/** Sleek Precision 3D Filament Spool Vector Logo Mark */
export function SpoolIconMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-500 ease-out group-hover:rotate-90 ${className}`}
      aria-hidden="true"
    >
      {/* Outer Spool Flange Rim */}
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 3" className="opacity-40" />
      <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2" />
      
      {/* Inner Filament Winding Ring */}
      <circle cx="24" cy="24" r="12" stroke="var(--hot)" strokeWidth="3" className="opacity-90" />
      
      {/* 3D Nozzle Core Hub */}
      <polygon points="24,17 30,21 30,27 24,31 18,27 18,21" fill="currentColor" opacity="0.8" />
      <circle cx="24" cy="24" r="3" fill="var(--hot)" className="animate-pulse" />
      
      {/* Feeding Filament Strand */}
      <path
        d="M24 7 C34 7, 41 14, 41 24 C41 29, 44 32, 46 32"
        stroke="var(--hot)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Header Brand logo with Adaptable Light/Dark Theme Support */
export function LogoWithTranslations({ className = "" }: { className?: string }) {
  return (
    <div className={`group inline-flex items-center gap-2.5 select-none font-mono ${className}`}>
      <SpoolIconMark size={30} className="text-foreground" />
      <div className="flex flex-col justify-center leading-none">
        <span className="font-mono text-xl font-black tracking-tight text-foreground group-hover:text-hot transition-colors duration-300">
          spool<span className="text-hot font-bold">*</span>
        </span>
        <span className="text-[9px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
          3D STUDIO
        </span>
      </div>
    </div>
  );
}

/** Hero section logo mark */
export function HeroWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-4 ${className}`}>
      <SpoolIconMark size={64} className="text-hot" />
      <span className="font-mono font-extrabold tracking-tighter text-foreground">
        spool<span className="text-hot animate-pulse">*</span>
      </span>
    </span>
  );
}
