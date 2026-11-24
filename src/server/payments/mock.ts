import type { PaymentProvider } from "./types";

// Test gateway so the whole buy-and-read flow works before ICICI credentials arrive.
// Only active when PAYMENT_PROVIDER=mock.
export const mockProvider: PaymentProvider = {
  name: "mock",
  async createPayment(order) {
    return { kind: "redirect", url: `/pay/mock?order=${encodeURIComponent(order.id)}` };
  },
  async verifyCallback(params) {
    const orderId = params.get("order") ?? "";
    const outcome = params.get("outcome");
    return { orderId, status: outcome === "success" ? "paid" : "failed", providerRef: `MOCK-${Date.now()}` };
  },
};
