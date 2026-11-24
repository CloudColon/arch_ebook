import type { Order } from "../orders";

// What the browser should do to start a payment.
export type PaymentStart =
  | { kind: "redirect"; url: string }
  | { kind: "form"; action: string; method: "POST" | "GET"; fields: Record<string, string> };

export type PaymentResult = {
  orderId: string;
  status: "paid" | "failed";
  providerRef?: string;
};

export interface PaymentProvider {
  name: string;
  createPayment(order: Order, origin: string): Promise<PaymentStart>;
  // Parse and verify the gateway's return/callback. Must reject tampered data.
  verifyCallback(params: URLSearchParams): Promise<PaymentResult>;
}
