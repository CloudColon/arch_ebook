import Link from "next/link";
import { LockSimple, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { book, toc } from "@/content/book";
import { Floor, Reveal } from "./motion";

// Table of contents drawn as a building elevation: chapter one is the ground floor you can walk into.
export function Elevation() {
  const floors = [...toc].reverse();
  const specs = [
    { k: "Format", v: book.format },
    { k: "Length", v: `${book.pages} pages, ${book.readingTime.toLowerCase()}` },
    { k: "Language", v: book.language },
    { k: "Edition", v: book.edition },
  ];

  return (
    <section id="inside" className="border-b border-line">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-4">
          <Reveal>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.025em] md:text-5xl">What is inside</h2>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-ink-2">
              Nine chapters, each one a part of the house. Start at the ground floor, which is free to read on this page.
            </p>
            <dl className="mt-10 grid gap-5">
              {specs.map((s) => (
                <div key={s.k}>
                  <dt className="annot">{s.k}</dt>
                  <dd className="mt-1 text-[0.95rem]">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
          {/* Parapet */}
          <div className="mx-6 h-3 border-x border-t border-ink md:mx-10" aria-hidden />
          <ol className="border-x border-ink" aria-label="Chapters">
            {floors.map((c, i) => {
              const ground = c.n === 1;
              return (
                <Floor key={c.n} index={i} total={floors.length}>
                  <div
                    className={`group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-t border-ink px-4 py-4 md:grid-cols-[4rem_1fr_auto] md:px-6 ${
                      ground ? "bg-cream py-6" : "transition-colors hover:bg-sheet"
                    }`}
                  >
                    <span className="annot">{String(c.n).padStart(2, "0")}</span>
                    <div>
                      <p className={`font-semibold tracking-[-0.01em] ${ground ? "text-lg" : ""}`}>{c.title}</p>
                      <p className="mt-0.5 text-sm text-ink-2">{c.line}</p>
                    </div>
                    {ground ? (
                      <Link href="#sample" className="btn btn-solid h-10 px-4 text-sm">
                        Read free
                        <ArrowDown size={16} />
                      </Link>
                    ) : (
                      <LockSimple size={18} className="text-ink-3" aria-label="In the full book" />
                    )}
                  </div>
                </Floor>
              );
            })}
          </ol>
          {/* Ground line with hatching */}
          <div className="h-px bg-ink" aria-hidden />
          <div
            className="h-4 bg-[repeating-linear-gradient(135deg,var(--ink-3)_0_1px,transparent_1px_8px)] opacity-60"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
