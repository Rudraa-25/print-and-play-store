/** Static brand wordmark — no script cycling. */
export function LogoWithTranslations({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="font-display text-xl font-bold lowercase tracking-tight">
        <span className="text-hot">[</span>spool<span className="text-hot">]</span>
      </span>
    </span>
  );
}

/** Big hero wordmark. */
export function HeroWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      SPOOL<span className="text-hot">*</span>
    </span>
  );
}
