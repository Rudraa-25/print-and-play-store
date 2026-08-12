import { useEffect, useState } from "react";

export const DUKAAN_LANGUAGES = [
  { word: "SHOP", lang: "English", script: "Latin" },
  { word: "दुकान", lang: "Hindi / Marathi", script: "Devanagari" },
  { word: "દુકાન", lang: "Gujarati", script: "Gujarati" },
  { word: "கடை", lang: "Tamil", script: "Tamil" },
  { word: "দোকান", lang: "Bengali / Assamese", script: "Bengali" },
  { word: "ಅಂಗಡಿ", lang: "Kannada", script: "Kannada" },
  { word: "దుకాణము", lang: "Telugu", script: "Telugu" },
  { word: "കട", lang: "Malayalam", script: "Malayalam" },
  { word: "ਦੁਕਾਨ", lang: "Punjabi", script: "Gurmukhi" },
  { word: "ଦୋକାନ", lang: "Odia", script: "Odia" },
  { word: "دُکان", lang: "Urdu", script: "Perso-Arabic" },
];

export function CipherHeading() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % DUKAAN_LANGUAGES.length);
    }, 600);

    return () => clearInterval(timer);
  }, [isHovered]);

  const current = DUKAAN_LANGUAGES[index];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer text-center font-mono py-4"
    >
      {/* Multilingual Dukaan Main Heading - Hover Only Cycling */}
      <h1 className="select-none text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight transition-all duration-300">
        <span className="text-hot">[</span>
        <span className="mx-2 inline-block text-foreground transition-all duration-300 transform group-hover:scale-105 group-hover:text-hot">
          {current.word}
        </span>
        <span className="text-hot">]</span>
      </h1>

      {/* Hover Instruction / Language Indicator Badge */}
      <div className="mt-2 flex items-center justify-center gap-2 text-xs tracking-widest text-muted-foreground transition-opacity duration-300">
        <span className={`h-2 w-2 rounded-full ${isHovered ? "bg-hot animate-ping" : "bg-muted-foreground"}`} />
        {isHovered ? (
          <>
            <span className="uppercase text-foreground font-bold">{current.lang}</span>
            <span>({current.script})</span>
          </>
        ) : (
          <span className="text-[10px] tracking-[0.2em]">HOVER TO SEE MULTILINGUAL LANGUAGES ↓</span>
        )}
      </div>
    </div>
  );
}
