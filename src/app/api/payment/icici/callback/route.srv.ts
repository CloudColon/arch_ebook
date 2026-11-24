import { NextResponse } from "next/server";
import { iciciProvider } from "@/server/payments/icici";
import { settlePayment } from "@/server/payments/settle";

// Return URL to register with ICICI: https://knowledgebag.in/api/payment/icici/callback
async function handle(req: Request) {
  const url = new URL(req.url);
  const params = req.method === "POST" ? new URLSearchParams(await req.text()) : url.searchParams;
  try {
    const result = await iciciProvider.verifyCallback(params);
    const order = await settlePayment(result);
    if (!order) return NextResponse.redirect(new URL("/cart?payment=unknown", req.url), 303);
    return NextResponse.redirect(new URL(`/order/${order.id}`, req.url), 303);
  } catch (e) {
    console.error("[payment] icici callback failed", e);
    return NextResponse.redirect(new URL("/cart?payment=error", req.url), 303);
  }
}

export const GET = handle;
export const POST = handle;
