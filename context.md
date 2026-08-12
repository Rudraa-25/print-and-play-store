# Master Project Context: spool (Print & Play 3D Storefront)

> **Last Updated:** 2026-08-12T23:50:00+05:30  
> **Repository:** [https://github.com/Rudraa-25/print-and-play-store](https://github.com/Rudraa-25/print-and-play-store) (Branch: `main` · Public)  
> **Dev Server:** [http://localhost:8080/](http://localhost:8080/)  
> **Status:** Build verified (`npm run build` 100% clean), pushed to GitHub, 100% Vercel-ready.

---

## 1. Project Overview & Location

- **Brand:** `spool 3D STUDIO`
- **Location / Studio Origin:** **Ahmedabad, Gujarat, India**
- **Contact Info:**
  - WhatsApp: `+91 93274 58583` (`https://wa.me/919327458583`)
  - Email: `hi@spool.shop`
  - Instagram: `https://instagram.com/spool.studio`

---

## 2. Core Architecture & Tech Stack

- **Framework:** TanStack Start (React 19 + TypeScript) + Vite + Tailwind v4 + Nitro
- **Data Source:** Markdown files in `content/products/*.md` and `content/policies/*.md`, compiled flat via `scripts/generate-products-json.mjs` → `data/products.json`.
- **Checkout Provider:** Dual checkout support — Direct WhatsApp ordering + Razorpay card/UPI checkout.

---

## 3. Latest UI & Functional Features Implemented

1. **Ultra-Light Soft Cream & Dark Theme:**
   - Soft Cream theme (`--background: #FCFBF7` / `oklch(0.99 0.005 85)`) and Dark theme.
   - Theme toggle button labeled **`☀ LIGHT`** and **`🌙 DARK`**.

2. **Hover-Only Multilingual Dukaan Shop Header ([`src/components/cipher-heading.tsx`](file:///home/rudra/Desktop/A1%20MINI/print-and-play-store-main%20%282%29/print-and-play-store-main/src/components/cipher-heading.tsx)):**
   - Defaults to **`[SHOP]`**.
   - Automatically cycles through 11+ Indian language scripts for SHOP/DUKAAN (*Hindi, Gujarati, Tamil, Bengali, Kannada, Telugu, Malayalam, Punjabi, Odia, Urdu, English*) **only when hovered**.

3. **Product Highlights & Glassmorphism Cards:**
   - Top Spotlight section featuring featured picks (`SPOTLIGHT`, rating badges).
   - Glassmorphic card styling (`backdrop-blur-md`, `bg-card/75`, `border-border/80`, `shadow-lg`).

4. **3D Printing Terms & Conditions Flow:**
   - Single agreement checkbox: `I have read and agree to the 3D printing Terms & Conditions.`
   - Hyperlink text opening the dedicated policy page [`/p/terms`](file:///home/rudra/Desktop/A1%20MINI/print-and-play-store-main%20%282%29/print-and-play-store-main/content/policies/terms.md).
   - Policy covers micro layer lines (0.2mm/0.12mm FDM/Resin), manufacturing tolerances (±0.2mm), heat limits (PLA 55°C / PETG 75°C), made-to-order non-refundability, custom CAD IP ownership, and 48-hour unboxing video requirement.

5. **Full Mobile Responsiveness:**
   - 44px touch targets (`h-10`) with `active:scale-95` tap feedback.
   - Mobile sub-header navigation bar (`SHOP · ABOUT · TERMS · CONTACT`).
   - Touch horizontal swipe scrolling for category filters.
   - Responsive card meta strips that stack cleanly on 320px–480px screens.

6. **Brand Assets & Favicon:**
   - Custom 3D Filament Spool vector logo mark in [`src/components/logo-with-translations.tsx`](file:///home/rudra/Desktop/A1%20MINI/print-and-play-store-main%20%282%29/print-and-play-store-main/src/components/logo-with-translations.tsx).
   - High-resolution SVG favicon in [`public/favicon.svg`](file:///home/rudra/Desktop/A1%20MINI/print-and-play-store-main%20%282%29/print-and-play-store-main/public/favicon.svg) and [`public/favicon.ico`](file:///home/rudra/Desktop/A1%20MINI/print-and-play-store-main%20%282%29/print-and-play-store-main/public/favicon.ico).

7. **Cleaned Third-Party Branding & Watermarks:**
   - Removed external telemetry links, external social card domain previews, and `.lovable` metadata.

---

## 4. Razorpay Credentials Configured

Set in [`.env`](file:///home/rudra/Desktop/A1%20MINI/print-and-play-store-main%20%282%29/print-and-play-store-main/.env):
```env
VITE_RAZORPAY_KEY_ID=rzp_test_TOv36TRCT1cmJK
RAZORPAY_KEY_ID=rzp_test_TOv36TRCT1cmJK
RAZORPAY_KEY_SECRET=iN4hkPMf7vO7exRROCeAJ8l7
```

---

## 5. Live Product Management & Deployment

- **GitHub Auto-Deploy:** Any push to `main` or editing a markdown file under `content/products/<slug>.md` on GitHub automatically triggers a Vercel build (~25 seconds).
- **Vercel Setup:**
  1. Import `Rudraa-25/print-and-play-store` on Vercel (`https://vercel.com/new`).
  2. Add `VITE_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET` in Vercel Environment Variables.
  3. Deploy!

---

## 6. Quick Commands

```bash
# Run local dev server (port 8080)
npm run dev

# Run production build validation
npm run build

# Regenerate catalog export after editing markdown files
node scripts/generate-products-json.mjs
```
