import { testimonials } from "@/content/book";
import { Reveal } from "./motion";

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section id="reviews" className="border-b border-line">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <Reveal className="md:col-span-7">
          <h2 className="sr-only">What readers say</h2>
          <figure>
            <blockquote className="font-serif text-3xl leading-[1.25] tracking-[-0.01em] md:text-[2.6rem]">“{lead.quote}”</blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="font-semibold">{lead.name}</span>
              <span className="block text-ink-2">{lead.role}</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="grid content-end gap-10 md:col-span-4 md:col-start-9">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={0.1 * (i + 1)}>
              <figure className="border-t border-ink pt-6">
                <blockquote className="font-serif text-xl leading-snug">“{t.quote}”</blockquote>
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
