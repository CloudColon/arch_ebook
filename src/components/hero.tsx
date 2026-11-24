import { book } from "@/content/book";
import { BuyButton } from "./cart";
import { Reveal } from "./motion";
import { HeroBook } from "./hero-book";

// Hero: title on the left, the book on the right. The book tilts toward the pointer and opens on click.
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-4 pb-16 pt-10 md:grid-cols-12 md:gap-8 md:px-8 md:pb-20 md:pt-16 lg:min-h-[calc(100dvh-4rem)]">
        <div className="md:col-span-6">
          <Reveal>
            <p className="mark">
              <span className="mark-rule" aria-hidden />
              <span>
                A book by <span className="text-accent">{book.authorTitle}</span>
              </span>
            </p>
            <h1 className="display mt-7 text-7xl leading-[0.95] md:text-6xl lg:text-8xl xl:text-[8.5rem]">
              {book.title}
              <span className="mt-5 block font-display text-3xl font-medium italic leading-[1.15] tracking-normal text-ink-2 md:text-4xl">
                {book.subtitle}
              </span>
            </h1>
            <div className="mt-8 h-px w-24 bg-gold" aria-hidden />
            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-ink-2">{book.pitch}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BuyButton />
              <a href="#sample" className="btn btn-line bg-paper/70">
                Read chapter one
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-16 md:col-span-6 md:mt-0 lg:col-span-5 lg:col-start-8">
          <HeroBook />
        </div>
      </div>
    </section>
  );
}
