import { useEffect, useRef, useState } from "react";

const WORDS = [
  "SHOP",        // English
  "दुकान",       // Hindi
  "ದುಕಾನ",       // Kannada
  "கடை",         // Tamil
  "দোকান",       // Bengali
  "દુકાન",       // Gujarati
  "ਦੁਕਾਨ",       // Punjabi
  "دُکان",       // Urdu
  "ദുകാൻ",       // Malayalam
  "दुकान",       // Marathi
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#*<>[]{}/\\@%$&+=?!";

function scramble(target: string, progress: number) {
  const chars = Array.from(target);
  return chars
    .map((c, i) => {
      if (i < progress) return c;
      if (c === " ") return " ";
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export function CipherHeading() {
  const [display, setDisplay] = useState(WORDS[0]);
  const [hovered, setHovered] = useState(false);
  const idxRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateTo = (target: string, onDone?: () => void) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let progress = 0;
    const total = Array.from(target).length;
    let frame = 0;
    const tick = () => {
      frame++;
      if (frame % 2 === 0) progress = Math.min(progress + 1, total);
      setDisplay(scramble(target, progress));
      if (progress < total) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
        onDone?.();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!hovered) return;
    const cycle = () => {
      idxRef.current = (idxRef.current + 1) % WORDS.length;
      animateTo(WORDS[idxRef.current], () => {
        timerRef.current = setTimeout(cycle, 900);
      });
    };
    cycle();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hovered]);

  const handleLeave = () => {
    setHovered(false);
    idxRef.current = 0;
    animateTo(WORDS[0]);
  };

  return (
    <h1
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      className="cursor-pointer select-none font-mono font-bold text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight inline-block"
    >
      <span className="text-hot">{"["}</span>
      <span className="mx-2 inline-block min-w-[3ch] text-center align-baseline">{display}</span>
      <span className="text-hot">{"]"}</span>
    </h1>
  );
}
