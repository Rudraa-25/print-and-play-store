import { useEffect, useRef, useState } from "react";

/**
 * Accessible brand wordmark that cycles "spool" through Indian scripts on
 * hover / keyboard focus. Falls back to a pure-CSS transliteration tooltip
 * when JS animation is disabled (prefers-reduced-motion or no hydration).
 */
export const SPOOL_SCRIPTS = [
  { lang: "en", label: "English", text: "spool", translit: "spool" },
  { lang: "gu", label: "Gujarati", text: "સ્પૂલ", translit: "spūl" },
  { lang: "mr", label: "Marathi", text: "स्पूल", translit: "spūl" },
  { lang: "hi", label: "Hindi", text: "स्पूल", translit: "spūl" },
  { lang: "ta", label: "Tamil", text: "ஸ்பூல்", translit: "spūl" },
  { lang: "bn", label: "Bengali", text: "স্পুল", translit: "spul" },
  { lang: "kn", label: "Kannada", text: "ಸ್ಪೂಲ್", translit: "spūl" },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function LogoWithTranslations({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (!active || reduced) {
      setIndex(0);
      return;
    }
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % SPOOL_SCRIPTS.length);
    }, 900);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [active, reduced]);

  const current = SPOOL_SCRIPTS[index] ?? SPOOL_SCRIPTS[0]!;

  return (
    <span
      className={`group/logo relative inline-flex items-baseline ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* Announced once, never re-read as the visual script cycles */}
      <span className="sr-only">spool</span>
      <span
        aria-hidden="true"
        key={current.lang}
        lang={current.lang}
        className="spool-script font-display text-xl font-bold lowercase tracking-tight"
      >
        {current.text}
        <span className="text-hot">*</span>
      </span>

      {/* CSS-only fallback: transliteration tooltip on hover/focus */}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-50 mt-2 hidden whitespace-nowrap border border-border bg-card px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-muted-foreground shadow-lg group-hover/logo:block group-focus-within/logo:block"
      >
        {current.label.toUpperCase()} · {current.translit}
      </span>
    </span>
  );
}
