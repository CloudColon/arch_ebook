import Link from "next/link";
import { CheckCircle, WarningCircle, Clock } from "@phosphor-icons/react/dist/ssr";
import { book, business, formatINR } from "@/content/book";

// Order outcome screen, shared by the real store (server order) and the static demo (browser order).
export type OrderSummary = { id: string; name: string; email: string; amountPaise: number; status: "pending" | "paid" | "failed" };

export function OrderView({ order }: { order: OrderSummary }) {
  if (order.status === "paid") {
    return (
      <div>
        <CheckCircle size={40} weight="light" />
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.025em] md:text-5xl">Thank you, {order.name.split(" ")[0]}</h1>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-2">
          {book.title} is yours. It is unlocked in this browser now.
        </p>
        <div className="mt-10 grid border border-ink bg-sheet sm:grid-cols-3">
          <Cell k="Order ID" v={order.id} mono />
          <Cell k="Paid" v={formatINR(order.amountPaise)} />
          <Cell k="Email" v={order.email} />
        </div>
        <p className="mt-4 text-sm text-ink-2">
          Keep your order ID. To read on another device, use{" "}
          <Link href="/restore" className="underline underline-offset-4">
            Restore reading access
          </Link>
          .
        </p>
        <Link href="/read/1" className="btn btn-solid mt-10">
          Start reading
        </Link>
      </div>
    );
  }

  const failed = order.status === "failed";
  return (
    <div>
      {failed ? <WarningCircle size={40} weight="light" /> : <Clock size={40} weight="light" />}
      <h1 className="mt-6 text-4xl font-semibold tracking-[-0.025em]">{failed ? "Payment did not go through" : "Waiting for the bank"}</h1>
      <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-2">
        {failed
          ? "No money was taken for this attempt. You can try again, or use a different payment method."
          : "We have not heard back from the bank yet. Refresh this page in a minute."}{" "}
        If your account was debited, write to{" "}
        <a href={`mailto:${business.email}?subject=Order ${order.id}`} className="underline underline-offset-4">
          {business.email}
        </a>{" "}
        with order ID <span className="font-mono">{order.id}</span>.
      </p>
      <Link href="/#pricing" className="btn btn-solid mt-8">
        Try again
      </Link>
    </div>
  );
}
function Cell({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="border-b border-ink p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="annot">{k}</p>
      <p className={`mt-1 break-all font-semibold ${mono ? "font-mono" : ""}`}>{v}</p>
    </div>
  );
}
