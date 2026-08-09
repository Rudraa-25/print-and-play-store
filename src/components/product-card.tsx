import { Link } from "@tanstack/react-router";
import { type Product, formatPrice, isSoldOut } from "@/lib/content";
import { Barcode } from "@/components/barcode";

function BadgeChip({ label }: { label: string }) {
  const isHot = /left|limited|new|coming/i.test(label);
  return (
    <span
      className={`px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
        isHot ? "bg-hot text-black" : "border border-border bg-card/90 text-muted-foreground"
      }`}
    >
      {label}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const soldOut = isSoldOut(product);
  return (
    <Link
      to="/$slug"
      params={{ slug: product.slug }}
      className="group relative block border border-border bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-hot hover:shadow-[0_18px_40px_-24px_rgba(255,122,0,0.9)]"
    >
      {/* image area */}
      <div className="relative aspect-square overflow-hidden bg-card">
        <div className="absolute left-3 top-3 z-10 flex max-w-[70%] flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <BadgeChip key={b} label={b} />
          ))}
        </div>
        {soldOut && (
          <div className="absolute inset-0 z-10 flex flex-wrap content-center items-center justify-center gap-x-3 gap-y-1 overflow-hidden rotate-[-8deg] bg-card/70 p-4 backdrop-blur-[1px]">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap text-lg font-bold tracking-widest text-hot opacity-90">
                COMING SOON
              </span>
            ))}
          </div>
        )}
        <img
          src={product.thumbnail}
          alt={product.title}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>

      {/* meta strip */}
      <div className="grid grid-cols-[1fr_1.4fr_auto] items-stretch border-t border-border">
        <div className="flex items-center justify-center border-r border-border p-3">
          <div className="h-10 w-10 rounded-full border border-border transition-transform duration-300 group-hover:scale-110" style={{ background: product.accent }} />
        </div>
        <div className="border-r border-border p-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{product.category}</p>
          <p className="mt-0.5 text-xl font-bold tracking-tight">{product.title}</p>
        </div>
        <div className="flex min-w-[120px] items-stretch gap-3 p-3 text-right">
          <div className="flex items-center text-black">
            <Barcode seed={product.sku} orientation="vertical" height={28} className="h-14" />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <p className="text-[9px] tracking-[0.15em] text-muted-foreground">{product.sku}</p>
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
          </div>
        </div>
      </div>

      {/* tagline row */}
      <div className="flex items-start justify-between gap-3 border-t border-border bg-card px-3 py-2">
        <p className="text-[11px] leading-snug text-muted-foreground">
          <span className="text-hot">▸</span> {product.tagline}
        </p>
        <span className="shrink-0 border border-border bg-primary px-3 py-2 text-[11px] font-bold tracking-[0.18em] text-white transition-colors duration-300 group-hover:bg-hot group-hover:text-black">
          {soldOut ? "COMING SOON" : "VIEW →"}
        </span>
      </div>
    </Link>
  );
}
