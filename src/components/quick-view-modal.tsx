import { useState } from "react";
import { type Product, formatPrice, isSoldOut } from "@/lib/content";
import { useCart } from "@/lib/cart";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const soldOut = isSoldOut(product);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 w-full max-w-2xl border border-border bg-card shadow-2xl transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 border border-border bg-background px-3 py-1 font-mono text-xs font-bold transition hover:border-hot hover:text-hot"
        >
          ✕ CLOSE
        </button>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden border border-border bg-background p-4 flex items-center justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between font-mono">
            <div>
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {product.category} · {product.sku}
              </span>
              <h2 className="mt-1 text-2xl font-bold">{product.title}</h2>
              <p className="mt-2 text-xl font-extrabold text-hot">
                {formatPrice(product.price)}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {product.description || product.tagline}
              </p>

              {/* Specs */}
              <div className="mt-4 space-y-1.5 border-y border-border py-3 text-[11px] text-muted-foreground">
                <p>🖨 PRINT TIME: <span className="text-foreground">{product.printTime}</span></p>
                <p>📐 DIMENSIONS: <span className="text-foreground">{product.dimensions}</span></p>
                <p>📦 DISPATCH: <span className="text-foreground">{product.shippingDays} Days</span></p>
              </div>

              {/* Color Select */}
              {product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    AVAILABLE COLORS:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`border px-3 py-1 text-[11px] uppercase transition ${
                          selectedColor === color
                            ? "border-hot bg-hot text-primary-foreground font-bold"
                            : "border-border hover:border-hot"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-muted-foreground">QTY:</span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 border border-border font-bold hover:border-hot"
                >
                  -
                </button>
                <span className="text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 border border-border font-bold hover:border-hot"
                >
                  +
                </button>
              </div>

              <button
                disabled={soldOut}
                onClick={handleAddToCart}
                className={`w-full border border-border px-4 py-3 font-mono text-xs font-bold tracking-[0.2em] transition ${
                  soldOut
                    ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
                    : "bg-hot text-primary-foreground hover:brightness-110 shadow-lg"
                }`}
              >
                {soldOut ? "SOLD OUT" : "ADD TO CART →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
