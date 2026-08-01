import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { OrderPanel } from "@/components/order-panel";
import { productBySlug, products, formatPrice, isSoldOut } from "@/lib/content";
import { WHATSAPP_NUMBER } from "@/lib/commerce";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Unavailable — SPOOL" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.title} — ${p.tagline} · SPOOL` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.title} — ${p.tagline}` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.title,
            sku: p.sku,
            description: p.description,
            category: p.category,
            material: p.materials.join(", "),
            brand: { "@type": "Brand", name: "SPOOL" },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "INR",
              availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="p-20 text-center">
      Product not found. <Link to="/" className="underline">Back to shop</Link>
    </div>
  ),
});

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-black/10 py-2">
      <p className="font-mono text-[10px] tracking-[0.18em] text-black/40">{label}</p>
      <p className="mt-0.5 text-sm">{value}</p>
    </div>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const soldOut = isSoldOut(p);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 2);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 bg-pluses">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/50">
            <Link to="/" className="hover:text-hot">SHOP</Link> / {p.sku} / {p.title}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="border border-black bg-white">
                <div
                  className={`relative aspect-square overflow-hidden ${zoom ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                  onClick={() => setZoom((z) => !z)}
                >
                  <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
                    {p.badges.map((b) => (
                      <span key={b} className="bg-hot px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-black">
                        {b}
                      </span>
                    ))}
                  </div>
                  <img
                    src={p.gallery[active]}
                    alt={`${p.title} — view ${active + 1}`}
                    width={1024}
                    height={1024}
                    className={`h-full w-full object-contain p-8 transition-transform duration-500 ease-out ${zoom ? "scale-[1.8]" : "scale-100"}`}
                  />
                  <span className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.18em] text-black/40">
                    {zoom ? "CLICK TO ZOOM OUT" : "CLICK TO ZOOM"}
                  </span>
                </div>
              </div>
              {p.gallery.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {p.gallery.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => { setActive(i); setZoom(false); }}
                      className={`border bg-white p-2 transition ${i === active ? "border-hot" : "border-black/20 hover:border-black"}`}
                    >
                      <img src={src} alt={`${p.title} thumbnail ${i + 1}`} width={200} height={200} loading="lazy" className="aspect-square w-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buy panel */}
            <div className="flex flex-col border border-black bg-white p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-black/50">{p.category}</p>
                  <h1 className="mt-1 font-mono text-4xl font-bold tracking-tight md:text-5xl">{p.title}</h1>
                  <p className="mt-1 text-sm text-black/70">{p.tagline}</p>
                </div>
                <div className="h-16 w-16 shrink-0 rounded-full border border-black" style={{ background: p.accent }} />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <p className="font-mono text-4xl font-bold">{formatPrice(p.price)}</p>
                <span className={`px-2 py-1 font-mono text-[10px] font-bold tracking-[0.18em] ${soldOut ? "bg-black text-white" : "bg-hot text-black"}`}>
                  {soldOut ? "MADE TO ORDER SOON" : `${p.stock} IN STOCK`}
                </span>
              </div>
              <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-black/50">
                FREE SHIPPING · INDIA ONLY · DISPATCH IN {p.shippingDays} DAYS
              </p>

              <OrderPanel product={p} />

              <div className="mt-6 flex flex-wrap gap-2 border-t border-black/10 pt-5">
                <button onClick={copyLink} className="border border-black px-3 py-2 font-mono text-[10px] tracking-[0.18em] transition hover:bg-black hover:text-white">
                  {copied ? "LINK COPIED ✓" : "COPY LINK"}
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I have a question about ${p.title} (${p.sku}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-3 py-2 font-mono text-[10px] tracking-[0.18em] transition hover:bg-black hover:text-white"
                >
                  ASK A QUESTION
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${p.title} by SPOOL — ${p.tagline}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black px-3 py-2 font-mono text-[10px] tracking-[0.18em] transition hover:bg-black hover:text-white"
                >
                  SHARE
                </a>
              </div>
            </div>
          </div>

          {/* Description + specs */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="border border-black bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-black/50">DESCRIPTION</p>
              <div
                className="prose-spool mt-3 text-[15px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: p.html }}
              />

              <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-black/50">IN THE BOX</p>
              <ol className="mt-3 space-y-2 text-sm">
                <li><span className="mr-2 font-bold">01</span> One {p.title}</li>
                <li><span className="mr-2 font-bold">02</span> Kraft box + spool sticker sheet</li>
                <li><span className="mr-2 font-bold">03</span> Little thank-you note</li>
              </ol>
            </div>

            <div className="border border-black bg-white p-6 md:p-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-black/50">SPECIFICATIONS</p>
              <div className="mt-3">
                <Spec label="MATERIAL" value={p.materials.join(" / ") || "—"} />
                <Spec label="COLORS AVAILABLE" value={p.colors.join(" / ") || "—"} />
                <Spec label="DIMENSIONS" value={p.dimensions} />
                <Spec label="WEIGHT" value={p.weight} />
                <Spec label="ESTIMATED PRINT TIME" value={p.printTime} />
                <Spec label="DELIVERY" value={`${p.shippingDays} business days`} />
                <Spec label="SERIAL" value={p.sku} />
              </div>
              <div className="mt-6 space-y-1.5 border-t border-black/10 pt-4 text-sm">
                <p><span className="font-bold">Made in.</span> <span className="text-black/70">Bengaluru, India.</span></p>
                <p>
                  <span className="font-bold">Returns.</span>{" "}
                  <span className="text-black/70">Not accepted — made to order. </span>
                  <Link to="/p/$slug" params={{ slug: "returns" }} className="underline hover:text-hot">Read the policy</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <div className="mb-4 flex items-end justify-between border-b border-black pb-3">
                <h2 className="font-mono text-xl font-bold tracking-tight">MORE IN {p.category.toUpperCase()}</h2>
                <Link to="/" className="font-mono text-[10px] tracking-[0.2em] hover:text-hot">SEE ALL →</Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/$slug"
                    params={{ slug: r.slug }}
                    className="group flex gap-4 border border-black bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-hot"
                  >
                    <img src={r.thumbnail} alt={r.title} width={96} height={96} loading="lazy" className="h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-110" />
                    <div className="flex-1">
                      <p className="font-mono text-[10px] tracking-[0.2em] text-black/50">{r.category}</p>
                      <p className="text-lg font-bold">{r.title}</p>
                      <p className="text-xs text-black/60">{r.tagline}</p>
                      <p className="mt-2 font-bold">{formatPrice(r.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
