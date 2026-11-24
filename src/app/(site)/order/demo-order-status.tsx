"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OrderView } from "@/components/order-view";
import { getDemoOrder, type DemoOrder } from "@/lib/demo";

export function DemoOrderStatus() {
  const id = useSearchParams().get("id") ?? "";
  const [order, setOrder] = useState<DemoOrder | null | undefined>(undefined);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- demo orders live in localStorage
    setOrder(getDemoOrder(id) ?? null);
  }, [id]);

  if (order === undefined) return <div className="h-80 animate-pulse bg-cream" />;
  if (order === null)
    return (
      <div>
        <h1 className="display text-5xl leading-[1.05]">Order not found</h1>
        <p className="mt-4 text-ink-2">This demo order is not stored in this browser.</p>
        <Link href="/" className="btn btn-line mt-8">
          Back to the book
        </Link>
      </div>
    );
  return <OrderView order={order} />;
}
