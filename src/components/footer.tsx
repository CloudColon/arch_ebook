import Link from "next/link";
import { business } from "@/content/book";
import { Wordmark } from "./nav";

const legal = [
  { href: "/terms", label: "Terms and conditions" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/refunds", label: "Refunds and delivery" },
  { href: "/contact", label: "Contact" },
  { href: "/restore", label: "Restore reading access" },
];

export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="gold-double" aria-hidden />
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink-2">
            Books by practitioners, published and sold directly at {business.domain}.
          </p>
        </div>
        <address className="not-italic text-sm leading-relaxed text-ink-2 md:col-span-4">
          <p className="font-display text-lg font-semibold text-accent">{business.legalName}</p>
          {business.addressLines.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="mt-3">
            <a href={`mailto:${business.email}`} className="underline-offset-4 hover:text-ink hover:underline">
              {business.email}
            </a>
          </p>
          <p>
            <a href={`tel:${business.phoneHref}`} className="underline-offset-4 hover:text-ink hover:underline">
              {business.phone}
            </a>
          </p>
          {business.gstin && <p className="annot mt-3">GSTIN {business.gstin}</p>}
        </address>
        <nav aria-label="Policies" className="md:col-span-3">
          <ul className="space-y-2 text-sm text-ink-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:text-ink hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-5 text-xs text-ink-3 md:flex-row md:justify-between md:px-8">
          <p>© 2026 {business.legalName}. All rights reserved.</p>
          <p>Payments processed securely by ICICI Bank.</p>
        </div>
      </div>
    </footer>
  );
}
