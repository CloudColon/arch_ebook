import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal";
import { business } from "@/content/book";

export const metadata: Metadata = { title: "Terms and conditions" };

const link = "text-ink underline underline-offset-4";
const brand = business.brand;

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated={business.termsUpdated}
      intro={`Welcome to ${brand}. By accessing our website or purchasing our digital products, you agree to the following Terms & Conditions.`}
      sections={[
        {
          h: `About ${brand}`,
          body: (
            <>
              <p>{brand} is a digital publishing platform offering e-books, prompt guides and educational resources.</p>
              <dl className="grid gap-1">
                <div>
                  <dt className="inline font-semibold text-ink">Legal Operator: </dt>
                  <dd className="inline">
                    {brand}, a brand operated by {business.legalName}
                  </dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-ink">Address: </dt>
                  <dd className="inline">{business.addressLines.join(", ")}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-ink">Email: </dt>
                  <dd className="inline">
                    <a href={`mailto:${business.email}`} className={link}>
                      {business.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-ink">Website: </dt>
                  <dd className="inline">
                    <a href={business.url} className={link}>
                      www.{business.domain}
                    </a>
                  </dd>
                </div>
              </dl>
            </>
          ),
        },
        {
          h: "Privacy & Data Security",
          body: (
            <>
              <p>
                {brand} respects your privacy. Personal information submitted through our website will be kept confidential and protected
                through reasonable security measures. It will be used for order processing, digital delivery, customer support and legal
                compliance. We do not sell personal data. Information may be shared with trusted service providers when necessary to provide our
                services or comply with law.
              </p>
              <p>
                For further details, please refer to our{" "}
                <Link href="/privacy" className={link}>
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          h: "Digital Products & Delivery",
          body: (
            <p>
              All products are digital unless otherwise specified. Products are delivered through a download link, email or customer account
              after successful payment. No physical shipping is involved. Customers are responsible for providing a valid email address and
              ensuring file compatibility.
            </p>
          ),
        },
        {
          h: "Pricing & Payments",
          body: (
            <p>
              Prices are displayed at the time of purchase. Orders are confirmed after successful payment. Payment processing is subject to the
              terms of the relevant payment provider.
            </p>
          ),
        },
        {
          h: "Refund & Cancellation",
          body: (
            <>
              <p>
                Purchases of downloadable digital products are generally final and non-refundable once delivered or made available for download.
              </p>
              <p>
                Exceptions may apply in cases of duplicate payment, failed delivery, defective or inaccessible files, incorrect product delivery or
                where required by applicable law. Please refer to our{" "}
                <Link href="/refunds" className={link}>
                  Refund & Cancellation Policy
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          h: "Copyright & Intellectual Property",
          body: (
            <>
              <p>
                All original content, e-books, prompts, graphics, layouts and branding published by {brand} are owned by or used under licence by
                the relevant rights holder.
              </p>
              <p>
                Purchasers receive a limited, non-exclusive, non-transferable licence for personal and professional reference. Reselling,
                reproducing, redistributing, publicly sharing or claiming the content as one&apos;s own is prohibited without written permission.
              </p>
            </>
          ),
        },
        {
          h: "AI-Generated Content & Copyright Disclaimer",
          body: (
            <>
              <p>Certain content in {brand} publications has been developed with the assistance of AI tools, including OpenAI&apos;s ChatGPT.</p>
              <p>
                {brand} does not guarantee that all AI-generated content independently qualifies for copyright protection, exclusive ownership or
                freedom from third-party intellectual property claims.
              </p>
              <p>
                All content remains subject to applicable laws and third-party rights. Users should verify AI-generated outputs before using or
                commercially exploiting them.
              </p>
              <p>
                {brand} may review, modify or remove material in response to legitimate intellectual property complaints, in accordance with
                applicable law. Nothing in this disclaimer excludes liability that cannot legally be excluded.
              </p>
            </>
          ),
        },
        {
          h: "Third-Party Tools & Platforms",
          body: (
            <p>
              References to third-party software, AI tools or brands are for informational purposes only. {brand} is not affiliated with or
              endorsed by such third parties unless expressly stated. Their respective terms and policies apply.
            </p>
          ),
        },
        {
          h: "Accuracy & Limitation of Liability",
          body: (
            <>
              <p>
                Our products are intended for educational and informational purposes. While reasonable efforts are made to ensure accuracy, users
                must independently verify technical, architectural, regulatory and other project-specific information before relying on it.
              </p>
              <p>
                To the extent permitted by law, {brand} shall not be liable for indirect or consequential losses arising from the use of its
                website or products.
              </p>
            </>
          ),
        },
        {
          h: "Changes to Terms",
          body: (
            <p>
              {brand} may update these Terms & Conditions from time to time. Updated terms will be published on this page with the revised date.
            </p>
          ),
        },
        {
          h: "Governing Law",
          body: (
            <p>
              These Terms & Conditions are governed by the laws of India. Subject to applicable law, disputes shall fall under the jurisdiction of
              competent courts in {business.jurisdiction}.
            </p>
          ),
        },
        {
          h: "Contact & Grievance Support",
          body: (
            <>
              <p>For queries, complaints or intellectual property concerns, contact:</p>
              <div className="grid gap-1">
                <p className="font-semibold text-ink">{brand}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${business.email}`} className={link}>
                    {business.email}
                  </a>
                </p>
                <p>Address: {business.addressLines.join(", ")}</p>
                {business.grievanceOfficer && <p>Grievance Officer: {business.grievanceOfficer}</p>}
                {business.grievancePhone && (
                  <p>
                    Contact:{" "}
                    <a href={`tel:${business.grievancePhone.replace(/\s/g, "")}`} className={link}>
                      {business.grievancePhone}
                    </a>
                  </p>
                )}
              </div>
            </>
          ),
        },
      ]}
    />
  );
}
