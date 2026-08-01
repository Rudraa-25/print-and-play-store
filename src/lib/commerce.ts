import type { Product } from "@/lib/content";

export const WHATSAPP_NUMBER = "919327458583";
export const WHATSAPP_DISPLAY = "+91 93274 58583";
export const CONTACT_EMAIL = "hi@spool.shop";
export const INSTAGRAM_URL = "https://instagram.com/spool.studio";

export type OrderIntent = {
  product: Product;
  color?: string;
  quantity: number;
};

/**
 * Checkout provider abstraction. Today only WhatsApp is wired up; Razorpay,
 * Stripe, UPI and Cashfree can be added here later without touching the UI —
 * the UI only ever calls `activeCheckoutProvider.checkout(intent)`.
 */
export type CheckoutProvider = {
  id: "whatsapp" | "razorpay" | "stripe" | "upi" | "cashfree";
  label: string;
  enabled: boolean;
  checkout: (intent: OrderIntent) => void;
};

export function whatsappOrderUrl(intent: OrderIntent) {
  const { product, color, quantity } = intent;
  const message = [
    "Hi,",
    "I want to order:",
    "",
    `Product: ${product.title} (${product.sku})`,
    `Price: ₹${product.price.toLocaleString("en-IN")}`,
    `Color: ${color ?? "—"}`,
    `Quantity: ${quantity}`,
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const whatsappProvider: CheckoutProvider = {
  id: "whatsapp",
  label: "Order on WhatsApp",
  enabled: true,
  checkout: (intent) => {
    if (typeof window !== "undefined") {
      window.open(whatsappOrderUrl(intent), "_blank", "noopener,noreferrer");
    }
  },
};

export const activeCheckoutProvider: CheckoutProvider = whatsappProvider;

export const ORDER_ACKNOWLEDGEMENTS = [
  "I understand this product is printed after ordering.",
  "I understand color may slightly vary.",
  "Layer lines are part of 3D printing.",
  "I understand returns are not accepted.",
  "I understand damaged products must be reported within 24 hours.",
];
