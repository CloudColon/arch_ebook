import { testimonials } from "@/content/book";
import { SectionMark } from "./section-mark";
import { Reveal } from "./motion";

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section id="reviews" className="border-b border-line">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <Reveal className="md:col-span-7">
          <SectionMark n="III">What readers say</SectionMark>
          <h2 className="sr-only">What readers say</h2>
          <figure className="mt-8">
            <span aria-hidden className="block font-display text-8xl leading-[0.6] text-gold">“</span>
            <blockquote className="mt-4 font-display text-4xl font-medium leading-[1.18] text-accent md:text-5xl">{lead.quote}</blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="font-semibold">{lead.name}</span>
              <span className="block text-ink-2">{lead.role}</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="grid content-end gap-10 md:col-span-4 md:col-start-9">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * (i + 1)}>
              <figure className="border-t border-gold pt-6">
                <blockquote className="font-display text-2xl font-medium leading-snug text-accent">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="block text-ink-2">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
