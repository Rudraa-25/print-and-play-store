import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

/**
 * Razorpay webhook. Register this URL in the Razorpay dashboard
 * (Settings → Webhooks) with the events payment.captured / payment.failed
 * and the secret stored as RAZORPAY_WEBHOOK_SECRET.
 */
const eventSchema = z.object({
  event: z.string(),
  payload: z.record(z.string(), z.unknown()).optional(),
});

export const Route = createFileRoute("/api/public/razorpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const signature = request.headers.get("x-razorpay-signature");

        const { verifyWebhookSignature } = await import("@/lib/razorpay.server");
        const valid = await verifyWebhookSignature(raw, signature);
        if (!valid) return new Response("Invalid signature", { status: 401 });

        const parsed = eventSchema.safeParse(JSON.parse(raw));
        if (!parsed.success) return new Response("Bad payload", { status: 400 });

        // Verified event. Persist / notify here once a database is connected.
        console.info("razorpay webhook", parsed.data.event);
        return new Response("ok");
      },
    },
  },
});
