import type { Metadata } from "next";
import { LegalPage, ContactLine } from "@/components/legal";
import { book, business } from "@/content/book";

export const metadata: Metadata = { title: "Refund and cancellation policy" };

// PLACEHOLDER: confirm the refund window with the owner.
export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      intro={`${book.title} is a digital book read online. This page explains how it is delivered and when you can get your money back.`}
      sections={[
        {
          h: "Delivery",
          body: (
            <>
              <p>
                Delivery is instant and online. After a successful payment your order ID is shown on screen and the book opens in the reader. Nothing
                is shipped.
              </p>
              <p>If the book does not unlock within 30 minutes of a successful payment, write to us and we will unlock it the same working day.</p>
            </>
          ),
        },
        {
          h: "Cancellations",
          body: <p>Because access is given immediately, an order cannot be cancelled once the payment is successful.</p>,
        },
        {
          h: "Refunds",
          body: (
            <>
              <p>We give a full refund if:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>you were charged more than once for the same order,</li>
                <li>you were charged but could not access the book and we could not fix it within 3 working days, or</li>
                <li>you write to us within 7 days of purchase and have read no more than the free first chapter and one more.</li>
              </ul>
              <p>Refunds are not given for change of mind after reading most of the book.</p>
            </>
          ),
        },
        {
          h: "How refunds are paid",
          body: (
            <p>
              Approved refunds go back to the original payment method through ICICI Bank within 5 to 7 working days. Your bank may take a few more
              days to show it. Access to the book ends when a refund is issued.
            </p>
          ),
        },
        {
          h: "Failed payments",
          body: (
            <p>
              If money left your account but the order shows as failed, the bank normally reverses it within 5 to 7 working days. Send us your
              order ID and we will chase it for you.
            </p>
          ),
        },
        {
          h: "Contact",
          body: (
            <p>
              Write to us at <ContactLine /> We reply within one working day ({business.hours}).
            </p>
          ),
        },
      ]}
    />
  );
}
