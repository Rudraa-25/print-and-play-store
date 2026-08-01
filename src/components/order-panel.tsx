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

export function OrderPanel({ product }: { product: Product }) {
  const soldOut = isSoldOut(product);
  const [color, setColor] = useState(product.colors[0] ?? "Default");
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState<boolean[]>(ORDER_ACKNOWLEDGEMENTS.map(() => false));
  const allAccepted = checked.every(Boolean);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="mt-6 border-t border-black/10 pt-6">
      {product.colors.length > 0 && (
        <>
          <p className="font-mono text-[10px] tracking-[0.2em] text-black/50">COLOR</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] transition ${
                  color === c ? "border-hot bg-hot text-black" : "border-black/20 hover:border-hot"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="mt-5 flex items-center gap-4">
        <p className="font-mono text-[10px] tracking-[0.2em] text-black/50">QTY</p>
        <div className="flex items-center border border-black">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-sm font-bold hover:bg-hot" aria-label="Decrease quantity">−</button>
          <span className="w-10 text-center font-mono text-sm">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1.5 text-sm font-bold hover:bg-hot" aria-label="Increase quantity">+</button>
        </div>
      </div>

      <fieldset className="mt-6 space-y-2 border border-black/15 bg-paper/40 p-4">
        <legend className="px-1 font-mono text-[10px] tracking-[0.2em] text-black/50">BEFORE YOU ORDER</legend>
        {ORDER_ACKNOWLEDGEMENTS.map((label, i) => (
          <label key={label} className="flex cursor-pointer items-start gap-2 text-[13px] leading-snug">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--hot)]"
            />
            <span className={checked[i] ? "text-black" : "text-black/70"}>{label}</span>
          </label>
        ))}
      </fieldset>

      <div className="mt-6 space-y-3">
        <button
          disabled={soldOut || !allAccepted}
          onClick={() => activeCheckoutProvider.checkout({ product, color, quantity })}
          className={`w-full border border-black py-4 text-sm font-bold tracking-[0.2em] transition-all duration-300 ${
            soldOut || !allAccepted
              ? "cursor-not-allowed bg-black/10 text-black/40"
              : "bg-black text-white hover:bg-hot hover:text-black hover:shadow-[0_0_30px_-6px_var(--hot)]"
          }`}
        >
          {soldOut ? "COMING SOON" : "ORDER ON WHATSAPP"}
        </button>
        {!soldOut && !allAccepted && (
          <p className="text-center font-mono text-[10px] tracking-[0.15em] text-black/40">
            TICK ALL FIVE BOXES TO UNLOCK ORDERING
          </p>
        )}
        <button
          disabled
          className="w-full cursor-not-allowed border border-black/30 bg-white py-3 text-xs font-bold tracking-[0.2em] text-black/40"
          title="Online payments arrive soon"
        >
          CARD / UPI CHECKOUT · COMING SOON
        </button>
      </div>

      <p className="mt-3 text-center font-mono text-[10px] tracking-[0.15em] text-black/40">
        {formatPrice(product.price * quantity)} TOTAL · FREE SHIPPING
      </p>
    </div>
  );
}
