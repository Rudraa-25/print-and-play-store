import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { createOrder, verifyPayment } from "@/lib/razorpay.functions";
import { useRazorpay } from "@/hooks/use-razorpay";
import { type Product, formatPrice } from "@/lib/content";

export function RazorpayButton({
  product,
  quantity,
  color,
  disabled,
}: {
  product: Product;
  quantity: number;
  color?: string;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const { open, load } = useRazorpay();
  const create = useServerFn(createOrder);
  const verify = useServerFn(verifyPayment);

  async function pay() {
    setBusy(true);
    try {
      const res = await create({ data: { slug: product.slug, quantity, color } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      await open({
        key: res.keyId,
        order_id: res.orderId,
        amount: res.amount,
        currency: res.currency,
        name: "spool",
        description: `${res.productTitle}${color ? ` · ${color}` : ""} × ${quantity}`,
        theme: { color: "#c6ff2e" },
        notes: { slug: product.slug },
        handler: async (response: Record<string, string>) => {
          const check = await verify({
            data: {
              razorpay_order_id: response.razorpay_order_id ?? "",
              razorpay_payment_id: response.razorpay_payment_id ?? "",
              razorpay_signature: response.razorpay_signature ?? "",
            },
          });
          if (check.ok) toast.success("Payment received. We'll message you on WhatsApp shortly.");
          else toast.error("Payment could not be verified. Contact us before retrying.");
        },
        modal: { ondismiss: () => setBusy(false) },
      });
    } catch (error) {
      console.error(error);
      toast.error("Checkout could not start. Try WhatsApp ordering instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onMouseEnter={load}
      onFocus={load}
      onClick={pay}
      disabled={disabled || busy}
      aria-label={`Pay ${formatPrice(product.price * quantity)} for ${product.title} with card or UPI`}
      className={`w-full border border-border py-3 text-xs font-bold tracking-[0.2em] transition-all duration-300 ${
        disabled || busy
          ? "cursor-not-allowed bg-muted text-muted-foreground"
          : "bg-card text-foreground hover:border-hot hover:text-hot hover:shadow-[var(--shadow-neon)]"
      }`}
    >
      {busy ? "OPENING CHECKOUT…" : `CARD / UPI · ${formatPrice(product.price * quantity)}`}
    </button>
  );
}
