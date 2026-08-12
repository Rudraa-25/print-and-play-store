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
  "I understand parts are 3D-printed to order and feature authentic micro layer lines (0.2mm/0.12mm FDM & Resin texture).",
  "I accept standard 3D printing manufacturing tolerances (±0.2mm / ±0.5% dimensional variance).",
  "I acknowledge material thermal limits (PLA max 55°C, PETG max 75°C) and agree to avoid high-heat environments.",
  "I understand products are customized to order and are non-refundable once printing begins unless damaged in transit.",
  "I confirm I own or hold valid usage rights for any custom CAD files (.STL/.3MF/.STEP) submitted for fabrication.",
  "I agree to record an unboxing video within 48 hours of delivery to claim free replacements for transit damage.",
];
