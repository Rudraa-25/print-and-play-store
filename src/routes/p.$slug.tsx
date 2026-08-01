import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { policyBySlug, policies } from "@/lib/content";

export const Route = createFileRoute("/p/$slug")({
  loader: ({ params }) => {
    const page = policyBySlug(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const page = loaderData?.page;
    if (!page) return { meta: [{ title: "Unavailable — SPOOL" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${page.title} — SPOOL` },
        { name: "description", content: page.description },
        { property: "og:title", content: `${page.title} — SPOOL` },
        { property: "og:description", content: page.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PolicyPage,
  notFoundComponent: () => (
    <div className="p-20 text-center">
      Page not found. <Link to="/" className="underline">Back to shop</Link>
    </div>
  ),
});

function PolicyPage() {
  const { page } = Route.useLoaderData();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-pluses">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-[220px_1fr] md:px-6">
          <aside className="h-max border border-black bg-white p-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-black/50">INFORMATION</p>
            <ul className="mt-3 space-y-1.5">
              {policies.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/p/$slug"
                    params={{ slug: p.slug }}
                    className="block text-sm transition hover:text-hot"
                    activeProps={{ className: "block text-sm font-bold text-hot" }}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          <article className="border border-black bg-white p-6 md:p-10">
            <h1 className="font-mono text-3xl font-bold tracking-tight md:text-4xl">{page.title}</h1>
            <p className="mt-2 text-sm text-black/60">{page.description}</p>
            <div
              className="prose-spool mt-8 text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
