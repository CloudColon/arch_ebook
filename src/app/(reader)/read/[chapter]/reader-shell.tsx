"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, List, X, TextAa, SignOut } from "@phosphor-icons/react";
import { Wordmark } from "@/components/nav";
import { DEMO, lockDemo } from "@/lib/demo";

type Theme = "white" | "ivory";
const SIZES = [0.9, 1, 1.12, 1.25];

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {}
}

export function ReaderShell({
  chapterN,
  chapterTitle,
  toc,
  reader,
  children,
}: {
  chapterN: number;
  chapterTitle: string;
  toc: { n: number; title: string }[];
  reader: string;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [size, setSize] = useState(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  // Restore preferences and the reading position for this chapter.
  useEffect(() => {
    const prefs = load<{ theme?: Theme; size?: number }>("kb_reader_prefs", {});
    if (prefs.theme && !["white", "ivory"].includes(prefs.theme)) prefs.theme = undefined;
    /* eslint-disable react-hooks/set-state-in-effect -- read saved prefs once on mount */
    if (prefs.theme) setTheme(prefs.theme);
    if (prefs.size) setSize(prefs.size);
    /* eslint-enable react-hooks/set-state-in-effect */
    save("kb_last_chapter", chapterN);
    const pos = load<Record<string, number>>("kb_positions", {})[chapterN];
    if (pos) requestAnimationFrame(() => window.scrollTo({ top: pos * (document.documentElement.scrollHeight - innerHeight) }));
  }, [chapterN]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    return scrollYProgress.on("change", (v) => {
      clearTimeout(t);
      t = setTimeout(() => save("kb_positions", { ...load<Record<string, number>>("kb_positions", {}), [chapterN]: v }), 400);
    });
  }, [scrollYProgress, chapterN]);

  function update(next: { theme?: Theme; size?: number }) {
    if (next.theme) setTheme(next.theme);
    if (next.size) setSize(next.size);
    save("kb_reader_prefs", { theme: next.theme ?? theme ?? undefined, size: next.size ?? size });
  }

  const prev = toc.find((c) => c.n === chapterN - 1);
  const next = toc.find((c) => c.n === chapterN + 1);

  return (
    <div data-reader-theme={theme ?? undefined} className="min-h-[100dvh] bg-paper text-ink" style={{ ["--rs" as string]: size }}>
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-3 px-3 md:px-6">
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => setTocOpen(true)} className="grid size-10 place-items-center hover:bg-cream" aria-label="Contents">
              <List size={20} />
            </button>
            <Link href="/" className="hidden px-2 sm:block" aria-label="Home">
              <Wordmark />
            </Link>
          </div>
          <p className="truncate text-sm text-ink-2">
            <span className="annot mr-2">Ch {chapterN}</span>
            {chapterTitle}
          </p>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPrefsOpen((v) => !v)}
              className="grid size-10 place-items-center hover:bg-cream"
              aria-label="Reading settings"
              aria-expanded={prefsOpen}
            >
              <TextAa size={20} />
            </button>
            {prefsOpen && (
              <div className="absolute right-0 top-12 w-64 border border-ink bg-sheet p-4">
                <p className="annot">Text size</p>
                <div className="mt-2 grid grid-cols-4 border border-line">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => update({ size: s })}
                      className={`h-10 font-serif ${size === s ? "bg-ink text-paper" : "hover:bg-cream"}`}
                      style={{ fontSize: `${s}rem` }}
                      aria-pressed={size === s}
                    >
                      A
                    </button>
                  ))}
                </div>
                <p className="annot mt-4">Page</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["white", "ivory"] as Theme[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update({ theme: t })}
                      data-reader-theme={t}
                      className={`h-10 border bg-paper text-sm capitalize text-ink ${theme === t ? "border-ink ring-1 ring-ink" : "border-line"}`}
                      aria-pressed={theme === t}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <motion.div className="h-[2px] origin-left bg-ink" style={{ scaleX: reduce ? 0 : scrollYProgress }} aria-hidden />
      </header>

      {tocOpen && (
        <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label="Contents">
          <div className="absolute inset-0 bg-[rgb(var(--shadow)/0.35)]" onClick={() => setTocOpen(false)} />
          <nav className="absolute inset-y-0 left-0 flex w-full max-w-[360px] flex-col border-r border-line bg-sheet">
            <div className="flex h-14 items-center justify-between border-b border-line px-5">
              <p className="font-semibold">Contents</p>
              <button type="button" onClick={() => setTocOpen(false)} className="grid size-10 place-items-center hover:bg-cream" aria-label="Close contents">
                <X size={20} />
              </button>
            </div>
            <ol className="flex-1 overflow-y-auto py-2">
              {toc.map((c) => (
                <li key={c.n}>
                  <Link
                    href={`/read/${c.n}`}
                    onClick={() => setTocOpen(false)}
                    className={`grid grid-cols-[2.5rem_1fr] px-5 py-3 ${c.n === chapterN ? "bg-cream font-semibold" : "hover:bg-cream"}`}
                    aria-current={c.n === chapterN ? "page" : undefined}
                  >
                    <span className="annot pt-0.5">{String(c.n).padStart(2, "0")}</span>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ol>
            <div className="border-t border-line p-5 text-sm text-ink-2">
              <p>Signed in as {reader}</p>
              {DEMO ? (
                <Link
                  href="/"
                  onClick={lockDemo}
                  className="mt-2 flex items-center gap-2 underline underline-offset-4 hover:text-ink"
                >
                  <SignOut size={16} /> Lock this device
                </Link>
              ) : (
                <form action="/api/access/logout" method="POST">
                  <button className="mt-2 flex items-center gap-2 underline underline-offset-4 hover:text-ink">
                    <SignOut size={16} /> Lock this device
                  </button>
                </form>
              )}
            </div>
          </nav>
        </div>
      )}

      <article className="mx-auto max-w-[1100px] px-5 pb-24 pt-14 md:px-10 md:pt-20">
        <p className="annot">Chapter {chapterN}</p>
        <h1 className="mb-12 mt-3 max-w-[18ch] display text-5xl leading-[1.05] md:text-5xl">{chapterTitle}</h1>
        {children}

        <nav className="mt-20 grid gap-4 border-t border-ink pt-8 sm:grid-cols-2" aria-label="Chapters">
          {prev ? (
            <Link href={`/read/${prev.n}`} className="group flex flex-col gap-1 border border-line p-5 hover:border-ink">
              <span className="annot flex items-center gap-2">
                <ArrowLeft size={14} /> Previous
              </span>
              <span className="font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/read/${next.n}`} className="group flex flex-col items-end gap-1 border border-line p-5 text-right hover:border-ink">
              <span className="annot flex items-center gap-2">
                Next <ArrowRight size={14} />
              </span>
              <span className="font-semibold">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
