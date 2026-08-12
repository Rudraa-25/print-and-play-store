import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("spool-theme") as Theme | null) ?? "dark";
    setTheme(stored);
    apply(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    localStorage.setItem("spool-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "cream light" : "dark"} theme`}
      className="inline-flex h-9 items-center justify-center border border-border bg-card px-3 font-mono text-[11px] font-bold tracking-[0.18em] text-foreground transition hover:border-hot hover:text-hot"
    >
      {theme === "dark" ? "☀ LIGHT" : "🌙 DARK"}
    </button>
  );
}
