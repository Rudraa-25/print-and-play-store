/** Error reporting handler (clean no-op for self-hosted builds) */
export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV === "development") {
    console.error("[Spool Error Boundary]:", error, context);
  }
}
