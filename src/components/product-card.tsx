import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { Barcode } from "@/components/barcode";

export function ProductCard({ product }: { product: Product }) {
  const isSoon = product.status === "soon";
  return (
    <Link
      to="/$slug"
      params={{ slug: product.slug }}
      className="group relative block border border-black bg-white transition hover:-translate-y-0.5"
    >
      {/* image area */}
      <div className="relative aspect-square overflow-hidden bg-white">
        {product.status === "low" && product.stockNote && (
          <span className="absolute left-3 top-3 z-10 bg-hot px-2 py-1 text-[10px] font-bold tracking-[0.18em] text-black">
            {product.stockNote}
          </span>
        )}
        {isSoon && (
          <div className="absolute inset-0 z-10 flex flex-wrap content-center items-center justify-center gap-x-3 gap-y-1 overflow-hidden bg-white/70 backdrop-blur-[1px] p-4 rotate-[-8deg]">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} className="text-hot font-bold text-lg tracking-widest whitespace-nowrap opacity-90">
                COMING SOON
              </span>
            ))}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={1024}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* meta strip */}
      <div className="grid grid-cols-[1fr_1.4fr_auto] items-stretch border-t border-black">
        <div className="flex items-center justify-center border-r border-black p-3">
          <div className="h-10 w-10 rounded-full border border-black" style={{ background: product.color }} />
        </div>
        <div className="border-r border-black p-3">
          <p className="text-[10px] tracking-[0.15em] uppercase text-black/60">{product.categoryLabel}</p>
          <p className="mt-0.5 text-xl font-bold tracking-tight">{product.name}</p>
        </div>
        <div className="flex items-stretch gap-3 p-3 text-right min-w-[120px]">
          <div className="flex items-center text-black">
            <Barcode seed={product.sku} orientation="vertical" height={28} className="h-14" />
          </div>
          <div className="flex flex-col justify-between flex-1">
            <p className="text-[9px] tracking-[0.15em] text-black/50">{product.sku}</p>
            <p className="text-lg font-bold">₹{product.price.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>

      {/* tagline row */}
      <div className="flex items-start justify-between gap-3 border-t border-black bg-white px-3 py-2">
        <p className="text-[11px] leading-snug text-black/70">
          <span className="text-hot">▸</span> {product.tagline}
        </p>
        <span className={`shrink-0 border border-black px-3 py-2 text-[11px] font-bold tracking-[0.18em] ${isSoon ? "bg-black text-white" : "bg-black text-white"}`}>
          {isSoon ? "COMING SOON" : "BUY NOW"}
        </span>
      </div>
    </Link>
  );
}
