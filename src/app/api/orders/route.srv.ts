import { NextResponse } from "next/server";
import { book, business } from "@/content/book";
import { createOrder } from "@/server/orders";
import { paymentProvider } from "@/server/payments";
import { siteOrigin } from "@/server/site";
import { cleanBuyer } from "@/lib/validate";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { name, email, phone, errors } = cleanBuyer(body);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });

  const provider = paymentProvider();
  // Price always comes from the server, never from the cart in the browser.
  const order = await createOrder({
    bookId: book.id,
    amountPaise: book.pricePaise,
    name,
    email,
    phone,
    provider: provider.name,
    termsAcceptedAt: new Date().toISOString(),
    termsVersion: business.termsUpdated,
  });

  try {
    const start = await provider.createPayment(order, siteOrigin(req));
    return NextResponse.json({ orderId: order.id, start });
  } catch (e) {
    console.error("[payment] createPayment failed", e);
    return NextResponse.json(
      { errors: { form: "Payments are temporarily unavailable. Please try again shortly or contact us." } },
      { status: 503 },
    );
  }
}
