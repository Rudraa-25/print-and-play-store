/**
 * Razorpay REST helpers. Server-only — never import from a client component.
 * Uses fetch (no Node SDK) so it runs in the edge/worker runtime.
 *
 * Env vars (set in Lovable secrets / Vercel project settings):
 *   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
 *   VITE_RAZORPAY_KEY_ID (public, safe to expose), VITE_BASE_URL
 */

const API = "https://api.razorpay.com/v1";

function authHeader() {
  const id = process.env["RAZORPAY_KEY_ID"];
  const secret = process.env["RAZORPAY_KEY_SECRET"];
  if (!id || !secret) throw new Error("Razorpay keys are not configured");
  return `Basic ${btoa(`${id}:${secret}`)}`;
}

export type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: string;
};

export async function createRazorpayOrder(input: {
  /** amount in rupees; converted to paise here */
  amountInRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: authHeader() },
    body: JSON.stringify({
      amount: Math.round(input.amountInRupees * 100),
      currency: "INR",
      receipt: input.receipt,
      notes: input.notes ?? {},
    }),
  });
  if (!res.ok) {
    console.error("razorpay order failed", res.status, await res.text());
    throw new Error("Could not create payment order");
  }
  return (await res.json()) as RazorpayOrder;
}

/** Constant-time hex compare. */
function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmacSha256Hex(secret: string, payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Verifies the X-Razorpay-Signature header against the raw webhook body. */
export async function verifyWebhookSignature(rawBody: string, signature: string | null) {
  const secret = process.env["RAZORPAY_WEBHOOK_SECRET"];
  if (!secret || !signature) return false;
  return timingSafeEqualHex(await hmacSha256Hex(secret, rawBody), signature);
}

/** Verifies the checkout handler payload (order_id|payment_id). */
export async function verifyPaymentSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const secret = process.env["RAZORPAY_KEY_SECRET"];
  if (!secret) return false;
  const expected = await hmacSha256Hex(secret, `${input.orderId}|${input.paymentId}`);
  return timingSafeEqualHex(expected, input.signature);
}
