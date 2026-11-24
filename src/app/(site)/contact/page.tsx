import type { Metadata } from "next";
import Link from "next/link";
import { EnvelopeSimple, Phone, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { business } from "@/content/book";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const rows = [
    { icon: EnvelopeSimple, k: "Email", v: business.email, href: `mailto:${business.email}` },
    { icon: Phone, k: "Phone", v: business.phone, href: `tel:${business.phoneHref}` },
    { icon: Clock, k: "Hours", v: business.hours },
  ];
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl">Contact</h1>
          <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-ink-2">
            Questions about an order, access, or bulk copies for a studio or college? We reply within one working day.
          </p>
          <p className="mt-6 text-sm text-ink-2">
            Bought the book and need it on a new device?{" "}
            <Link href="/restore" className="text-ink underline underline-offset-4">
              Restore access
            </Link>
            .
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <dl className="grid border border-ink bg-sheet">
            {rows.map(({ icon: Icon, k, v, href }) => (
              <div key={k} className="flex gap-4 border-b border-ink p-6 last:border-b-0">
                <Icon size={22} className="mt-0.5 shrink-0" />
                <div>
                  <dt className="annot">{k}</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {href ? (
                      <a href={href} className="underline-offset-4 hover:underline">
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              </div>
            ))}
            <div className="flex gap-4 p-6">
              <MapPin size={22} className="mt-0.5 shrink-0" />
              <div>
                <dt className="annot">Address</dt>
                <dd className="mt-1 leading-relaxed">
                  <span className="font-semibold">{business.legalName}</span>
                  {business.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
