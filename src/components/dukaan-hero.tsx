import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { SpoolIconMark } from "@/components/logo-with-translations";

const DUKAAN_TRANSLATIONS = [
  { script: "Hindi / Marathi", word: "दुकान", label: "DUKAAN" },
  { script: "Gujarati", word: "દુકાન", label: "DUKAAN" },
  { script: "Tamil", word: "கடை", label: "KADAI" },
  { script: "Bengali", word: "দোকান", label: "DOKAN" },
  { script: "Kannada", word: "ಅಂಗಡಿ", label: "ANGADI" },
  { script: "English", word: "SHOP", label: "SHOP" },
];

export function DukaanHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % DUKAAN_TRANSLATIONS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const current = DUKAAN_TRANSLATIONS[index];

  return (
    <section className="relative overflow-hidden border-b border-border bg-pluses py-16 md:py-24 transition-colors duration-300">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--hot) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Top Edition Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
          <span className="inline-flex items-center gap-2 border border-border bg-card/90 px-3 py-1 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-hot animate-ping" />
            EDITION 01 — AHMEDABAD, GUJARAT, INDIA
          </span>
          <span className="hidden sm:inline">0.2MM LAYER HEIGHT · SMALL BATCH 3D PRINTING</span>
        </div>

        {/* Clean Hero Layout (Replacing oversized giant wordmark) */}
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3">
              <SpoolIconMark size={32} className="text-hot" />
              <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                SPOOL STUDIO &amp; FABRICATION
              </span>
            </div>

            <h1 className="mt-4 font-mono text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              3D PRINTED GOODS &amp;{" "}
              <span className="relative inline-block border-b-2 border-hot text-hot transition-all duration-300">
                {current.word}
              </span>
            </h1>

            <div className="mt-3 flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground">
              <span>MULTILINGUAL DUKAAN:</span>
              <span className="rounded border border-border bg-card px-2 py-0.5 font-bold text-foreground">
                {current.label} ({current.script})
              </span>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Precision 3D-printed mobile accessories, desk goods, planters, and custom CAD on-demand printing. Designed &amp; printed to order in Ahmedabad, Gujarat.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs">
              <a
                href="#shop"
                className="inline-flex h-12 items-center justify-center border border-border bg-hot px-6 font-bold tracking-[0.2em] text-primary-foreground shadow-lg transition duration-300 hover:scale-105"
              >
                EXPLORE PRODUCTS ↓
              </a>
              <Link
                to="/downloads"
                className="inline-flex h-12 items-center justify-center border border-border bg-card px-6 font-bold tracking-[0.2em] transition duration-300 hover:border-hot hover:text-hot"
              >
                3D PRINT SPECS &amp; SKILL
              </Link>
            </div>
          </div>

          {/* Right Dukaan Badges Grid */}
          <div className="md:col-span-4 border border-border bg-card p-6 font-mono">
            <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              STOREFRONT TRANSLATIONS
            </p>
            <div className="mt-4 space-y-2 text-sm">
              {DUKAAN_TRANSLATIONS.map((item, i) => (
                <div
                  key={item.script}
                  className={`flex items-center justify-between border-b border-border/60 pb-2 transition ${
                    i === index ? "text-hot font-bold" : "text-muted-foreground"
                  }`}
                >
                  <span>{item.word}</span>
                  <span className="text-[10px] tracking-widest uppercase">{item.script}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-12 border-t border-border bg-ink py-2 text-foreground">
        <div className="flex gap-8 whitespace-nowrap font-mono text-[11px] tracking-[0.3em] animate-[marquee_28s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex gap-8 items-center">
              <span>SPOOL DUKAAN</span><span className="text-hot">◉</span>
              <span>0.2MM PRECISION 3D PRINTING</span><span className="text-hot">◉</span>
              <span>CREAM LIGHT MODE &amp; DARK CANVASES</span><span className="text-hot">◉</span>
              <span>FREE SHIPPING IN INDIA</span><span className="text-hot">◉</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
