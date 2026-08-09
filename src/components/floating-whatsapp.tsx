import { WHATSAPP_NUMBER } from "@/lib/commerce";

export function whatsappProductUrl(productName?: string, slug?: string) {
  const message =
    productName && slug
      ? `Hi, I want to order ${productName} — slug: ${slug}`
      : "Hi, I want to order from spool.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Floating WhatsApp order button. Works on mobile (app) and desktop
 * (WhatsApp Web) via the wa.me deep link.
 */
export function FloatingWhatsApp({
  productName,
  slug,
}: {
  productName?: string;
  slug?: string;
}) {
  const label = productName ? `Order ${productName} on WhatsApp` : "Order on WhatsApp";
  return (
    <a
      href={whatsappProductUrl(productName, slug)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-11 min-w-11 items-center gap-2 border border-border bg-hot px-4 py-3 font-mono text-[11px] font-bold tracking-[0.18em] text-primary-foreground shadow-[var(--shadow-neon)] transition-transform duration-200 hover:scale-105 focus-visible:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.06c-.25.7-1.44 1.34-1.99 1.39-.53.05-1.02.24-3.43-.72-2.89-1.14-4.72-4.1-4.86-4.29-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35h.54c.18 0 .42-.07.65.5.25.6.84 2.07.91 2.22.07.14.12.31.02.5-.09.19-.14.31-.28.47l-.42.49c-.14.14-.28.3-.12.58.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.63-.14.26.09 1.65.78 1.93.92.28.14.47.21.54.33.07.12.07.68-.18 1.38Z" />
      </svg>
      <span className="hidden sm:inline">WHATSAPP ORDER</span>
    </a>
  );
}
