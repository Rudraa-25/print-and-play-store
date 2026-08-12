import { useEffect, useRef, useState } from "react";

/**
 * Accessible brand wordmark that cycles the word "dukaan" (shop) through
 * Indian scripts on hover / keyboard focus. Falls back to a pure-CSS
 * transliteration tooltip when animation is disabled.
 */
export const DUKAAN_SCRIPTS = [
  { lang: "en", label: "English", text: "dukaan", translit: "dukaan" },
  { lang: "hi", label: "Hindi", text: "दुकान", translit: "dukān" },
  { lang: "mr", label: "Marathi", text: "दुकान", translit: "dukān" },
  { lang: "gu", label: "Gujarati", text: "દુકાન", translit: "dukān" },
  { lang: "bn", label: "Bengali", text: "দোকান", translit: "dokān" },
  { lang: "ta", label: "Tamil", text: "கடை", translit: "kaḍai" },
  { lang: "kn", label: "Kannada", text: "ದುಕಾನ", translit: "dukāna" },
] as const;

export function usePrefersReducedMotion() {
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
      setIndex((i) => (i + 1) % DUKAAN_SCRIPTS.length);
    }, 900);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [active, reduced]);

  const current = DUKAAN_SCRIPTS[index] ?? DUKAAN_SCRIPTS[0]!;

  return (
    <span
      className={`group/logo relative inline-flex items-baseline ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {/* Announced once, never re-read as the visual script cycles */}
      <span className="sr-only">spool — dukaan</span>
      <span
        aria-hidden="true"
        key={current.lang}
        lang={current.lang}
        className="spool-script font-display text-xl font-bold lowercase tracking-tight"
      >
        <span className="text-hot">[</span>
        {current.text}
        <span className="text-hot">]</span>
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

/** Big hero wordmark: cycles "spool" through the same scripts automatically. */
export const SPOOL_SCRIPTS = [
  { lang: "en", label: "English", text: "SPOOL" },
  { lang: "hi", label: "Hindi", text: "स्पूल" },
  { lang: "mr", label: "Marathi", text: "स्पूल" },
  { lang: "gu", label: "Gujarati", text: "સ્પૂલ" },
  { lang: "bn", label: "Bengali", text: "স্পুল" },
  { lang: "ta", label: "Tamil", text: "ஸ்பூல்" },
  { lang: "kn", label: "Kannada", text: "ಸ್ಪೂಲ್" },
] as const;

export function HeroWordmark({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % SPOOL_SCRIPTS.length), 2200);
    return () => clearInterval(id);
  }, [reduced]);

  const current = SPOOL_SCRIPTS[index] ?? SPOOL_SCRIPTS[0]!;

  return (
    <span className={className}>
      <span className="sr-only">SPOOL</span>
      <span aria-hidden="true" key={current.lang} lang={current.lang} className="spool-script inline-block">
        {current.text}
        <span className="text-hot">*</span>
      </span>
    </span>
  );
}
