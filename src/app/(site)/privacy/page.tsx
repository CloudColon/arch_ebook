import type { Metadata } from "next";
import { LegalPage, ContactLine } from "@/components/legal";
import { business } from "@/content/book";

export const metadata: Metadata = { title: "Privacy policy" };

// PLACEHOLDER: have a lawyer review before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={`This policy explains what personal data ${business.legalName} collects on ${business.domain}, why, and the choices you have. We follow the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.`}
      sections={[
        {
          h: "What we collect",
          body: (
            <>
              <p>When you buy: your name, email address and mobile number, the order amount, and the payment reference returned by the bank.</p>
              <p>When you read: a secure cookie that keeps the book unlocked, and your reading preferences and position, stored in your own browser.</p>
              <p>We do not collect or store card numbers, UPI IDs, bank details or passwords. These go directly to ICICI Bank.</p>
            </>
          ),
        },
        {
          h: "Why we use it",
          body: (
            <ul className="list-disc space-y-2 pl-5">
              <li>To process your payment and give you access to the book.</li>
              <li>To confirm your order and help you restore access on another device.</li>
              <li>To answer your questions and resolve payment issues.</li>
              <li>To meet tax and accounting obligations.</li>
            </ul>
          ),
        },
        {
          h: "Who we share it with",
          body: (
            <p>
              ICICI Bank, to process the payment, and our hosting and email providers, who process data only on our instructions. We do not sell
              or rent your data, and we do not share it for advertising.
            </p>
          ),
        },
        {
          h: "Cookies",
          body: (
            <p>
              We use one essential cookie to keep your purchased book unlocked. We do not use advertising or tracking cookies. Your cart and
              reading settings are kept in your browser&apos;s local storage and never leave your device.
            </p>
          ),
        },
        {
          h: "How long we keep it",
          body: <p>Order records are kept for as long as you have access to the book and for 8 years after, as required for tax records.</p>,
        },
        {
          h: "Your rights",
          body: (
            <p>
              You can ask to see, correct or delete your personal data, or withdraw consent, by writing to us. Deleting your order record will end
              your access to the book. We will respond within 30 days.
            </p>
          ),
        },
        {
          h: "Security",
          body: <p>All pages are served over HTTPS. Access cookies are signed and cannot be read by scripts. Order data is kept on secured servers.</p>,
        },
        {
          h: "Grievance officer",
          body: (
            <p>
              For privacy questions or complaints, contact our grievance officer at <ContactLine />
            </p>
          ),
        },
      ]}
    />
  );
}
