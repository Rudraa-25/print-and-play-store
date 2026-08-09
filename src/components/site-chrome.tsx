import { Link } from "@tanstack/react-router";
import spoolLogo from "@/assets/spool-logo.png.asset.json";
import { Barcode } from "@/components/barcode";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/commerce";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ink text-white backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <img
            src={spoolLogo.url}
            alt="SPOOL"
            width={28}
            height={28}
            className="opacity-90 brightness-0 invert transition group-hover:opacity-100"
          />
          <span className="font-mono text-[11px] leading-none tracking-[0.2em]">
            SPOOL<span className="text-hot">*</span>
            <br />
            <span className="opacity-60">3D / GOODS</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 font-mono text-[11px] tracking-[0.18em]">
          <Link to="/" className="relative hidden transition hover:text-hot sm:inline">SHOP</Link>
          <Link to="/p/$slug" params={{ slug: "about" }} className="hidden transition hover:text-hot sm:inline">ABOUT</Link>
          <Link to="/p/$slug" params={{ slug: "faq" }} className="hidden transition hover:text-hot sm:inline">FAQ</Link>
          <Link to="/p/$slug" params={{ slug: "contact" }} className="transition hover:text-hot">CONTACT</Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex h-8 items-center justify-center border border-border px-3 text-white transition hover:border-hot hover:text-hot"
          >
            <span className="text-hot">◉</span>
            <span className="ml-2 hidden md:inline">WHATSAPP</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-24 bg-ink text-white">
      <div className="grid gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <h2 className="font-mono text-xl tracking-tight">SPOOL<span className="text-hot">*</span></h2>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            3D-printed goods, made one at a time in a small studio in India. Every piece is printed to order and
            hand-finished before it ships.
          </p>
          <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">MADE IN INDIA · DESIGNED &amp; PRINTED BY SPOOL</p>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">QUICK LINKS</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="transition hover:text-hot">Shop</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "about" }} className="transition hover:text-hot">About</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "faq" }} className="transition hover:text-hot">FAQ</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "contact" }} className="transition hover:text-hot">Contact</Link></li>
          </ul>
          <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">POLICIES</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/p/$slug" params={{ slug: "shipping" }} className="transition hover:text-hot">Shipping Policy</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "returns" }} className="transition hover:text-hot">Return Policy</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "refund" }} className="transition hover:text-hot">Refund Policy</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "privacy" }} className="transition hover:text-hot">Privacy Policy</Link></li>
            <li><Link to="/p/$slug" params={{ slug: "terms" }} className="transition hover:text-hot">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">CONNECT</p>
          <ul className="mt-3 space-y-2 text-sm">
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
          <button className="bg-hot px-4 font-mono text-[11px] font-bold tracking-[0.2em] text-black transition hover:brightness-110">
            NOTIFY ME
          </button>
        </form>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border px-6 py-5 font-mono text-[10px] tracking-[0.2em] text-muted-foreground md:px-10">
        <span>© 2026 SPOOL STUDIO · ALL RIGHTS RESERVED</span>
        <div className="flex flex-col items-end gap-1 text-white">
          <Barcode seed="SPOOL-EDITION-01-2026" orientation="horizontal" height={32} className="w-40" />
          <span className="text-[9px] tracking-[0.25em] text-muted-foreground">EDITION 01 — 2026</span>
        </div>
      </div>
    </footer>
  );
}
