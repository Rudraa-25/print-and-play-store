import { Link } from "@tanstack/react-router";
import spoolLogo from "@/assets/spool-logo.png.asset.json";
import { Barcode } from "@/components/barcode";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={spoolLogo.url}
            alt="Spool"
            width={28}
            height={28}
            className="invert brightness-0 opacity-90 group-hover:opacity-100 transition"
          />
          <span className="text-[11px] tracking-[0.2em] font-mono leading-none">
            SPOOL<span className="text-hot">*</span>
            <br />
            <span className="opacity-60">3D / GOODS</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-[11px] tracking-[0.18em] font-mono">
          <Link to="/" className="hidden sm:inline hover:text-hot transition">SHOP</Link>
          <a href="#about" className="hidden sm:inline hover:text-hot transition">ABOUT</a>
          <a href="#contact" className="hover:text-hot transition">CONTACT</a>
          <span className="ml-2 inline-flex h-8 w-8 items-center justify-center border border-white/20 text-white">
            <span className="text-hot">◉</span>
          </span>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-ink text-white mt-24">
      <div className="grid gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <h3 className="text-xl font-mono tracking-tight">SPOOL<span className="text-hot">*</span></h3>
          <p className="mt-3 text-sm text-white/60 max-w-sm">
            3D-printed goods, made one at a time in a small studio. Every drop is limited. Every piece is hand-finished before it ships.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] text-white/40">SHOP</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-hot">Mobile</Link></li>
            <li><Link to="/" className="hover:text-hot">Garden</Link></li>
            <li><Link to="/" className="hover:text-hot">Lamps</Link></li>
            <li><Link to="/" className="hover:text-hot">Toys</Link></li>
            <li><Link to="/" className="hover:text-hot">Electronics</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] text-white/40">CONNECT</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:text-hot">Instagram</a></li>
            <li><a href="#" className="hover:text-hot">Youtube</a></li>
            <li><a href="mailto:hi@spool.shop" className="hover:text-hot">hi@spool.shop</a></li>
          </ul>
        </div>
      </div>

      <div id="about" className="border-t border-white/10 px-6 py-10 md:px-10">
        <h4 className="text-lg font-mono tracking-tight">NEW DROPS ARE SMALL &amp; HAND-MADE.</h4>
        <p className="mt-2 text-sm text-white/50 max-w-md">Each drop is limited. Get told before they sell out.</p>
        <form className="mt-5 flex max-w-md gap-0 border border-white/20">
          <input
            type="email"
            required
            placeholder="you@studio.com"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-white/30"
          />
          <button className="bg-hot px-4 text-[11px] tracking-[0.2em] text-black font-bold hover:brightness-110">
            NOTIFY ME
          </button>
        </form>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 px-6 py-5 text-[10px] tracking-[0.2em] text-white/40 md:px-10">
        <span>© 2026 SPOOL STUDIO</span>
        <span className="hidden md:inline">TERMS / PRIVACY / RETURNS</span>
        <div className="flex flex-col items-end gap-1 text-white">
          <Barcode seed="SPOOL-EDITION-01-2026" orientation="horizontal" height={32} className="w-40" />
          <span className="text-[9px] tracking-[0.25em] text-white/50">EDITION 01 — 2026</span>
        </div>
      </div>
    </footer>
  );
}
