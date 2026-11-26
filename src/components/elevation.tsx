import Link from "next/link";
import { LockSimple, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { book, designedFor, promptIncludes, toc } from "@/content/book";
import { SectionMark } from "./section-mark";
import { Floor, Reveal } from "./motion";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const toRoman = (n: number) => ROMAN[n] ?? String(n);

// Table of contents drawn as a building elevation: chapter one is the ground floor you can walk into.
export function Elevation() {
  const floors = [...toc].reverse();

  return (
    <section id="inside" className="border-b border-line">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-4">
          <Reveal>
            <SectionMark n="I">The contents</SectionMark>
            <h2 className="display mt-5 text-5xl leading-[1.04] md:text-6xl">What&rsquo;s inside {book.title}?</h2>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-ink-2">
              Ten chapters, from the first brief to the final presentation. Start at the ground floor: chapter one is free to read on this page.
            </p>
            <div className="mt-10 border-t border-line pt-8">
              <h3 className="annot">Every prompt includes</h3>
              <ul className="mt-4 grid gap-2.5">
                {promptIncludes.map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[0.95rem] leading-snug">
                    <span className="mt-[0.45em] size-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 border-t border-line pt-8">
              <h3 className="annot">Designed for</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {designedFor.map((x) => (
                  <li key={x} className="border border-line bg-sheet px-3 py-1.5 text-sm">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
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
                      ground ? "bg-cream py-6 shadow-[inset_3px_0_0_var(--gold)]" : "transition-colors hover:bg-sheet"
                    }`}
                  >
                    <span className="font-display text-2xl font-semibold text-gold">{toRoman(c.n)}</span>
                    <p className={`font-display font-semibold text-accent ${ground ? "text-2xl" : "text-xl"}`}>{c.title}</p>
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
