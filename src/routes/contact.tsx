import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, CONTACT_EMAIL, INSTAGRAM_URL } from "@/lib/commerce";

const SITE = "http://localhost:8080";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact spool — WhatsApp, email, Instagram" },
      { name: "description", content: "Talk to spool about orders, custom colours, bulk enquiries and wholesale. WhatsApp is fastest; email works too." },
      { property: "og:title", content: "Contact spool — WhatsApp, email, Instagram" },
      { property: "og:description", content: "Talk to spool about orders, custom colours, bulk enquiries and wholesale." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/contact` }],
  }),
  component: ContactPage,
});

const CHANNELS = [
  { label: "WhatsApp", value: WHATSAPP_DISPLAY, href: `https://wa.me/${WHATSAPP_NUMBER}`, note: "Orders, custom colours, bulk enquiries. Fastest reply." },
  { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, note: "Wholesale, press and licensing." },
  { label: "Instagram", value: "@spool.studio", href: INSTAGRAM_URL, note: "Drops, timelapses and studio mess." },
];

function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-pluses">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-hot">SHOP</Link> / CONTACT
          </p>
          <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight md:text-5xl">
            CONTACT<span className="text-hot">*</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Studio hours: Monday to Saturday, 10:00–19:00 IST. Printers run overnight; humans do not.
          </p>

          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {CHANNELS.map((c) => (
              <li key={c.label} className="border border-border bg-card p-5 transition hover:border-hot">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{c.label.toUpperCase()}</p>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-lg font-bold transition hover:text-hot"
                >
                  {c.value}
                </a>
                <p className="mt-2 text-[13px] text-muted-foreground">{c.note}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 border border-border bg-card p-6">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">BEFORE YOU MESSAGE</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Everything is printed to order, so include the product name and colour in your first message —
              it saves a round trip. Order updates go out on WhatsApp.
            </p>
            <Link
              to="/p/$slug"
              params={{ slug: "faq" }}
              className="mt-4 inline-block min-h-11 border border-border px-4 py-3 font-mono text-[11px] font-bold tracking-[0.18em] transition hover:border-hot hover:text-hot"
            >
              READ THE FAQ →
            </Link>
          </div>
        </div>
      </main>
      <FloatingWhatsApp />
      <SiteFooter />
    </div>
  );
}
