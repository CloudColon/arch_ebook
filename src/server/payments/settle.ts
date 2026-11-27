import "server-only";
import { grantAccess } from "../access";
import { emailDownloadLink } from "../download";
import { getOrder, updateOrder } from "../orders";
import type { PaymentResult } from "./types";

// Apply a verified gateway result to the order and, when paid, unlock reading in this browser
// and email the 24-hour PDF link (once, on the first paid result).
export async function settlePayment(result: PaymentResult, origin: string) {
  const order = await getOrder(result.orderId);
  if (!order) return null;
  const wasPaid = order.status === "paid";
  if (!wasPaid) {
    await updateOrder(order.id, {
      status: result.status,
      providerRef: result.providerRef,
      paidAt: result.status === "paid" ? new Date().toISOString() : undefined,
    });
  }
  const fresh = await getOrder(order.id);
  if (fresh?.status === "paid") {
    await grantAccess(fresh.id);
    if (!wasPaid && (await emailDownloadLink(fresh, origin).catch((e) => (console.error("[download] email error", e), false)))) {
      await updateOrder(fresh.id, { downloadEmailedAt: new Date().toISOString() });
    }
  }
  return fresh;
}
