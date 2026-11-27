import Link from "next/link";
import { business, footerBand } from "@/content/book";
import { Wordmark } from "./nav";

const legal = [
  { href: "/terms", label: "Terms and conditions" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/refunds", label: "Refunds and delivery" },
  { href: "/contact", label: "Contact" },
  { href: "/restore", label: "Restore reading access" },
];

function ColumnHead({ children }: { children: React.ReactNode }) {
  return <div className="flex h-12 items-center border-b border-line pb-4">{children}</div>;
}

export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="gold-double" aria-hidden />
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-16 md:grid-cols-12 md:gap-8 md:px-8">
        {/* Each column opens with a heading row of the same height, so the three columns line up. */}
        <div className="md:col-span-5">
          <ColumnHead>
            <Wordmark />
          </ColumnHead>
          <p className="mt-6 max-w-[30ch] font-display text-2xl font-semibold leading-snug text-accent lining-nums">
            {footerBand.headline}
          </p>
          <dl className="mt-6 grid max-w-[420px] grid-cols-3 border-y border-line">
            {footerBand.stats.map((s, i) => (
              <div key={s.label} className={`py-4 ${i === 0 ? "pr-4" : "border-l border-line px-4"}`}>
                <dt className="font-display text-3xl font-semibold leading-none text-accent lining-nums">{s.figure}</dt>
                <dd className="mt-2 text-sm font-semibold">{s.label}</dd>
                <dd className="text-xs leading-snug text-ink-3">{s.line}</dd>
              </div>
            ))}
          </dl>
          <p className="annot mt-5">{footerBand.tagline}</p>
        </div>

        <div className="md:col-span-4 lg:col-span-3 lg:col-start-7">
          <ColumnHead>
            <h2 className="annot">Address</h2>
          </ColumnHead>
          <address className="mt-6 not-italic text-sm leading-relaxed text-ink-2">
            <p className="font-semibold text-ink">{business.legalName}</p>
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
        </div>

        <nav aria-label="Policies" className="md:col-span-3 lg:col-start-10">
          <ColumnHead>
            <h2 className="annot">Policies</h2>
          </ColumnHead>
          <ul className="mt-6 space-y-2 text-sm leading-relaxed text-ink-2">
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
          <p>© 2026 {business.brand}. All rights reserved.</p>
          <p>Payments processed securely by ICICI Bank.</p>
        </div>
      </div>
    </footer>
  );
}
