import { Suspense } from "react";
import { DemoPay } from "./demo-pay";

// Static demo stand-in for the bank's payment page.
export default function DemoPayPage() {
  return (
    <div className="mx-auto max-w-[520px] px-4 py-16 md:py-24">
      <Suspense fallback={<div className="h-80 animate-pulse bg-cream" />}>
        <DemoPay />
      </Suspense>
    </div>
  );
}
