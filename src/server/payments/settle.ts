import "server-only";
import { grantAccess } from "../access";
import { getOrder, updateOrder } from "../orders";
import type { PaymentResult } from "./types";

// Apply a verified gateway result to the order and, when paid, unlock reading in this browser.
export async function settlePayment(result: PaymentResult) {
  const order = await getOrder(result.orderId);
  if (!order) return null;
  if (order.status !== "paid") {
    await updateOrder(order.id, {
      status: result.status,
      providerRef: result.providerRef,
      paidAt: result.status === "paid" ? new Date().toISOString() : undefined,
    });
  }
  const fresh = await getOrder(order.id);
  if (fresh?.status === "paid") await grantAccess(fresh.id);
  return fresh;
}
