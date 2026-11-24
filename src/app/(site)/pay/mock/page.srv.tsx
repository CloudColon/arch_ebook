import { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatINR } from "@/content/book";
import { getOrder } from "@/server/orders";
import { isMockPayments } from "@/server/payments";

// Stand-in for the bank's payment page while ICICI is being set up. Not reachable when PAYMENT_PROVIDER=icici.
export default function MockPayPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <div className="mx-auto max-w-[520px] px-4 py-16 md:py-24">
      <Suspense fallback={<div className="h-80 animate-pulse bg-cream" />}>
        <MockPay searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

async function MockPay({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!isMockPayments()) notFound();
  const id = String((await searchParams).order ?? "");
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <div className="border border-ink bg-sheet">
      <div className="border-b border-ink bg-cream px-6 py-3">
        <p className="annot">Test payment gateway. No money moves.</p>
      </div>
      <div className="p-6">
        <p className="annot">Order {order.id}</p>
        <p className="mt-2 display text-5xl">{formatINR(order.amountPaise)}</p>
        <p className="mt-1 text-ink-2">
          {order.name}, {order.email}
        </p>
        <form action="/api/payment/mock/callback" method="POST" className="mt-8 grid gap-3">
          <input type="hidden" name="order" value={order.id} />
          <button name="outcome" value="success" className="btn btn-solid w-full">
            Simulate successful payment
          </button>
          <button name="outcome" value="failure" className="btn btn-line w-full">
            Simulate failed payment
          </button>
        </form>
      </div>
    </div>
  );
}
