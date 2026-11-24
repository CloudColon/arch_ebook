import { NextResponse } from "next/server";
import { grantAccess } from "@/server/access";
import { getOrder } from "@/server/orders";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const orderId = String(body.orderId ?? "").trim().toUpperCase();
  const email = String(body.email ?? "").trim().toLowerCase();
  const order = orderId ? await getOrder(orderId) : undefined;
  if (!order || order.email !== email || order.status !== "paid") {
    return NextResponse.json(
      { error: "We could not find a paid order with that ID and email. Check the order ID shown after payment, or contact us." },
      { status: 404 },
    );
  }
  await grantAccess(order.id);
  return NextResponse.json({ ok: true });
}
