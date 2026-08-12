import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ProductCard } from "@/components/product-card";
import { CipherHeading } from "@/components/cipher-heading";
import { ParallaxHero } from "@/components/parallax-hero";
import { QuickViewModal } from "@/components/quick-view-modal";
import { products, categories, formatPrice, type Product } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPOOL — 3D printed goods, made one at a time" },
      { name: "description", content: "Small-batch 3D printed desk goods, planters, lamps, toys and hackable electronics. Printed to order in India, shipped free." },
      { property: "og:title", content: "SPOOL — 3D printed goods, made one at a time" },
      { property: "og:description", content: "Small-batch 3D printed desk goods, planters, lamps, toys and hackable electronics. Printed to order in India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type SortKey = "newest" | "price-low" | "price-high" | "alpha" | "featured" | "stock";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "newest", label: "NEWEST" },
  { id: "featured", label: "FEATURED" },
  { id: "price-low", label: "PRICE ↑" },
  { id: "price-high", label: "PRICE ↓" },
  { id: "alpha", label: "A–Z" },
  { id: "stock", label: "STOCK" },
];

function StatsBand() {
  return (
    <dl className="mx-auto mt-20 grid max-w-6xl grid-cols-3 gap-4 border-t border-border px-4 py-8 font-mono text-[11px] tracking-[0.15em] text-muted-foreground md:px-6">
      <div><dt className="text-2xl font-bold text-foreground">{products.length}</dt>PRODUCTS</div>
      <div><dt className="text-2xl font-bold text-foreground">2–5d</dt>DISPATCH</div>
      <div><dt className="text-2xl font-bold text-foreground">₹0</dt>SHIPPING</div>
    </dl>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [sort, setSort] = useState<SortKey>("newest");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const inCat = category === "ALL" || p.category === category;
      const inQuery =
        !q ||
        [p.title, p.tagline, p.category, p.description, ...p.tags, ...p.materials].join(" ").toLowerCase().includes(q);
      return inCat && inQuery;
    });
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "alpha": return a.title.localeCompare(b.title);
        case "stock": return b.stock - a.stock;
        case "featured": return Number(b.featured) - Number(a.featured);
        default: return (b.date > a.date ? 1 : b.date < a.date ? -1 : 0);
      }
    });
    if (sort === "newest" || sort === "featured") {
      list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [query, category, sort]);

  const featured = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 bg-pluses">
        <section id="shop" className="mx-auto max-w-6xl px-4 pb-14 pt-8 md:px-6">
          <div className="mb-6 flex justify-center">
            <CipherHeading />
          </div>

          {/* Product Highlights Spotlight */}
          {featured.length > 0 && (
            <div className="mb-10 border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3 font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-hot animate-ping" />
                  <h2 className="text-sm font-bold tracking-widest text-foreground">PRODUCT HIGHLIGHTS &amp; SPOTLIGHTS</h2>
                </div>
                <span className="text-[10px] tracking-widest text-muted-foreground">ENGINEER CHOICE ★ 4.9/5</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 font-mono">
                {featured.map((p) => (
                  <Link
                    key={p.slug}
                    to="/$slug"
                    params={{ slug: p.slug }}
                    className="group relative flex items-center gap-3 border border-border bg-background p-3 transition duration-300 hover:border-hot hover:shadow-[0_12px_28px_-20px_var(--hot)]"
                  >
                    <span className="absolute right-2 top-2 rounded bg-hot px-1.5 py-0.5 text-[8px] font-bold text-primary-foreground uppercase">
                      SPOTLIGHT
                    </span>
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      width={64}
                      height={64}
                      className="h-14 w-14 object-contain bg-card p-1 border border-border transition-transform duration-300 group-hover:scale-110"
                    />
                    <div>
                      <p className="text-[9px] tracking-widest text-muted-foreground uppercase">{p.sku}</p>
                      <p className="text-sm font-bold text-foreground group-hover:text-hot">{p.title}</p>
                      <p className="mt-0.5 text-xs font-bold text-hot">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="mb-6 border border-border bg-card">
            <div className="flex flex-col gap-3 border-b border-border p-3 md:flex-row md:items-center">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH PRODUCTS, MATERIALS, TAGS…"
                aria-label="Search products"
                className="flex-1 bg-transparent px-2 py-2 font-mono text-[12px] tracking-[0.1em] outline-none placeholder:text-muted-foreground focus:ring-0"
              />
              <div className="flex flex-wrap gap-2">
                {SORTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] transition ${
                      sort === s.id ? "border-border bg-primary text-primary-foreground font-bold" : "border-border hover:border-hot hover:text-hot"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto p-3 no-scrollbar scroll-smooth">
              {["ALL", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
                    category === c ? "border-hot bg-hot text-primary-foreground font-bold" : "border-border hover:border-hot hover:text-hot"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            {visible.length} {visible.length === 1 ? "RESULT" : "RESULTS"}
          </p>

          {visible.length === 0 ? (
            <div className="border border-border bg-card p-16 text-center font-mono text-sm text-muted-foreground">
              NOTHING MATCHES THAT. TRY A DIFFERENT SEARCH.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {visible.map((p) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <FloatingWhatsApp />

      <SiteFooter />
    </div>
  );
}
