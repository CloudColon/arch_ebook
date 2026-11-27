import { authorBio, book } from "@/content/book";
import { SectionMark } from "./section-mark";
import { Reveal } from "./motion";

export function Author() {
  return (
    <section id="author" className="border-b border-line bg-cream">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-20 md:grid-cols-12 md:items-center md:px-8 md:py-28">
        <Reveal className="md:col-span-5">
          {/* PLACEHOLDER: author portrait, 1200x1500, black and white works best with this palette */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://picsum.photos/seed/knowledgebag-author-portrait/1200/1500?grayscale"
            alt={`Portrait of ${book.authorTitle}`}
            width={1200}
            height={1500}
            loading="lazy"
            className="aspect-[4/5] w-full bg-line object-cover outline outline-1 outline-offset-[10px] outline-gold"
          />
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <SectionMark n="IV">The author</SectionMark>
          <h2 className="display mt-5 text-5xl leading-[1.04] md:text-6xl">{book.authorTitle}</h2>
          <p className="mt-6 max-w-[48ch] text-xl leading-relaxed">{authorBio.short}</p>
          {authorBio.long.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 max-w-[60ch] leading-relaxed text-ink-2">
              {p}
            </p>
          ))}
          <ul className="mt-8 max-w-[60ch] divide-y divide-line border-y border-line">
            {authorBio.helps.map((h) => (
              <li key={h.who} className="py-3 leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">{h.who}.</span> {h.how}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-gold pt-6 sm:grid-cols-3">
            {authorBio.facts.map((f) => (
              <div key={f.label}>
                <dt className="annot">{f.label}</dt>
                <dd className="mt-1 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
