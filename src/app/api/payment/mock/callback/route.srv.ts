import { NextResponse } from "next/server";
import { isMockPayments } from "@/server/payments";
import { mockProvider } from "@/server/payments/mock";
import { settlePayment } from "@/server/payments/settle";

export async function POST(req: Request) {
  if (!isMockPayments()) return new NextResponse("Not found", { status: 404 });
  const params = new URLSearchParams(await req.text());
  const result = await mockProvider.verifyCallback(params);
  const order = await settlePayment(result);
  if (!order) return new NextResponse("Order not found", { status: 404 });
  return NextResponse.redirect(new URL(`/order/${order.id}`, req.url), 303);
}
