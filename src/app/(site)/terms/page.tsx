import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, ContactLine } from "@/components/legal";
import { book, business, formatINR } from "@/content/book";

export const metadata: Metadata = { title: "Terms and conditions" };

// PLACEHOLDER: have a lawyer review before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      intro={`These terms apply when you browse ${business.domain} or buy and read ${book.title} from ${business.legalName} ("we", "us"). By placing an order you agree to them.`}
      sections={[
        {
          h: "Who we are",
          body: (
            <p>
              {business.domain} is operated by <ContactLine />
            </p>
          ),
        },
        {
          h: "What you are buying",
          body: (
            <>
              <p>
                You are buying a personal, non-transferable licence to read the digital edition of {book.title} by {book.authorTitle} on{" "}
                {business.domain}. The book is read online in your browser. No physical copy is shipped and no file is downloaded.
              </p>
              <p>The licence is for your own, non-commercial reading. It does not transfer ownership of the text, images or design.</p>
            </>
          ),
        },
        {
          h: "Price and payment",
          body: (
            <>
              <p>
                The price is {formatINR(book.pricePaise)}, shown in Indian Rupees and inclusive of applicable GST. The price at the time you place
                the order is the price you pay.
              </p>
              <p>
                Payments are processed by ICICI Bank through its payment gateway. We do not see or store your card, UPI or net banking details.
                An order is confirmed only when the bank confirms the payment.
              </p>
            </>
          ),
        },
        {
          h: "Access and delivery",
          body: (
            <p>
              Access is given immediately after a successful payment, in the browser you paid from. You can unlock other devices using your order
              ID and email on the{" "}
              <Link href="/restore" className="text-ink underline underline-offset-4">
                restore access
              </Link>{" "}
              page. Details are in our{" "}
              <Link href="/refunds" className="text-ink underline underline-offset-4">
                refunds and delivery policy
              </Link>
              .
            </p>
          ),
        },
        {
          h: "Acceptable use",
          body: (
            <p>
              You agree not to copy, reproduce, record, scrape, share your access with others, resell, or publish any part of the book except
              short quotations with credit, as permitted by the Copyright Act, 1957. We may suspend access that is shared or misused.
            </p>
          ),
        },
        {
          h: "Intellectual property",
          body: (
            <p>
              The text, drawings, photographs and design of the book and this website belong to {book.authorTitle} and {business.legalName} or
              their licensors, and are protected by copyright.
            </p>
          ),
        },
        {
          h: "Availability",
          body: (
            <p>
              We work to keep the reader available at all times but cannot promise uninterrupted access. Planned maintenance will be short. If the
              service is ever discontinued, we will give paying readers reasonable notice and an alternative way to read the book.
            </p>
          ),
        },
        {
          h: "Liability",
          body: (
            <p>
              The book shares the author&apos;s professional experience for general education. It is not a substitute for advice from a licensed
              architect or engineer on your specific project. To the extent allowed by law, our total liability for any claim is limited to the
              amount you paid for the book.
            </p>
          ),
        },
        {
          h: "Changes to these terms",
          body: <p>We may update these terms. The version in force when you placed your order applies to that order.</p>,
        },
        {
          h: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Courts in {business.jurisdiction} have exclusive jurisdiction. For any complaint,
              write to us first and we will respond within 7 working days.
            </p>
          ),
        },
      ]}
    />
  );
}
