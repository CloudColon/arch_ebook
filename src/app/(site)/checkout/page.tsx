import type { Metadata } from "next";
import { CheckoutForm } from "./checkout-form";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1040px] px-4 py-16 md:px-8 md:py-24">
      <h1 className="text-4xl font-semibold tracking-[-0.025em] md:text-5xl">Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
