import type { PaymentProvider } from "./types";

// ICICI Bank payment gateway adapter.
//
// To finish this once ICICI shares the merchant kit:
//   1. Fill the env vars below in .env.local (and on the server).
//   2. createPayment: build the request exactly as the ICICI integration document specifies
//      (field names, encryption or checksum, amount format) and return it as a form POST or redirect.
//   3. verifyCallback: decrypt or verify the response checksum with ICICI_SECRET_KEY, check the amount
//      against the stored order, and map ICICI's status codes to "paid" or "failed".
//   4. Register https://knowledgebag.in/api/payment/icici/callback as the return URL with ICICI.
//   5. Remove PAYMENT_PROVIDER=mock (anything else selects ICICI).
//
// Field names are intentionally not guessed here; use the ones in ICICI's document.

const env = {
  merchantId: process.env.ICICI_MERCHANT_ID,
  subMerchantId: process.env.ICICI_SUB_MERCHANT_ID,
  secretKey: process.env.ICICI_SECRET_KEY,
  gatewayUrl: process.env.ICICI_GATEWAY_URL,
};

function assertConfigured() {
  const missing = Object.entries(env).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) throw new Error(`ICICI gateway is not configured. Missing: ${missing.join(", ")}`);
}

export const iciciProvider: PaymentProvider = {
  name: "icici",
  async createPayment(order, origin) {
    assertConfigured();
    const returnUrl = `${origin}/api/payment/icici/callback`;
    void order;
    void returnUrl;
    // TODO(icici): return { kind: "form", action: env.gatewayUrl!, method: "POST", fields: { ... } }
    throw new Error("ICICI createPayment is not implemented yet");
  },
  async verifyCallback(params) {
    assertConfigured();
    void params;
    // TODO(icici): verify the response, then return { orderId, status, providerRef }
    throw new Error("ICICI verifyCallback is not implemented yet");
  },
};
