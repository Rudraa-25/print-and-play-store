# spool — 3D printed goods storefront

Markdown-driven storefront for **spool**: near-black canvas, electric-lime primary,
ember-orange secondary. Built on **TanStack Start (React 19 + TypeScript) + Tailwind v4**
— not Next.js. Server routes replace `app/api/*`, and `createServerFn` replaces
route handlers for app-internal RPC.

## Stack map (Next.js → this project)

| Next.js App Router          | Here                                        |
| --------------------------- | ------------------------------------------- |
| `app/layout.tsx`            | `src/routes/__root.tsx`                      |
| `app/page.tsx`              | `src/routes/index.tsx`                       |
| `app/products/[slug]/page`  | `src/routes/$slug.tsx`                       |
| `app/downloads/page.tsx`    | `src/routes/downloads.tsx`                   |
| `app/contact/page.tsx`      | `src/routes/contact.tsx`                     |
| `app/policies/*`            | `src/routes/p.$slug.tsx` + `content/policies/*.md` |
| `app/api/create-razorpay-order` | `src/lib/razorpay.functions.ts` (`createOrder`) |
| `app/api/verify-razorpay-webhook` | `src/routes/api/public/razorpay-webhook.ts` |
| `lib/razorpay.ts`           | `src/lib/razorpay.server.ts`                 |
| `hooks/useRazorpay.tsx`     | `src/hooks/use-razorpay.tsx`                 |
| `data/products.json`        | `content/products/*.md` → `data/products.json` |
| `styles/globals.css`        | `src/styles.css`                             |

## Content

Products and policies are Markdown. Adding a `.md` file updates the shop, search,
sitemap and navigation with no code changes.

```
content/products/<slug>.md    # frontmatter: sku, price, stock, colors, gallery…
content/policies/<slug>.md    # shipping, returns, refund, privacy, terms, faq, about, contact
```

Regenerate the flat catalog export:

```bash
node scripts/generate-products-json.mjs   # → data/products.json
```

## Environment variables

Server-only (Lovable secrets / Vercel project settings):

| Name | Purpose |
| ---- | ------- |
| `RAZORPAY_KEY_ID` | Razorpay key id used for server order creation |
| `RAZORPAY_KEY_SECRET` | Razorpay secret; also signs payment verification |
| `RAZORPAY_WEBHOOK_SECRET` | Secret configured on the Razorpay webhook |

Public (safe in the browser bundle):

| Name | Purpose |
| ---- | ------- |
| `VITE_RAZORPAY_KEY_ID` | Optional public key id (server returns it too) |
| `VITE_BASE_URL` | Absolute site URL for links and OG tags |

No secret values live in the repo.

## Razorpay flow

1. Client calls the `createOrder` server function with `{ slug, quantity, color }`.
2. Server looks the **price up from Markdown** (never trusts the client), calls
   `POST https://api.razorpay.com/v1/orders` with the amount in paise, returns `order_id`.
3. `useRazorpay()` lazy-loads Checkout and opens it with the returned `order_id`.
4. The handler posts `order_id|payment_id` + signature to `verifyPayment`, HMAC-verified server-side.
5. Razorpay also POSTs to `/api/public/razorpay-webhook`, which verifies
   `X-Razorpay-Signature` against the raw body before doing anything.

Register the webhook in Razorpay Dashboard → Settings → Webhooks:
`https://<your-domain>/api/public/razorpay-webhook`, events `payment.captured`, `payment.failed`.

## WhatsApp ordering

`FloatingWhatsApp` opens `wa.me/919327458583` prefilled with
`Hi, I want to order [PRODUCT NAME] — slug: [slug]`. Works on mobile and WhatsApp Web.

## Accessibility & motion

- Visible `:focus-visible` ring (lime) on every interactive element.
- Icon-only controls carry `aria-label`; images carry alt text (decorative ones `alt=""`).
- The logo cycler pauses under `prefers-reduced-motion` and announces "spool" once to screen readers.
- Body text targets WCAG AA on the near-black canvas.

## Local development

```bash
npm install
npm run dev        # http://localhost:8080
```

## Deployment

Publish from Lovable, or deploy the repo to Vercel/Cloudflare:
set the env vars above, build with `npm run build`, then register the webhook URL.

## Launch checklist

- [ ] Replace placeholder product shots in `public/products/<slug>/main.jpg` (1024×1024, transparent or white bg)
- [ ] Add a real hero image and OG image (1200×630) and point `og:image` at it
- [ ] Drop real print files into `public/downloads/` and update sizes in `src/routes/downloads.tsx`
- [ ] Add `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `RAZORPAY_WEBHOOK_SECRET`
- [ ] Set `VITE_BASE_URL` to the production domain
- [ ] Register the webhook URL in the Razorpay dashboard
- [ ] Run a sandbox test payment end to end
- [ ] Run `npx playwright test tests/smoke.spec.ts`
