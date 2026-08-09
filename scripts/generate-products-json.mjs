// Generates data/products.json from content/products/*.md (source of truth).
// Run: node scripts/generate-products-json.mjs
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { parse as parseYaml } from "yaml";

const DIR = "content/products";
const FM = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

const products = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const raw = readFileSync(`${DIR}/${f}`, "utf8");
    const m = raw.match(FM);
    const data = m ? parseYaml(m[1]) ?? {} : {};
    const body = (m ? m[2] : raw).trim();
    return { ...data, slug: data.slug ?? f.replace(/\.md$/, ""), body };
  })
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

mkdirSync("data", { recursive: true });
writeFileSync("data/products.json", JSON.stringify(products, null, 2) + "\n");
console.log(`wrote data/products.json (${products.length} products)`);
