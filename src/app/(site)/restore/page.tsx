import type { Metadata } from "next";
import { RestoreForm } from "./restore-form";

export const metadata: Metadata = { title: "Restore reading access" };

export default function RestorePage() {
  return (
    <div className="mx-auto max-w-[560px] px-4 py-16 md:py-24">
      <h1 className="text-4xl font-semibold tracking-[-0.025em]">Restore reading access</h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Bought the book already? Enter the order ID shown after payment and the email you paid with to read on this device.
      </p>
      <RestoreForm />
    </div>
  );
}
