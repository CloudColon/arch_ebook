import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, ContactLine } from "@/components/legal";
import { business } from "@/content/book";

export const metadata: Metadata = { title: "Payment policy" };

const link = "text-ink underline underline-offset-4";

// PLACEHOLDER: confirm with the owner. Restates what the terms and refund policy already say about payments.
export default function PaymentPolicyPage() {
  return (
    <LegalPage
      title="Payment policy"
      updated={business.termsUpdated}
      intro={`This page explains how payments for ${business.brand} products are taken and confirmed. It forms part of our Terms & Conditions.`}
      sections={[
        {
          h: "Prices",
          body: (
            <p>
              Prices are shown in Indian rupees at the time of purchase and are inclusive of GST. The price on the checkout page is the amount you
              pay.
            </p>
          ),
        },
        {
          h: "How payments are processed",
          body: (
            <>
              <p>
                Payments are processed securely by ICICI Bank. We do not collect or store card numbers, UPI IDs, bank details or passwords. These
                go directly to ICICI Bank.
              </p>
              <p>Payment processing is subject to the terms of the relevant payment provider.</p>
            </>
          ),
        },
        {
          h: "Order confirmation",
          body: (
            <p>
              Your order is confirmed only after a successful payment. Your order ID is then shown on screen and the product is made available to
              you. Note the order ID down: with it and your email you can restore access on another device.
            </p>
          ),
        },
        {
          h: "Failed or duplicate payments",
          body: (
            <>
              <p>
                If money left your account but the order shows as failed, the bank normally reverses it within 5 to 7 working days. Send us your
                order ID and we will chase it for you.
              </p>
              <p>
                If you were charged more than once for the same order, the extra payment is refunded in full. See our{" "}
                <Link href="/refunds" className={link}>
                  Refund & Cancellation Policy
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          h: "Refunds",
          body: (
            <p>
              Approved refunds go back to the original payment method through ICICI Bank within 5 to 7 working days. When refunds are given is set
              out in our{" "}
              <Link href="/refunds" className={link}>
                Refund & Cancellation Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className={link}>
                Terms & Conditions
              </Link>
              .
            </p>
          ),
        },
        {
          h: "Contact",
          body: (
            <p>
              For payment questions, write to us at <ContactLine /> We reply within one working day ({business.hours}).
            </p>
          ),
        },
      ]}
    />
  );
}
