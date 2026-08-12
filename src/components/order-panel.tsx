import { useState } from "react";
import {
  type Product,
  formatPrice,
  isSoldOut,
} from "@/lib/content";
import {
  ORDER_ACKNOWLEDGEMENTS,
  activeCheckoutProvider,
} from "@/lib/commerce";
import { RazorpayButton } from "@/components/razorpay-button";


import { useCart } from "@/lib/cart";

import { Link } from "@tanstack/react-router";

export function OrderPanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const soldOut = isSoldOut(product);
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [quantity, setQuantity] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="mt-6 border-t border-border pt-6">
      {product.colors.length > 0 && (
        <>
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">COLOR</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition ${
                  color === c ? "border-hot bg-hot text-primary-foreground font-bold" : "border-border hover:border-hot"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="mt-5 flex items-center gap-4">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">QTY</p>
        <div className="flex items-center border border-border">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-sm font-bold hover:bg-hot" aria-label="Decrease quantity">−</button>
          <span className="w-10 text-center font-mono text-sm">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1.5 text-sm font-bold hover:bg-hot" aria-label="Increase quantity">+</button>
        </div>
      </div>

      {/* Single Terms & Conditions Checkbox with Hyperlink */}
      <div className="mt-6 border border-border bg-card/60 p-4">
        <label className="flex cursor-pointer items-start gap-3 text-xs leading-snug">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--hot)]"
          />
          <span className={termsAccepted ? "text-foreground font-semibold" : "text-muted-foreground"}>
            I have read and agree to the 3D printing{" "}
            <Link
              to="/p/$slug"
              params={{ slug: "terms" }}
              target="_blank"
              className="text-hot underline font-bold hover:brightness-125"
              onClick={(e) => e.stopPropagation()}
            >
              Terms &amp; Conditions
            </Link>
            .
          </span>
        </label>
      </div>

      <div className="mt-6 space-y-3">
        <button
          disabled={soldOut}
          onClick={() => addItem(product, quantity, color)}
          className="w-full border border-border bg-hot py-3.5 text-xs font-mono font-bold tracking-[0.2em] text-primary-foreground shadow transition duration-300 hover:brightness-110"
        >
          + ADD TO SHOPPING CART
        </button>

        <button
          disabled={soldOut || !termsAccepted}
          onClick={() => activeCheckoutProvider.checkout({ product, color, quantity })}
          className={`w-full border border-border py-3 text-xs font-bold tracking-[0.2em] transition-all duration-300 ${
            soldOut || !termsAccepted
              ? "cursor-not-allowed bg-muted text-muted-foreground opacity-60"
              : "bg-card text-foreground hover:border-hot hover:text-hot"
          }`}
        >
          {soldOut ? "COMING SOON" : "ORDER DIRECT ON WHATSAPP"}
        </button>
        {!soldOut && !termsAccepted && (
          <p className="text-center font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            PLEASE ACCEPT TERMS &amp; CONDITIONS TO UNLOCK DIRECT CHECKOUT
          </p>
        )}
        <RazorpayButton
          product={product}
          quantity={quantity}
          color={color}
          disabled={soldOut || !termsAccepted}
        />
      </div>

      <p className="mt-3 text-center font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
        {formatPrice(product.price * quantity)} TOTAL · FREE SHIPPING
      </p>
    </div>
  );
}
