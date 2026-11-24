"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { formatINR } from "@/content/book";
import { getDemoOrder, settleDemoOrder, type DemoOrder } from "@/lib/demo";

export function DemoPay() {
  const router = useRouter();
  const id = useSearchParams().get("order") ?? "";
  const [order, setOrder] = useState<DemoOrder | null | undefined>(undefined);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- demo orders live in localStorage
    setOrder(getDemoOrder(id) ?? null);
  }, [id]);

  if (order === undefined) return <div className="h-80 animate-pulse bg-cream" />;
  if (order === null) return <p className="text-ink-2">This demo order is not stored in this browser.</p>;

  const pay = (paid: boolean) => {
    settleDemoOrder(order.id, paid);
    router.push(`/order?id=${encodeURIComponent(order.id)}`);
  };

  return (
    <div className="border border-ink bg-sheet">
      <div className="border-b border-ink bg-cream px-6 py-3">
        <p className="annot">Test payment gateway. No money moves.</p>
      </div>
      <div className="p-6">
        <p className="annot">Order {order.id}</p>
        <p className="mt-2 text-4xl font-semibold tracking-[-0.02em]">{formatINR(order.amountPaise)}</p>
        <p className="mt-1 text-ink-2">
          {order.name}, {order.email}
        </p>
        <div className="mt-8 grid gap-3">
          <button type="button" onClick={() => pay(true)} className="btn btn-solid w-full">
            Simulate successful payment
          </button>
          <button type="button" onClick={() => pay(false)} className="btn btn-line w-full">
            Simulate failed payment
          </button>
        </div>
      </div>
    </div>
  );
}
