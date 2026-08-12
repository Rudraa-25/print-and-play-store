import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { type Product, formatPrice, isSoldOut } from "@/lib/content";
import { Barcode } from "@/components/barcode";
import { useCart } from "@/lib/cart";

function BadgeChip({ label }: { label: string }) {
  const isHot = /left|limited|new|coming/i.test(label);
  return (
    <span
      className={`px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] ${
        isHot ? "bg-hot text-primary-foreground" : "border border-border bg-card/90 text-muted-foreground"
      }`}
    >
      {label}
    </span>
  );
}

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { addItem } = useCart();
  const soldOut = isSoldOut(product);

  return (
    <div
      className="group relative block border border-border/80 bg-card/75 backdrop-blur-md shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-hot hover:shadow-[0_20px_50px_-20px_var(--hot)]"
    >
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-muted/20 backdrop-blur-sm">
        <div className="absolute left-3 top-3 z-10 flex max-w-[70%] flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((b) => (
            <BadgeChip key={b} label={b} />
          ))}
        </div>

        {/* Quick View Floating Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute right-2 top-2 sm:right-3 sm:top-3 z-20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 border border-border bg-card/95 px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] font-bold tracking-widest backdrop-blur-md shadow-md hover:bg-hot hover:text-primary-foreground active:scale-95"
          >
            QUICK VIEW 👁
          </button>
        )}

        {soldOut && (
          <div className="absolute inset-0 z-10 flex flex-wrap content-center items-center justify-center gap-x-3 gap-y-1 overflow-hidden rotate-[-8deg] bg-card/80 p-4 backdrop-blur-md">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap text-lg font-bold tracking-widest text-hot opacity-90">
                COMING SOON
              </span>
            ))}
          </div>
        )}
        <Link to="/$slug" params={{ slug: product.slug }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            width={1024}
            height={1024}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-4 sm:p-6 transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          />
        </Link>
      </div>

      {/* Meta Strip - Responsive for Mobile */}
      <div className="flex flex-col sm:grid sm:grid-cols-[auto_1.4fr_auto] items-stretch border-t border-border/80 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b sm:border-b-0 sm:border-r border-border/80 p-3">
          <div
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-border transition-transform duration-300 group-hover:scale-110 shadow-inner"
            style={{ background: product.accent }}
            title={`Accent: ${product.accent}`}
          />
          <span className="sm:hidden font-mono text-xs font-bold text-hot">{formatPrice(product.price)}</span>
        </div>
        <div className="border-b sm:border-b-0 sm:border-r border-border/80 p-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{product.category}</p>
          <Link to="/$slug" params={{ slug: product.slug }} className="hover:text-hot">
            <p className="mt-0.5 text-lg sm:text-xl font-bold tracking-tight">{product.title}</p>
          </Link>
        </div>
        <div className="flex items-center justify-between sm:justify-end min-w-[120px] gap-3 p-3 text-right">
          <div className="flex items-center text-foreground">
            <Barcode seed={product.sku} orientation="vertical" height={28} className="h-10 sm:h-14 opacity-80" />
          </div>
          <div className="hidden sm:flex flex-1 flex-col justify-between font-mono">
            <p className="text-[9px] tracking-[0.15em] text-muted-foreground">{product.sku}</p>
            <p className="text-lg font-bold text-hot">{formatPrice(product.price)}</p>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 border-t border-border/80 bg-card/85 backdrop-blur-md p-3">
        <p className="text-[11px] leading-snug text-muted-foreground line-clamp-1">
          <span className="text-hot">▸</span> {product.tagline}
        </p>

        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          {!soldOut && (
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product, 1);
              }}
              className="flex-1 sm:flex-initial border border-border bg-primary py-2.5 sm:py-2 px-3 text-[10px] font-bold font-mono tracking-[0.15em] text-primary-foreground transition hover:bg-hot shadow active:scale-95 text-center"
              title="Add to Cart"
            >
              + CART
            </button>
          )}

          <Link
            to="/$slug"
            params={{ slug: product.slug }}
            className="flex-1 sm:flex-initial shrink-0 border border-border bg-card/90 py-2.5 sm:py-2 px-3 text-[10px] font-bold font-mono tracking-[0.15em] transition hover:border-hot hover:text-hot shadow text-center active:scale-95"
          >
            {soldOut ? "DETAILS →" : "VIEW →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
