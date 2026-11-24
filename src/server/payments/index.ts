import "server-only";
import { iciciProvider } from "./icici";
import { mockProvider } from "./mock";
import type { PaymentProvider } from "./types";

export function paymentProvider(): PaymentProvider {
  // The test gateway is opt-in only, so a deploy without PAYMENT_PROVIDER can never hand out free books.
  return process.env.PAYMENT_PROVIDER === "mock" ? mockProvider : iciciProvider;
}

export function isMockPayments() {
  return paymentProvider().name === "mock";
}
