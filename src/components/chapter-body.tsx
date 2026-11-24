import type { Chapter } from "@/content/chapter-one";

// Renders a chapter. Margin notes sit beside their paragraph on wide screens and below it on phones.
export function ChapterBody({
  chapter,
  dropCap = true,
  sizeClass = "text-[1.13rem] md:text-[1.2rem]",
}: {
  chapter: Chapter;
  dropCap?: boolean;
  sizeClass?: string;
}) {
  const firstParaIndex = chapter.blocks.findIndex((b) => b.type === "p");
  return (
    <div className={`font-serif leading-[1.75] text-ink ${sizeClass}`}>
      {chapter.blocks.map((b, i) => {
        if (b.type === "h") {
          return (
            <h3 key={i} className="mb-4 mt-12 font-sans text-xl font-semibold tracking-[-0.01em] md:max-w-[34em]">
              {b.text}
            </h3>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote key={i} className="my-10 border-l-2 border-ink pl-6 text-2xl italic leading-snug md:max-w-[30em] md:text-[1.7rem]">
              “{b.text}”
            </blockquote>
          );
        }
        if (b.type === "figure") {
          return (
            <figure key={i} className="my-10 md:max-w-[34em]">
              {/* eslint-disable-next-line @next/next/no-img-element -- placeholder photo, replaced by the author's image */}
              <img src={b.src} alt={b.alt} width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full bg-cream object-cover" />
              <figcaption className="annot mt-2">{b.caption}</figcaption>
            </figure>
          );
        }
        const isFirst = i === firstParaIndex;
        return (
          <div key={i} className="grid gap-x-10 md:grid-cols-[minmax(0,34em)_1fr]">
            <p
              className={`mb-[1.15em] ${
                isFirst && dropCap
                  ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-sans first-letter:text-[3.6em] first-letter:font-semibold first-letter:leading-[0.8]"
                  : ""
              }`}
            >
              {b.text}
            </p>
            {b.note && (
              <aside className="annot mb-6 border-l border-line pl-3 leading-relaxed md:mb-0 md:mt-1.5 md:max-w-[22ch] md:self-start">{b.note}</aside>
            )}
          </div>
        );
      })}
    </div>
  );
}
