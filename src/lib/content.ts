import { parse as parseYaml } from "yaml";
import { marked } from "marked";

export type Product = {
  slug: string;
  sku: string;
  title: string;
  tagline: string;
  price: number;
  stock: number;
  featured: boolean;
  category: string;
  accent: string;
  badges: string[];
  materials: string[];
  colors: string[];
  thumbnail: string;
  gallery: string[];
  description: string;
  tags: string[];
  printTime: string;
  shippingDays: number;
  dimensions: string;
  weight: string;
  date: string;
  body: string;
  html: string;
};

export type Policy = {
  slug: string;
  title: string;
  description: string;
  order: number;
  html: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function splitMarkdown(raw: string): { data: Record<string, unknown>; body: string } {
  const match = raw.match(FRONTMATTER);
  if (!match) return { data: {}, body: raw };
  const data = (parseYaml(match[1]) ?? {}) as Record<string, unknown>;
  return { data, body: match[2] ?? "" };
}

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : v == null ? fallback : String(v);
}
function num(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function list(v: unknown): string[] {
  if (Array.isArray(v)) return v.map((x) => String(x));
  if (typeof v === "string" && v.trim()) return [v.trim()];
  return [];
}

marked.setOptions({ gfm: true, breaks: false });

const productFiles = import.meta.glob("../../content/products/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const policyFiles = import.meta.glob("../../content/policies/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function fileSlug(path: string) {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

export const products: Product[] = Object.entries(productFiles)
  .map(([path, raw]) => {
    const { data, body } = splitMarkdown(raw);
    const slug = str(data.slug) || fileSlug(path);
    const thumbnail = str(data.thumbnail) || `/products/${slug}/main.jpg`;
    const gallery = list(data.gallery);
    return {
      slug,
      sku: str(data.sku, slug.toUpperCase()),
      title: str(data.title, slug),
      tagline: str(data.tagline),
      price: num(data.price),
      stock: num(data.stock),
      featured: data.featured === true || data.featured === "true",
      category: str(data.category, "Other"),
      accent: str(data.accent, "#111111"),
      badges: list(data.badges),
      materials: list(data.materials),
      colors: list(data.colors),
      thumbnail,
      gallery: gallery.length ? gallery : [thumbnail],
      description: str(data.description),
      tags: list(data.tags),
      printTime: str(data.print_time, "—"),
      shippingDays: num(data.shipping_days, 3),
      dimensions: str(data.dimensions, "—"),
      weight: str(data.weight, "—"),
      date: str(data.date),
      body,
      html: marked.parse(body) as string,
    } satisfies Product;
  })
  .sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));

export const policies: Policy[] = Object.entries(policyFiles)
  .map(([path, raw]) => {
    const { data, body } = splitMarkdown(raw);
    return {
      slug: str(data.slug) || fileSlug(path),
      title: str(data.title, fileSlug(path)),
      description: str(data.description),
      order: num(data.order, 99),
      html: marked.parse(body) as string,
    } satisfies Policy;
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

export const categories: string[] = Array.from(new Set(products.map((p) => p.category))).sort();

export function productBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function policyBySlug(slug: string) {
  return policies.find((p) => p.slug === slug);
}

export function isSoldOut(p: Product) {
  return p.stock <= 0;
}

export function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}
