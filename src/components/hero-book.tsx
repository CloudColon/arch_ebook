"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { book } from "@/content/book";
import { BookCover } from "./book-cover";
import { BuyPage, ChapterOpener, LEAVES } from "./inside-pages";
import { DrawLine } from "./motion";

// The hero book, standing in a palace arch drawn in gold. It tilts toward the pointer, and a click swings
// the cover open on its spine to the Chapter 01 spread. From there the visitor turns pages like a real book: click the
// right-hand page to turn it over, the left-hand page to turn it back.

// A turned leaf lies just inside the open cover; each later one sits slightly on top of the one before.
const turnedAngle = (k: number) => -136 + k * 1.2;

// A pointed palace arch in gold hairline, with an inner line, springing ticks, a finial and a plinth.
function Arch() {
  const line = { fill: "none", stroke: "var(--gold)", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg
      viewBox="0 0 200 293"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -left-12 -top-[4.5rem] h-[calc(100%+2.5rem)] w-[calc(100%+4rem)] overflow-visible"
      aria-hidden
    >
      <path d="M10 293 V120 A109 109 0 0 1 100 12.7 A109 109 0 0 1 190 120 V293 Z" fill="var(--cream)" fillOpacity="0.7" />
      <path d="M4 293 V120 A115 115 0 0 1 100 6.6 A115 115 0 0 1 196 120 V293" {...line} />
      <path d="M10 293 V120 A109 109 0 0 1 100 12.7 A109 109 0 0 1 190 120 V293" {...line} strokeOpacity="0.55" />
      <path d="M-4 120 H14 M186 120 H204" {...line} />
      <path d="M100 -6 L103.5 0 L100 6 L96.5 0 Z" fill="var(--gold)" />
      <path d="M-14 293 H214 M-8 288 H208" {...line} />
    </svg>
  );
}

export function HeroBook() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const openness = useMotionValue(0);
  const [open, setOpen] = useState(false);
  const [turned, setTurned] = useState(0); // leaves turned over to the left
  const close = () => {
    setOpen(false);
    setTurned(0);
  };

  // Closed: three-quarter view that follows the pointer. Open: almost face-on so the page reads.
  const rotateY = useSpring(useTransform([px, openness], ([p, o]: number[]) => (-24 + p * 16) * (1 - o) + (-4 + p * 4) * o), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform([py, openness], ([p, o]: number[]) => (4 - p * 10) * (1 - o) + (2 - p * 3) * o), {
    stiffness: 120,
    damping: 18,
  });
  const coverAngle = useTransform(openness, [0, 1], [0, -138]);
  const shiftX = useTransform(openness, [0, 1], ["0%", "24%"]);

  useEffect(() => {
    const c = animate(openness, open ? 1 : 0, reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 16 });
    return () => c.stop();
  }, [open, openness, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setTurned((t) => Math.min(LEAVES.length, t + 1));
      if (e.key === "ArrowLeft") setTurned((t) => Math.max(0, t - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const steer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const u = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const v = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    px.set(u * 2 - 1);
    py.set(v * 2 - 1);
  };

  return (
    <div
      className="relative mx-auto w-[min(72vw,380px)]"
      onPointerMove={steer}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      <div className="relative pb-14 pr-14">
        <Arch />
        <div style={{ perspective: 1600 }}>
          <motion.div
            className="pointer-events-none relative [transform-style:preserve-3d]"
            style={{ rotateY, rotateX, x: shiftX }}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="book-spine flex items-center justify-center"
              style={{ background: "linear-gradient(90deg, #2a1c16, #4a3328 40%, #33231b)" }}
              aria-hidden
            >
              <span className="rotate-180 whitespace-nowrap text-[15px] font-extrabold uppercase tracking-[0.08em] text-[#f5f2ea] [writing-mode:vertical-rl]">
                {book.title}
              </span>
            </span>
            <span className="book-pages" aria-hidden />

            {/* Last page, under every leaf */}
            <div
              className="pointer-events-auto relative aspect-[2/3] shadow-[18px_30px_50px_-24px_rgb(42_44_48/0.5)]"
              style={{ transform: `translateZ(-${LEAVES.length + 2}px)` }}
              inert={!open}
            >
              <BuyPage onRead={close} />
            </div>

            {/* Turnable leaves, printed on both sides. Painted last-first so the first leaf is on top. */}
            {LEAVES.map((leaf, k) => ({ ...leaf, k }))
              .reverse()
              .map(({ key, label, front, back, k }) => {
                const isTurned = k < turned;
                const canTurn = k === turned; // the right-hand page on top
                const canReturn = k === turned - 1; // the left-hand page on top
                return (
                  <motion.div
                    key={key}
                    role="button"
                    tabIndex={open && (canTurn || canReturn) ? 0 : -1}
                    aria-label={isTurned ? "Turn back a page" : `Turn to ${label}`}
                    inert={!open}
                    onClick={() => {
                      if (canTurn) setTurned(k + 1);
                      else if (canReturn) setTurned(k);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (canTurn) setTurned(k + 1);
                        else if (canReturn) setTurned(k);
                      }
                    }}
                    className={`pointer-events-auto absolute inset-0 origin-left [transform-style:preserve-3d] ${canTurn || canReturn ? "cursor-pointer" : ""}`}
                    style={{ z: isTurned ? 0 : -1 - k }}
                    animate={{ rotateY: isTurned ? turnedAngle(k) : 0 }}
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 15 }}
                  >
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      {front}
                    </div>
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      {back}
                    </div>
                  </motion.div>
                );
              })}

            {/* Cover leaf hinged on the spine */}
            <motion.div
              role="button"
              tabIndex={0}
              aria-expanded={open}
              aria-label={open ? "Close the book" : `Open ${book.title}`}
              onClick={() => (open ? close() : setOpen(true))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (open) close();
                  else setOpen(true);
                }
              }}
              className="pointer-events-auto absolute inset-0 origin-left cursor-pointer [transform-style:preserve-3d] focus-visible:outline-offset-8"
              style={{ rotateY: coverAngle }}
            >
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <BookCover />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(255,250,235,0.22)_0%,transparent_55%,rgba(42,44,48,0.10)_100%)]"
                  aria-hidden
                />
              </div>
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <ChapterOpener n={1} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className={`absolute bottom-2 left-0 right-14 transition-opacity duration-500 ${open ? "opacity-0" : ""}`}>
          <DrawLine axis="x" delay={0.6} />
          <p className="annot mt-2 text-center">{book.chaptersCount} chapters</p>
        </div>
        <div className={`absolute bottom-14 right-8 top-0 flex items-center transition-opacity duration-500 ${open ? "opacity-0" : ""}`}>
          <DrawLine axis="y" className="h-full" delay={0.75} />
          <p className="annot absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap [writing-mode:vertical-rl]">{book.pages} pages</p>
        </div>
      </div>

      <div className="annot mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 pr-14">
        {open ? (
          <>
            <span>Click the right page to turn it, the left page to go back</span>
            <button type="button" onClick={close} className="underline underline-offset-4 hover:text-ink">
              Close the book
            </button>
          </>
        ) : (
          "Click the book to open it"
        )}
      </div>
    </div>
  );
}
