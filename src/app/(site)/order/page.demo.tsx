import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoOrderStatus } from "./demo-order-status";

export const metadata: Metadata = { title: "Your order", robots: { index: false } };

export default function DemoOrderPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 py-16 md:px-8 md:py-24">
      <Suspense fallback={<div className="h-80 animate-pulse bg-cream" />}>
        <DemoOrderStatus />
      </Suspense>
    </div>
  );
}
