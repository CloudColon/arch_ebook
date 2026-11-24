import { business } from "@/content/book";

// Shared layout for policy pages: a sticky index on the left, numbered clauses on the right.
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: { h: string; body: React.ReactNode }[] }) {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 md:grid-cols-12">
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-24">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.025em]">{title}</h1>
            <p className="annot mt-3">Last updated {business.policiesUpdated}</p>
            <ol className="mt-8 hidden space-y-2 text-sm text-ink-2 md:block">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#${slug(s.h)}`} className="hover:text-ink">
                    {i + 1}. {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <div className="md:col-span-8 lg:col-span-7 lg:col-start-5">
          <p className="max-w-[62ch] text-lg leading-relaxed">{intro}</p>
          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <section key={s.h} id={slug(s.h)} className="border-t border-line pt-6">
                <h2 className="flex gap-4 text-xl font-semibold tracking-[-0.01em]">
                  <span className="annot pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  {s.h}
                </h2>
                <div className="mt-4 max-w-[62ch] space-y-4 leading-relaxed text-ink-2 md:pl-10">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactLine() {
  return (
    <>
      {business.legalName}, {business.addressLines.join(", ")}. Email{" "}
      <a href={`mailto:${business.email}`} className="text-ink underline underline-offset-4">
        {business.email}
      </a>
      , phone{" "}
      <a href={`tel:${business.phoneHref}`} className="text-ink underline underline-offset-4">
        {business.phone}
      </a>
      .
    </>
  );
}
