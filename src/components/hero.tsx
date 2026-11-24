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
            <p className="text-sm text-ink-2">
              A book by <span className="font-semibold text-ink">{book.authorTitle}</span>
            </p>
            <h1 className="mt-6 text-6xl font-semibold leading-[0.92] tracking-[-0.035em] [font-stretch:110%] md:text-5xl lg:text-7xl xl:text-8xl">
              {book.title}
              <span className="mt-4 block font-serif text-2xl font-normal italic leading-[1.2] tracking-normal text-ink-2 [font-stretch:100%] md:text-3xl">
                {book.subtitle}
              </span>
            </h1>
            <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-ink-2">{book.pitch}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BuyButton />
              <a href="#sample" className="btn btn-line bg-paper/70">
                Read chapter one
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative md:col-span-6 lg:col-span-5 lg:col-start-8">
          <HeroBook />
        </div>
      </div>
    </section>
  );
}
