import { chapterOne } from "@/content/chapter-one";
import { toc } from "@/content/book";
import { ChapterBody } from "./chapter-body";
import { BuyButton } from "./cart";
import { SampleFold } from "./sample-fold";
import { SectionMark } from "./section-mark";

export function Sample() {
  const next = toc[1];
  return (
    <section id="sample" className="border-b border-line bg-sheet">
      <div className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <header className="md:ml-[8.333%]">
          <SectionMark n="II">Chapter one, free to read</SectionMark>
          <h2 className="display mt-5 text-5xl leading-[1.04] md:text-7xl">{chapterOne.title}</h2>
        </header>

        <div className="mt-12 md:ml-[8.333%]">
          <SampleFold>
            <ChapterBody chapter={chapterOne} />
          </SampleFold>
        </div>

        <div className="mt-16 grid gap-6 border-t border-gold pt-8 md:ml-[8.333%] md:max-w-[52rem] md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="annot">Next in the book</p>
            <p className="mt-1 font-display text-2xl font-semibold text-accent">
              Chapter II. {next.title}
            </p>
            <p className="mt-1 text-ink-2">{next.line}</p>
          </div>
          <BuyButton />
        </div>
      </div>
    </section>
  );
}
