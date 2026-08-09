import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 bg-pluses">
      <div className="max-w-md text-center border border-border bg-card p-10">
        <h1 className="text-6xl font-mono font-bold">404<span className="text-hot">*</span></h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This SKU doesn't exist. Might be sold out, might never have been printed.
        </p>
        <Link to="/" className="mt-6 inline-block border border-border bg-hot px-4 py-2 text-xs font-bold tracking-[0.2em]">
          BACK TO SHOP →
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something misprinted.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try again or head back to the shop.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-border bg-primary px-4 py-2 text-xs font-bold tracking-[0.2em] text-primary-foreground"
          >
            RETRY
          </button>
          <a href="/" className="border border-border px-4 py-2 text-xs font-bold tracking-[0.2em]">HOME</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Spool — 3D printed goods, made one at a time" },
      { name: "description", content: "Small-batch 3D printed mobile accessories, planters, lamps, toys and hackable electronics. Shipped from a tiny studio in India." },
      { property: "og:title", content: "Spool — 3D printed goods, made one at a time" },
      { property: "og:description", content: "Small-batch 3D printed mobile accessories, planters, lamps, toys and hackable electronics. Shipped from a tiny studio in India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Spool — 3D printed goods, made one at a time" },
      { name: "twitter:description", content: "Small-batch 3D printed mobile accessories, planters, lamps, toys and hackable electronics. Shipped from a tiny studio in India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c21c304-909c-411a-9f3c-d95edb42b4ee/id-preview-aba45b48--8298cffa-90ca-4dfe-9dc0-4a4dd3e27b73.lovable.app-1784098436624.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7c21c304-909c-411a-9f3c-d95edb42b4ee/id-preview-aba45b48--8298cffa-90ca-4dfe-9dc0-4a4dd3e27b73.lovable.app-1784098436624.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@500;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
