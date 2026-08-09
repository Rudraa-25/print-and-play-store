// Playwright smoke test for the spool storefront.
// Run against the dev server:  npx playwright test tests/smoke.spec.ts
// (Playwright is not a project dependency — install with `npm i -D @playwright/test`.)
import { test, expect } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://localhost:8080";

test("hero and product grid render", async ({ page }) => {
  await page.goto(BASE);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("a[href^='/']").first()).toBeVisible();
  expect(await page.locator("img").count()).toBeGreaterThan(0);
});

test("floating WhatsApp button has a prefilled order link", async ({ page }) => {
  await page.goto(`${BASE}/grippy`);
  const wa = page.getByRole("link", { name: /order .* on whatsapp/i });
  await expect(wa).toBeVisible();
  const href = await wa.getAttribute("href");
  expect(href).toContain("wa.me/919327458583");
  expect(decodeURIComponent(href ?? "")).toContain("slug: grippy");
});

test("downloads page lists files with licences", async ({ page }) => {
  await page.goto(`${BASE}/downloads`);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/downloads/i);
  await expect(page.getByRole("link", { name: /^download/i }).first()).toBeVisible();
});

test("razorpay checkout button unlocks after acknowledgements", async ({ page }) => {
  await page.goto(`${BASE}/grippy`);
  const pay = page.getByRole("button", { name: /pay .* with card or upi/i });
  await expect(pay).toBeDisabled();
  for (const box of await page.getByRole("checkbox").all()) await box.check();
  await expect(pay).toBeEnabled();
});

test("logo reveals a translated script on focus", async ({ page }) => {
  await page.goto(BASE);
  await page.keyboard.press("Tab");
  await expect(page.getByRole("tooltip").first()).toBeVisible();
});
