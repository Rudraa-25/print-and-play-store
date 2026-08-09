import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

/** Lazily loads the Razorpay Checkout script and exposes an `open` helper. */
export function useRazorpay() {
  const [ready, setReady] = useState(false);
  const loading = useRef(false);

  const load = useCallback(() => {
    if (typeof window === "undefined" || window.Razorpay || loading.current) {
      if (window?.Razorpay) setReady(true);
      return;
    }
    loading.current = true;
    const el = document.createElement("script");
    el.src = SCRIPT_SRC;
    el.async = true;
    el.onload = () => setReady(true);
    el.onerror = () => {
      loading.current = false;
      console.error("Failed to load Razorpay Checkout");
    };
    document.body.appendChild(el);
  }, []);

  useEffect(() => {
    if (window.Razorpay) setReady(true);
  }, []);

  const open = useCallback(
    async (options: Record<string, unknown>) => {
      if (!window.Razorpay) {
        load();
        await new Promise<void>((resolve) => {
          const check = setInterval(() => {
            if (window.Razorpay) {
              clearInterval(check);
              resolve();
            }
          }, 100);
          setTimeout(() => {
            clearInterval(check);
            resolve();
          }, 8000);
        });
      }
      if (!window.Razorpay) throw new Error("Razorpay Checkout unavailable");
      new window.Razorpay(options).open();
    },
    [load],
  );

  return { ready, load, open };
}
