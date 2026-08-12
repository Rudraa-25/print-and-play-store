import { Link } from "@tanstack/react-router";
import { Barcode } from "@/components/barcode";
import { LogoWithTranslations } from "@/components/logo-with-translations";
import { ThemeToggle } from "@/components/theme-toggle";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/commerce";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { setIsOpen, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-ink/95 text-foreground backdrop-blur-md transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-3 sm:px-4 md:px-6">
        <Link to="/" className="group flex items-center gap-2" aria-label="spool — home">
          <LogoWithTranslations />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3 font-mono text-[11px] tracking-[0.18em]" aria-label="Main">
          <Link to="/" className="relative hidden transition hover:text-hot sm:inline">SHOP</Link>
          <Link to="/p/$slug" params={{ slug: "about" }} className="hidden transition hover:text-hot md:inline">ABOUT</Link>
          <Link to="/p/$slug" params={{ slug: "faq" }} className="hidden transition hover:text-hot md:inline">FAQ</Link>
          <Link to="/contact" className="hidden transition hover:text-hot sm:inline">CONTACT</Link>
          
          <ThemeToggle />

          {/* Cart Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative inline-flex h-10 items-center justify-center border border-border bg-card px-3 font-mono text-[11px] font-bold tracking-widest transition hover:border-hot hover:text-hot shadow-sm active:scale-95"
            aria-label={`Cart with ${totalItems} items`}
          >
            <span>CART</span>
            <span className="ml-1.5 rounded-full bg-hot px-1.5 py-0.5 text-[10px] text-primary-foreground">
              {totalItems}
            </span>
          </button>

          {/* WhatsApp Direct Order Button */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center border border-border bg-card px-3 text-foreground transition hover:border-hot hover:text-hot shadow-sm active:scale-95"
            aria-label="Order on WhatsApp"
          >
            <span className="text-hot text-base">◉</span>
            <span className="ml-1.5 hidden sm:inline">WHATSAPP</span>
          </a>
        </nav>
      </div>

      {/* Sub-header Quick Bar on mobile screens */}
      <div className="flex sm:hidden items-center justify-around border-t border-border/60 bg-card/60 px-2 py-1.5 font-mono text-[10px] tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-hot uppercase font-bold text-foreground">SHOP</Link>
        <span className="text-hot">·</span>
        <Link to="/p/$slug" params={{ slug: "about" }} className="hover:text-hot">ABOUT</Link>
        <span className="text-hot">·</span>
        <Link to="/p/$slug" params={{ slug: "terms" }} className="hover:text-hot">TERMS</Link>
        <span className="text-hot">·</span>
        <Link to="/contact" className="hover:text-hot">CONTACT</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-24 border-t border-border bg-ink text-foreground transition-colors duration-300">
      <div className="grid gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <h2 className="font-mono text-2xl font-extrabold tracking-tight">
            SPOOL<span className="text-hot">*</span>
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            3D-printed goods, made one at a time in a small studio in India. Every piece is printed to order and
            hand-finished before it ships.
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
            MADE IN INDIA · DESIGNED &amp; PRINTED BY SPOOL
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">QUICK LINKS</p>
          <ul className="mt-3 space-y-2 text-sm font-mono">
            <li><Link to="/" className="transition hover:text-hot">Shop Catalog</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "about" }} className="transition hover:text-hot">About Spool</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "faq" }} className="transition hover:text-hot">FAQ</Link></li>
            <li><Link to="/contact" className="transition hover:text-hot">Contact Us</Link></li>
          </ul>
          <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">POLICIES</p>
          <ul className="mt-3 space-y-2 text-sm font-mono">
            <li><Link to="/p/$slug" params={{ slug: "shipping" }} className="transition hover:text-hot">Shipping Policy</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "returns" }} className="transition hover:text-hot">Return Policy</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "privacy" }} className="transition hover:text-hot">Privacy Policy</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "terms" }} className="transition hover:text-hot">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">CONNECT</p>
          <ul className="mt-3 space-y-2 text-sm font-mono">
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-hot">Instagram</a></li>
            <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="transition hover:text-hot">WhatsApp {WHATSAPP_DISPLAY}</a></li>
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-hot">{CONTACT_EMAIL}</a></li>
          </ul>
        </div>
      </div>

      <div id="about" className="border-t border-border px-6 py-10 md:px-10">
        <h3 className="font-mono text-lg tracking-tight">NEW DROPS ARE SMALL &amp; HAND-MADE.</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">Each drop is limited. Get told before they sell out.</p>
        <form className="mt-5 flex max-w-md gap-0 border border-border" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            required
            placeholder="you@studio.com"
            aria-label="Email address"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button className="bg-hot px-4 font-mono text-[11px] font-bold tracking-[0.2em] text-primary-foreground transition hover:brightness-110">
            NOTIFY ME
          </button>
        </form>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border px-6 py-5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground md:px-10">
        <span>© 2026 SPOOL STUDIO · ALL RIGHTS RESERVED</span>
        <div className="flex flex-col items-end gap-1 text-foreground">
          <Barcode seed="SPOOL-EDITION-01-2026" orientation="horizontal" height={32} className="w-40" />
          <span className="text-[9px] tracking-[0.25em] text-muted-foreground">EDITION 01 — 2026</span>
        </div>
      </div>
    </footer>
  );
}
