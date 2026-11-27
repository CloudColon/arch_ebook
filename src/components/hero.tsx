import { book, heroStats } from "@/content/book";
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
            <h1 className="display mt-7 text-5xl uppercase leading-[0.95] md:text-6xl lg:text-7xl xl:text-8xl">
              {book.title}
            </h1>
            <div className="mt-8 h-px w-24 bg-gold" aria-hidden />
            <dl className="mt-8 grid max-w-[640px] gap-6 sm:grid-cols-3 sm:gap-0">
              {heroStats.map((s, i) => (
                <div key={s.label} className={`sm:px-6 ${i === 0 ? "sm:pl-0" : "sm:border-l sm:border-line"}`}>
                  <dt>
                    <span className="display block text-5xl leading-none lining-nums lg:text-6xl">{s.figure}</span>
                    <span className="mt-3 block font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ink">{s.label}</span>
                  </dt>
                  <dd className="mt-2 text-[0.95rem] leading-snug text-ink-2">{s.line}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-9 flex flex-wrap gap-3">
              <BuyButton />
              <a href="#sample" className="btn btn-line bg-paper/70">
                Look inside
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
