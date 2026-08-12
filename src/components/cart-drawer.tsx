import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/content";
import { WHATSAPP_NUMBER } from "@/lib/commerce";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen, totalItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    const orderDetails = items
      .map((item) => `• ${item.product.title} (x${item.quantity}) - Color: ${item.selectedColor || 'Default'}`)
      .join("\n");

    const message = encodeURIComponent(
      `Hi SPOOL! I want to order the following items:\n\n${orderDetails}\n\nTotal: ${formatPrice(totalPrice)}\nPlease share payment link / details.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
        aria-label="Close cart"
      />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">YOUR CART</span>
            <span className="bg-hot px-2 py-0.5 text-xs font-bold text-primary-foreground">
              {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="border border-border px-3 py-1 text-xs font-bold transition hover:border-hot hover:text-hot"
          >
            ✕ CLOSE
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center font-mono text-muted-foreground">
              <span className="text-4xl text-hot mb-2">🛒</span>
              <p className="text-sm font-bold">YOUR CART IS EMPTY</p>
              <p className="mt-1 text-xs">Add some 3D printed items to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.slug}-${item.selectedColor}`}
                  className="flex gap-3 border border-border bg-background p-3 transition hover:border-hot"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-16 w-16 object-contain bg-card p-1 border border-border"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{item.product.title}</p>
                    {item.selectedColor && (
                      <p className="text-[10px] text-muted-foreground uppercase font-mono">
                        Color: {item.selectedColor}
                      </p>
                    )}
                    <p className="mt-1 font-mono text-xs font-bold text-hot">
                      {formatPrice(item.product.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-2 font-mono text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        className="h-6 w-6 border border-border hover:border-hot font-bold"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        className="h-6 w-6 border border-border hover:border-hot font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="ml-auto text-[10px] text-destructive hover:underline"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 font-mono bg-ink">
            <div className="flex justify-between items-center text-sm font-bold mb-4">
              <span>SUBTOTAL:</span>
              <span className="text-lg text-hot">{formatPrice(totalPrice)}</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full border border-border bg-hot px-4 py-3 text-center text-xs font-bold tracking-widest text-primary-foreground shadow transition hover:brightness-110 flex items-center justify-center gap-2"
              >
                <span>ORDER VIA WHATSAPP →</span>
              </button>

              <button
                onClick={() => {
                  alert("Redirecting to Razorpay payment gateway...");
                }}
                className="w-full border border-border bg-card px-4 py-2.5 text-center text-xs font-bold tracking-widest text-foreground transition hover:border-hot"
              >
                PAY WITH RAZORPAY (CARD/UPI)
              </button>

              <button
                onClick={clearCart}
                className="w-full text-[10px] text-muted-foreground hover:underline text-center pt-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
