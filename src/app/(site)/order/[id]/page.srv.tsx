import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { OrderView } from "@/components/order-view";
import { getOrder } from "@/server/orders";

export const metadata: Metadata = { title: "Your order", robots: { index: false } };

export default function OrderPage(props: { params: Promise<{ id: string }> }) {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16 md:px-8 md:py-24">
      <Suspense fallback={<div className="h-80 animate-pulse bg-cream" />}>
        <OrderStatus params={props.params} />
      </Suspense>
    </div>
  );
}

async function OrderStatus({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(decodeURIComponent(id));
  if (!order) notFound();

  return <OrderView order={order} />;
}
