import type { Metadata } from "next";
import { Suspense } from "react";
import { CartView } from "./cart-view";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[920px] px-4 py-16 md:px-8 md:py-24">
      <h1 className="display text-5xl leading-[1.05] md:text-5xl">Cart</h1>
      <Suspense fallback={<div className="mt-10 h-48 animate-pulse bg-cream" />}>
        <CartView />
      </Suspense>
    </div>
  );
}
