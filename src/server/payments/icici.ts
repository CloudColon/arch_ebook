import "server-only";
import crypto from "node:crypto";
import { getOrder, updateOrder } from "../orders";
import type { PaymentProvider } from "./types";

// ICICI Bank payment gateway (Merchant Solution "Sale API"), following ICICI's NodeJS merchant kit (icici-dev 2.1.7)
// and API Specification v1.4, reimplemented with node:crypto so no third-party package handles the keys.
//
// Request:  sort the fields by name, SecureHash = sha256(secret + every value in that order), then
//           AES-256-ECB encrypt "SecureHash||<hash>::Key||value::..." (empty values left out) with the encryption key.
//           The browser POSTs EncData, MerchantId, BankId, TerminalId and Version to the gateway.
// Response: the gateway sends the browser back to ReturnURL with ?paymentResponse=<JSON with EncData>. Decrypt it,
//           recompute the hash over the non-empty fields and compare. ResponseCode "00" means paid.
//
// Env (see .env.local). UAT values come with ICICI's kit; production values arrive at onboarding.
//   ICICI_MERCHANT_ID, ICICI_TERMINAL_ID, ICICI_BANK_ID, ICICI_MCC, ICICI_PASSCODE,
//   ICICI_ENC_KEY, ICICI_SECURE_SECRET, ICICI_GATEWAY_URL

const env = () => ({
  merchantId: process.env.ICICI_MERCHANT_ID ?? "",
  terminalId: process.env.ICICI_TERMINAL_ID ?? "",
  bankId: process.env.ICICI_BANK_ID ?? "",
  mcc: process.env.ICICI_MCC ?? "",
  passCode: process.env.ICICI_PASSCODE ?? "",
  encKey: process.env.ICICI_ENC_KEY ?? "",
  secret: process.env.ICICI_SECURE_SECRET ?? "",
  gatewayUrl: process.env.ICICI_GATEWAY_URL ?? "",
});

function config() {
  const c = env();
  const missing = Object.entries(c).filter(([, v]) => !v).map(([k]) => k);
  if (missing.length) throw new Error(`ICICI gateway is not configured. Missing: ${missing.join(", ")}`);
  if (Buffer.byteLength(c.encKey) !== 32) throw new Error("ICICI_ENC_KEY must be 32 characters");
  return c;
}

const sorted = (o: Record<string, string>) => Object.keys(o).sort().map((k) => [k, o[k]] as const);

function secureHash(fields: Record<string, string>, secret: string) {
  return crypto.createHash("sha256").update(secret + sorted(fields).map(([, v]) => v).join(""), "utf8").digest("hex");
}

function encrypt(text: string, key: string) {
  const c = crypto.createCipheriv("aes-256-ecb", Buffer.from(key, "utf8"), null);
  return Buffer.concat([c.update(text, "utf8"), c.final()]).toString("base64");
}

function decrypt(b64: string, key: string) {
  const d = crypto.createDecipheriv("aes-256-ecb", Buffer.from(key, "utf8"), null);
  return Buffer.concat([d.update(Buffer.from(b64, "base64")), d.final()]).toString("utf8");
}

// ICICI wants a numeric merchant reference (1-40 digits), unique per payment attempt.
function newTxnRef() {
  return `${Date.now()}${crypto.randomInt(100000, 1000000)}`;
}

export const iciciProvider: PaymentProvider = {
  name: "icici",
  async createPayment(order, origin) {
    const c = config();
    const txnRef = newTxnRef();
    await updateOrder(order.id, { providerTxnRef: txnRef });

    const fields: Record<string, string> = {
      Version: "1",
      PassCode: c.passCode,
      BankId: c.bankId,
      MerchantId: c.merchantId,
      MCC: c.mcc,
      TerminalId: c.terminalId,
      ReturnURL: `${origin}/api/payment/icici/callback`,
      Amount: String(order.amountPaise),
      TxnRefNo: txnRef,
      Currency: "356",
      TxnType: "Pay",
      OrderInfo: order.id.replace(/[^A-Za-z0-9]/g, ""),
      Email: order.email,
      Phone: order.phone.replace(/\D/g, "").slice(-10),
      UDF01: order.id, // comes back in the response, so the callback finds the order
    };
    const hash = secureHash(fields, c.secret);
    const plain = [`SecureHash||${hash}`, ...sorted(fields).filter(([, v]) => v).map(([k, v]) => `${k}||${v}`)].join("::");

    return {
      kind: "form",
      action: c.gatewayUrl,
      method: "POST",
      fields: { EncData: encrypt(plain, c.encKey), MerchantId: c.merchantId, BankId: c.bankId, TerminalId: c.terminalId, Version: "1" },
    };
  },

  async verifyCallback(params) {
    const c = config();
    const raw = params.get("paymentResponse");
    if (!raw) throw new Error("ICICI callback without paymentResponse");
    const outer = JSON.parse(raw) as { EncData?: string; MerchantId?: string };
    if (!outer.EncData || outer.MerchantId !== c.merchantId) throw new Error("ICICI callback for another merchant");

    const data: Record<string, string> = {};
    for (const pair of decrypt(outer.EncData.replace(/ /g, "+"), c.encKey).split("::")) {
      const [k, v = ""] = pair.split("||");
      data[k] = decodeURIComponent(v);
    }
    const received = data.SecureHash ?? "";
    delete data.SecureHash;
    const nonEmpty = Object.fromEntries(Object.entries(data).filter(([, v]) => v));
    const expected = secureHash(nonEmpty, c.secret).toUpperCase();
    if (received.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected))) {
      throw new Error("ICICI response hash mismatch");
    }

    // The hash proves ICICI sent it; these checks prove it is for this order and amount.
    const order = await getOrder(data.UDF01 ?? "");
    if (!order) throw new Error(`ICICI response for unknown order ${data.UDF01}`);
    if (data.TxnRefNo !== order.providerTxnRef) throw new Error(`ICICI TxnRefNo ${data.TxnRefNo} does not match order ${order.id}`);
    const paid = data.ResponseCode === "00" && data.Amount === String(order.amountPaise);
    if (!paid) console.warn("[payment] icici not paid", order.id, data.ResponseCode, data.Message);

    return { orderId: order.id, status: paid ? "paid" : "failed", providerRef: data.RetRefNo || data.TxnRefNo };
  },
};
