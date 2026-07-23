import phonegrip from "@/assets/product-phonegrip.jpg";
import planter from "@/assets/product-planter.jpg";
import lamp from "@/assets/product-lamp.jpg";
import toy from "@/assets/product-toy.jpg";
import pi from "@/assets/product-pi.jpg";
import hexpot from "@/assets/product-hexpot.jpg";
import moonlamp from "@/assets/product-moonlamp.jpg";
import fidget from "@/assets/product-fidget.jpg";

export type Category = "mobile" | "garden" | "lamps" | "toys" | "electronics";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "mobile", label: "MOBILE" },
  { id: "garden", label: "GARDEN" },
  { id: "lamps", label: "LAMPS" },
  { id: "toys", label: "TOYS" },
  { id: "electronics", label: "ELECTRONICS" },
];

export type Product = {
  slug: string;
  sku: string;
  name: string;
  tagline: string;
  category: Category;
  categoryLabel: string;
  price: number;
  status: "buy" | "soon" | "low";
  stockNote?: string;
  bullets: string[];
  description: string;
  image: string;
  color: string;
};

export const products: Product[] = [
  {
    slug: "grippy",
    sku: "SPL-001",
    name: "GRIPPY",
    tagline: "MagSafe grip + stand",
    category: "mobile",
    categoryLabel: "Mobile accessory",
    price: 449,
    status: "low",
    stockNote: "ONLY 22 LEFT",
    bullets: [
      "Snaps onto MagSafe or any phone with the included adhesive back.",
      "Folds flat, pops out into a tripod that holds landscape or portrait.",
      "Printed in matte black PETG. Handles 40°C summer dashboards.",
    ],
    description:
      "A tripod grip you'll actually keep on your phone. Printed one at a time on a Bambu X1C, hand-finished, and stress-tested by dropping it more times than we'd like to admit.",
    image: phonegrip,
    color: "#111111",
  },
  {
    slug: "pod-01",
    sku: "SPL-002",
    name: "POD 01",
    tagline: "Faceted desk planter",
    category: "garden",
    categoryLabel: "Garden accessory",
    price: 349,
    status: "buy",
    bullets: [
      "Low-poly terracotta-PLA planter with drainage hole and cork base.",
      "Fits succulents, cacti and small herbs up to 3in root ball.",
      "Sealed inside so it won't weep water on your desk.",
    ],
    description:
      "A pot for people who kill plants but still try. The facets forgive fingerprints, the cork mat catches spills, and the color plays nice with basically any desk.",
    image: planter,
    color: "#c47651",
  },
  {
    slug: "curl",
    sku: "SPL-003",
    name: "CURL",
    tagline: "Sculptural bulb lamp",
    category: "lamps",
    categoryLabel: "Desk lamp",
    price: 2499,
    status: "buy",
    bullets: [
      "Hand-printed matte white PLA base, single E27 socket.",
      "Ships with a warm 2700K vintage globe filament bulb.",
      "Braided cotton cord, 1.8m, with inline switch.",
    ],
    description:
      "One continuous curve, printed in a single 14-hour run. No screws, no seams. Add a filament bulb and the whole thing glows like a paper lantern.",
    image: lamp,
    color: "#f2ebe0",
  },
  {
    slug: "drago",
    sku: "SPL-004",
    name: "DRAGO",
    tagline: "Articulated dragon",
    category: "toys",
    categoryLabel: "Fun toy",
    price: 799,
    status: "buy",
    bullets: [
      "Print-in-place. 46 flexible joints. No assembly, no supports.",
      "Roughly 22cm nose to tail. Fits in a jacket pocket.",
      "Choose flame orange, sea green, or midnight purple at checkout.",
    ],
    description:
      "The fidget toy that ate all the other fidget toys. Every joint moves. Every spike wiggles. Warning: it will end up on your coworker's desk.",
    image: toy,
    color: "#ff6a1a",
  },
  {
    slug: "pi-tv",
    sku: "SPL-005",
    name: "PI-TV",
    tagline: "Raspberry Pi retro case",
    category: "electronics",
    categoryLabel: "Exclusive electronics",
    price: 4499,
    status: "low",
    stockNote: "DROP OF 20",
    bullets: [
      "Ships pre-assembled with Pi 5 (8GB), 128GB SD, and a 2in IPS screen.",
      "Runs a custom oscilloscope + now-playing widget out of the box.",
      "USB-C in, HDMI out, snap-off back panel for tinkering.",
    ],
    description:
      "A working tiny TV. Boot it, plug in an audio source, and watch your music turn into waveforms. Everything is open — swap the firmware, rewrite the display, break it, fix it.",
    image: pi,
    color: "#efe6d3",
  },
  {
    slug: "hexgrove",
    sku: "SPL-006",
    name: "HEXGROVE",
    tagline: "Modular wall garden — 6 pack",
    category: "garden",
    categoryLabel: "Wall garden",
    price: 1899,
    status: "buy",
    bullets: [
      "Six hexagonal PLA planters that snap into a honeycomb wall grid.",
      "Command-strip mounting, no drill required, holds up to 400g each.",
      "Rearrange the pattern any time — every piece connects to every other.",
    ],
    description:
      "A garden that grows sideways. Start with six, add more, build the wall your landlord definitely didn't approve.",
    image: hexpot,
    color: "#e07b52",
  },
  {
    slug: "lunaria",
    sku: "SPL-007",
    name: "LUNARIA",
    tagline: "Moon lamp on oak cradle",
    category: "lamps",
    categoryLabel: "Night lamp",
    price: 1299,
    status: "buy",
    bullets: [
      "160mm moon printed in glow-diffusing PLA with real lunar surface detail.",
      "Warm 3000K LED, USB-C rechargeable, 12h battery.",
      "Cradle CNC-cut from solid oak, oiled by hand.",
    ],
    description:
      "The moon, but small, on your nightstand, on a piece of oak. Tap the base to cycle brightness. That's the whole product.",
    image: moonlamp,
    color: "#f6e6b5",
  },
  {
    slug: "gearbox",
    sku: "SPL-008",
    name: "GEARBOX",
    tagline: "Print-in-place fidget cube",
    category: "toys",
    categoryLabel: "Fun toy",
    price: 599,
    status: "soon",
    bullets: [
      "Five working brass gears trapped inside a translucent PLA cube.",
      "Spin one, they all spin. Meditative and slightly annoying.",
      "Fits in a coat pocket. Weighs 82g.",
    ],
    description:
      "A gearbox with no purpose. Spin the top gear, watch the others chase it, put it down, pick it up again in five minutes.",
    image: fidget,
    color: "#44e05b",
  },
];

export function productBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
