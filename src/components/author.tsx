import { authorBio, book } from "@/content/book";
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
            className="aspect-[4/5] w-full bg-line object-cover"
          />
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.025em] md:text-5xl">About the author</h2>
          <p className="mt-6 max-w-[48ch] text-xl leading-relaxed">{authorBio.short}</p>
          {authorBio.long.map((p) => (
            <p key={p.slice(0, 20)} className="mt-4 max-w-[60ch] leading-relaxed text-ink-2">
              {p}
            </p>
          ))}
          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-ink pt-6 sm:grid-cols-3">
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
