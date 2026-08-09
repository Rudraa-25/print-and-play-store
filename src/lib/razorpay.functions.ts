import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { productBySlug } from "@/lib/content";

const schema = z.object({
  slug: z.string().trim().min(1).max(80),
  quantity: z.number().int().min(1).max(20),
  color: z.string().trim().max(60).optional(),
});

/**
 * Creates a Razorpay order server-side. Price is always read from the
 * markdown catalog — never trusted from the client.
 */
export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const product = productBySlug(data.slug);
    if (!product) return { ok: false as const, error: "Unknown product" };
    if (product.stock <= 0) return { ok: false as const, error: "Sold out" };

    const { createRazorpayOrder } = await import("@/lib/razorpay.server");
    const keyId = process.env["RAZORPAY_KEY_ID"];
    if (!keyId) return { ok: false as const, error: "Payments are not configured yet" };

    try {
      const order = await createRazorpayOrder({
        amountInRupees: product.price * data.quantity,
        receipt: `${product.sku}-${Date.now()}`,
        notes: {
          slug: product.slug,
          color: data.color ?? "-",
          quantity: String(data.quantity),
        },
      });
      return {
        ok: true as const,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
        productTitle: product.title,
      };
    } catch (error) {
      console.error(error);
      return { ok: false as const, error: "Payment service unavailable" };
    }
  });

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export const verifyPayment = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => verifySchema.parse(data))
  .handler(async ({ data }) => {
    const { verifyPaymentSignature } = await import("@/lib/razorpay.server");
    const valid = await verifyPaymentSignature({
      orderId: data.razorpay_order_id,
      paymentId: data.razorpay_payment_id,
      signature: data.razorpay_signature,
    });
    return { ok: valid };
  });
