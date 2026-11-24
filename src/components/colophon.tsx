import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { book, business } from "@/content/book";
import { SectionMark } from "./section-mark";
import { Reveal } from "./motion";

const faqs = [
  {
    q: "How do I read the book after paying?",
    a: "As soon as the payment goes through you are taken to the reader. The book opens in your browser, no app or download needed.",
  },
  {
    q: "Can I read on another phone or laptop?",
    a: "Yes. Open Restore reading access on the new device and enter your order ID and the email you paid with.",
  },
  {
    q: "Can I download a PDF?",
    a: "The book is read online only, which lets us send corrections straight into your copy.",
  },
  {
    q: "What if the payment fails?",
    a: "No money is taken for a failed payment. If your account was debited but the book did not unlock, write to us with your order ID and we will sort it the same day.",
  },
];

export function Colophon() {
  const rows = [
    ["Title", `${book.title}: ${book.subtitle}`],
    ["Author", book.authorTitle],
    ["Publisher", business.brand],
    ["Edition", book.edition],
    ["ISBN", book.isbn],
    ["Language", book.language],
    ["Editor", book.editor],
    ["Cover", book.cover],
    ["Typeset in", book.typeset],
  ];

  return (
    <section id="publication" className="border-b border-line">
      <div className="mx-auto grid max-w-[1320px] gap-16 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <Reveal className="md:col-span-7">
          <SectionMark n="VI">Publication</SectionMark>
          <h2 className="display mt-5 text-5xl leading-[1.04] md:text-6xl">Publication details</h2>
          <dl className="mt-10 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2">
            {rows.map(([k, v], i) => (
              <div key={k} className={`border-b border-r border-line px-5 py-4 ${i === 0 ? "sm:col-span-2" : ""}`}>
                <dt className="annot">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="md:col-span-5" delay={0.1}>
          <h2 className="display text-4xl">Questions</h2>
          <div className="mt-6 border-t border-gold">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus size={18} className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pb-5 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-2">
            Something else?{" "}
            <Link href="/contact" className="font-medium text-ink underline underline-offset-4">
              Contact us
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
