import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ProductCard } from "@/components/product-card";
import { CipherHeading } from "@/components/cipher-heading";
import { HeroWordmark } from "@/components/logo-with-translations";
import { products, categories, formatPrice } from "@/lib/content";

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

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-pluses">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <p className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">EDITION 01 — BENGALURU, INDIA</p>
        <h1 className="mt-5 font-mono text-[15vw] font-bold leading-[0.85] tracking-tighter md:text-[9rem]">
          <HeroWordmark />
        </h1>
      </div>
      <div className="border-t border-border bg-ink py-2 text-foreground">
        <div className="flex gap-8 whitespace-nowrap font-mono text-[11px] tracking-[0.3em] animate-[marquee_28s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex gap-8">
              <span>MADE TO ORDER</span><span className="text-hot">◉</span>
              <span>HAND FINISHED</span><span className="text-hot">◉</span>
              <span>FREE SHIPPING IN INDIA</span><span className="text-hot">◉</span>
            </span>
          ))}
        </div>
      </div>
      <dl className="mx-auto grid max-w-6xl grid-cols-3 gap-4 border-t border-border px-4 py-6 font-mono text-[11px] tracking-[0.15em] text-muted-foreground md:px-6">
        <div><dt className="text-2xl font-bold text-foreground">{products.length}</dt>PRODUCTS</div>
        <div><dt className="text-2xl font-bold text-foreground">2–5d</dt>DISPATCH</div>
        <div><dt className="text-2xl font-bold text-foreground">₹0</dt>SHIPPING</div>
      </dl>
    </section>
  );
}


function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("ALL");
  const [sort, setSort] = useState<SortKey>("newest");

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

      <main className="flex-1">
        <Hero />

        {/* Featured strip */}
        <section className="mx-auto max-w-6xl px-4 pt-14 md:px-6">
          <div className="mb-4 flex items-end justify-between border-b border-border pb-3">
            <h2 className="font-mono text-xl font-bold tracking-tight">FEATURED</h2>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">HAND PICKED</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {featured.map((p) => (
              <a
                key={p.slug}
                href={`/${p.slug}`}
                className="group flex items-center gap-4 border border-border bg-card p-4 transition-all duration-300 hover:border-hot hover:shadow-[0_14px_30px_-22px_rgba(255,122,0,0.9)]"
              >
                <img src={p.thumbnail} alt={p.title} width={80} height={80} loading="lazy" className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-110" />
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{p.sku}</p>
                  <p className="text-base font-bold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="shop" className="mx-auto max-w-6xl px-4 pb-14 pt-16 md:px-6">
          <div className="mb-10 flex justify-center">
            <CipherHeading />
          </div>

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
                      sort === s.id ? "border-border bg-primary text-primary-foreground" : "border-border hover:border-hot hover:text-hot"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 p-3">
              {["ALL", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition ${
                    category === c ? "border-hot bg-hot text-primary-foreground" : "border-border hover:border-hot hover:text-hot"
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
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <FloatingWhatsApp />
      <SiteFooter />
    </div>
  );
}
