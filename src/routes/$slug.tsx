import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { productBySlug, products } from "@/data/products";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — ${p.tagline} · Spool` },
        { name: "description", content: p.description },
        { property: "og:title", content: `${p.name} — ${p.tagline}` },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="p-20 text-center">Product not found. <Link to="/" className="underline">Back to shop</Link></div>
  ),
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const isSoon = p.status === "soon";
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-pluses">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
          <p className="text-[10px] tracking-[0.2em] text-black/50">
            <Link to="/" className="hover:text-hot">SHOP</Link> / {p.sku} / {p.name}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Image */}
            <div className="border border-black bg-white">
              <div className="relative aspect-square">
                {p.status === "low" && p.stockNote && (
                  <span className="absolute left-3 top-3 z-10 bg-hot px-2 py-1 text-[10px] font-bold tracking-[0.18em] text-black">
                    {p.stockNote}
                  </span>
                )}
                <img src={p.image} alt={p.name} width={1024} height={1024} className="h-full w-full object-contain p-8" />
              </div>
            </div>

            {/* Buy panel */}
            <div className="border border-black bg-white p-6 md:p-8 flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-black/50">{p.categoryLabel}</p>
                  <h1 className="mt-1 font-mono text-4xl md:text-5xl font-bold tracking-tight">{p.name}</h1>
                  <p className="mt-1 text-sm text-black/70">{p.tagline}</p>
                </div>
                <div className="h-16 w-16 shrink-0 rounded-full border border-black" style={{ background: p.color }} />
              </div>

              <div className="mt-6 flex items-center gap-3">
                <p className="font-mono text-4xl font-bold">₹{p.price.toLocaleString("en-IN")}</p>
                {p.stockNote && (
                  <span className="bg-hot px-2 py-1 text-[10px] font-bold tracking-[0.18em]">{p.stockNote}</span>
                )}
              </div>
              <p className="mt-2 text-[11px] tracking-[0.15em] text-black/50">FREE SHIPPING · INDIA ONLY</p>

              <ul className="mt-5 space-y-2 border-t border-black/10 pt-5">
                {p.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-hot mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 space-y-3">
                <button
                  disabled={isSoon}
                  className={`w-full border border-black py-4 text-sm font-bold tracking-[0.2em] transition ${
                    isSoon ? "bg-black/10 text-black/40 cursor-not-allowed" : "bg-black text-white hover:bg-hot hover:text-black"
                  }`}
                >
                  {isSoon ? "COMING SOON" : "BUY NOW  ·  RAZORPAY"}
                </button>
                <button
                  disabled={isSoon}
                  className="w-full border border-black py-3 text-xs font-bold tracking-[0.2em] bg-white hover:bg-black hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ADD TO CRATE
                </button>
              </div>
            </div>
          </div>

          {/* Description block */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="border border-black bg-white p-6 md:p-8">
              <p className="text-[10px] tracking-[0.2em] text-black/50">DESCRIPTION</p>
              <p className="mt-3 text-[15px] leading-relaxed">{p.description}</p>

              <p className="mt-6 text-[10px] tracking-[0.2em] text-black/50">IN THE BOX</p>
              <ol className="mt-3 space-y-2 text-sm">
                <li><span className="font-bold mr-2">01</span> One {p.name}</li>
                <li><span className="font-bold mr-2">02</span> Kraft box + spool sticker sheet</li>
                <li><span className="font-bold mr-2">03</span> Little thank-you note</li>
              </ol>

              <div className="mt-6 border-t border-black/10 pt-4 space-y-1.5 text-sm">
                <p><span className="font-bold">Dispatch.</span> <span className="text-black/70">Ships in 2 – 4 business days.</span></p>
                <p><span className="font-bold">Returns.</span> <span className="text-black/70">14 days, no questions asked.</span></p>
                <p><span className="font-bold">Made in.</span> <span className="text-black/70">Bengaluru, India.</span></p>
              </div>
            </div>

            <div className="border border-black bg-ink text-white p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-[10px] tracking-[0.2em] text-white/40">HOW IT'S MADE</p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  Every {p.name} is printed on demand, sanded, and quality-checked by a human before it gets a serial number. If yours arrives with a print line that bothers you, email us — we'll reprint it.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-[11px] tracking-[0.15em] text-white/50">
                <div><p className="text-white text-lg font-bold">14h</p>PRINT TIME</div>
                <div><p className="text-white text-lg font-bold">1×</p>HAND FINISHED</div>
                <div><p className="text-white text-lg font-bold">{p.sku}</p>SERIAL</div>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <div className="mb-4 flex items-end justify-between border-b border-black pb-3">
                <h3 className="font-mono text-xl font-bold tracking-tight">MORE IN {p.categoryLabel.toUpperCase()}</h3>
                <Link to="/" className="text-[10px] tracking-[0.2em] hover:text-hot">SEE ALL →</Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {related.map((r) => (
                  <Link key={r.slug} to="/$slug" params={{ slug: r.slug }} className="border border-black bg-white p-4 flex gap-4 hover:-translate-y-0.5 transition">
                    <img src={r.image} alt={r.name} width={96} height={96} className="h-24 w-24 object-contain" loading="lazy" />
                    <div className="flex-1">
                      <p className="text-[10px] tracking-[0.2em] text-black/50">{r.categoryLabel}</p>
                      <p className="text-lg font-bold">{r.name}</p>
                      <p className="text-xs text-black/60">{r.tagline}</p>
                      <p className="mt-2 font-bold">₹{r.price.toLocaleString("en-IN")}</p>
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
