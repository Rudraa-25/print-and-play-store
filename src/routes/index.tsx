import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ProductCard } from "@/components/product-card";
import { CipherHeading } from "@/components/cipher-heading";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section id="shop" className="mx-auto max-w-6xl px-4 pt-16 pb-14 md:px-6 md:pt-24">
          <div className="mb-12 flex justify-center">
            <CipherHeading />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
