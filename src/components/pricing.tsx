import { Check } from "@phosphor-icons/react/dist/ssr";
import { book, formatINR } from "@/content/book";
import { BookCover } from "./book-cover";
import { BuyButton } from "./cart";
import { SectionMark } from "./section-mark";
import { Reveal } from "./motion";

const included = [
  `All ${book.chaptersCount} chapters, ${book.pages} pages`,
  "Read in the browser on phone, tablet or laptop",
  "Your reading place is remembered",
  "Corrections to this edition at no extra cost",
  "Access restored any time with your order ID",
];

// Pricing laid out as a drawing title block: one sheet, every fact in its own cell.
export function Pricing() {
  return (
    <section id="pricing" className="border-b border-line">
      <div className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <SectionMark n="V">Pricing</SectionMark>
          <h2 className="display mt-5 text-5xl leading-[1.04] md:text-6xl">One edition, one price</h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-2">Pay once and read it for as long as you like.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid border border-accent bg-sheet outline outline-1 outline-offset-[6px] outline-gold/70 md:grid-cols-2 lg:grid-cols-12">
            <div className="flex items-center justify-center border-b border-accent bg-cream p-10 md:border-r lg:col-span-4 lg:border-b-0">
              <BookCover className="w-40 shadow-[0_24px_40px_-24px_rgb(var(--shadow)/0.6)] md:w-48" />
            </div>

            <div className="border-b border-accent p-8 md:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
              <p className="annot">Included</p>
              <ul className="mt-5 space-y-3.5">
                {included.map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check size={18} className="mt-0.5 shrink-0 text-gold" weight="bold" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid md:col-span-2 md:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
              <div className="border-b border-accent p-8 md:border-b-0 md:border-r lg:border-b lg:border-r-0">
                <p className="annot">Ebook</p>
                <p className="mt-3 flex items-baseline gap-3">
                  <span className="display text-6xl">{formatINR(book.pricePaise)}</span>
                  {book.mrpPaise && <s className="text-ink-3">{formatINR(book.mrpPaise)}</s>}
                </p>
                <p className="mt-2 text-sm text-ink-2">Inclusive of GST. Delivered instantly online.</p>
              </div>
              <div className="flex flex-col justify-end gap-3 p-8">
                <BuyButton className="w-full" withPrice={false} />
                <p className="annot text-center">Secure payment by ICICI Bank</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
