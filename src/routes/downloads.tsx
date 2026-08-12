import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

const SITE = "https://print-and-play-store.lovable.app";

type DownloadItem = {
  name: string;
  file: string;
  type: "STL" | "3MF" | "GLB" | "PDF" | "MD";
  size: string;
  license: string;
  attribution: string;
  note: string;
};

/**
 * Placeholder downloads. Drop real files into public/downloads/ and keep the
 * filenames below in sync — see README "Launch checklist".
 */
const DOWNLOADS: DownloadItem[] = [
  {
    name: "spool skill & print spec guide",
    file: "/downloads/SKILL.md",
    type: "MD",
    size: "1.2 KB",
    license: "CC BY-NC 4.0",
    attribution: "spool studio",
    note: "3D printing profiles, slicer presets, and material guidelines.",
  },
  {
    name: "GRIPPY — print files",
    file: "/downloads/grippy.3mf",
    type: "3MF",
    size: "PLACEHOLDER",
    license: "CC BY-NC 4.0",
    attribution: "spool studio",
    note: "MagSafe grip, Bambu X1C profile included.",
  },
  {
    name: "POD 01 — planter",
    file: "/downloads/pod-01.stl",
    type: "STL",
    size: "PLACEHOLDER",
    license: "CC BY-NC 4.0",
    attribution: "spool studio",
    note: "Low-poly planter, 0.2mm layer height recommended.",
  },
  {
    name: "DRAGO — articulated dragon",
    file: "/downloads/drago.stl",
    type: "STL",
    size: "PLACEHOLDER",
    license: "CC BY-NC-ND 4.0",
    attribution: "spool studio",
    note: "Print-in-place, no supports.",
  },
  {
    name: "spool press kit",
    file: "/downloads/spool-press-kit.pdf",
    type: "PDF",
    size: "PLACEHOLDER",
    license: "All rights reserved",
    attribution: "spool studio",
    note: "Logos, colours and product shots for press use.",
  },
];

const ICONS: Record<DownloadItem["type"], string> = {
  STL: "◈",
  "3MF": "▣",
  GLB: "◐",
  PDF: "▤",
  MD: "🖹",
};

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — print files & press kit | spool" },
      { name: "description", content: "Free STL, 3MF and GLB files from spool, with licence and attribution details for every model." },
      { property: "og:title", content: "Downloads — print files & press kit | spool" },
      { property: "og:description", content: "Free STL, 3MF and GLB files from spool, with licence and attribution details for every model." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/downloads` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/downloads` }],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 bg-pluses">
        <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-hot">SHOP</Link> / DOWNLOADS
          </p>
          <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight md:text-5xl">
            DOWNLOADS<span className="text-hot">*</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Print files, profiles and press assets. Non-commercial use unless a licence says otherwise —
            credit spool if you post your prints.
          </p>

          <ul className="mt-8 space-y-3">
            {DOWNLOADS.map((d) => (
              <li key={d.file} className="border border-border bg-card p-4 transition hover:border-hot">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className="text-2xl text-hot">{ICONS[d.type]}</span>
                    <div>
                      <p className="font-bold">{d.name}</p>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">{d.note}</p>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                        {d.type} · {d.size} · {d.license} · © {d.attribution}
                      </p>
                    </div>
                  </div>
                  <a
                    href={d.file}
                    download
                    aria-label={`Download ${d.name} (${d.type})`}
                    className="min-h-11 border border-border bg-hot px-4 py-3 font-mono text-[11px] font-bold tracking-[0.18em] text-primary-foreground transition hover:shadow-[var(--shadow-neon)]"
                  >
                    DOWNLOAD
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <FloatingWhatsApp />
      <SiteFooter />
    </div>
  );
}
