import overview from "@/assets/book-overview.jpg";
import spreads from "@/assets/sample-spreads.jpg";
import Link from "next/link";
import { book } from "@/content/book";
import { BuyButton } from "./cart";
import { SectionMark } from "./section-mark";

// Pages from the book. Each image opens full size in a new tab, since the page text is small on a phone.
const pages = [
  { img: overview, alt: `${book.title}: chapter spreads and the professional outputs inside the book`, caption: "Chapters and outputs" },
  { img: spreads, alt: `${book.title}: cover, foreword and sample prompt pages`, caption: "Sample pages" },
];

export function Sample() {
  return (
    <section id="sample" className="border-b border-line bg-sheet">
      <div className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <header className="md:ml-[8.333%]">
          <SectionMark n="II">Look inside the book</SectionMark>
          <Link href="/ai-blueprint-sample.pdf" download prefetch={false} className="btn btn-line mt-6">
            Download free sample (PDF)
          </Link>
        </header>

        <div className="mt-12 grid gap-10 md:ml-[8.333%]">
          {pages.map((p) => (
            <figure key={p.caption}>
              <a href={p.img.src} target="_blank" rel="noopener noreferrer" className="block border border-line bg-paper">
                {/* eslint-disable-next-line @next/next/no-img-element -- a plain img works the same in the static demo build */}
                <img src={p.img.src} width={p.img.width} height={p.img.height} alt={p.alt} loading="lazy" className="block h-auto w-full" />
              </a>
              <figcaption className="annot mt-3">{p.caption}. Tap to view full size.</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 grid gap-6 border-t border-gold pt-8 md:ml-[8.333%] md:max-w-[52rem] md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="annot">The full book</p>
            <p className="mt-1 font-display text-2xl font-semibold text-accent">
              {book.chaptersCount} chapters, 100 ready-to-use prompts
            </p>
          </div>
          <BuyButton />
        </div>
      </div>
    </section>
  );
}
