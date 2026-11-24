import { chapterOne } from "@/content/chapter-one";
import { toc } from "@/content/book";
import { ChapterBody } from "./chapter-body";
import { BuyButton } from "./cart";
import { SampleFold } from "./sample-fold";

export function Sample() {
  const next = toc[1];
  return (
    <section id="sample" className="border-b border-line bg-sheet">
      <div className="mx-auto max-w-[1320px] px-4 py-20 md:px-8 md:py-28">
        <header className="md:ml-[8.333%]">
          <p className="annot">Chapter 1, free to read</p>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-[-0.025em] md:text-6xl">{chapterOne.title}</h2>
        </header>

        <div className="mt-12 md:ml-[8.333%]">
          <SampleFold>
            <ChapterBody chapter={chapterOne} />
          </SampleFold>
        </div>

        <div className="mt-16 grid gap-6 border-t border-ink pt-8 md:ml-[8.333%] md:max-w-[52rem] md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="annot">Next in the book</p>
            <p className="mt-1 text-xl font-semibold">
              Chapter 2. {next.title}
            </p>
            <p className="mt-1 text-ink-2">{next.line}</p>
          </div>
          <BuyButton />
        </div>
      </div>
    </section>
  );
}
