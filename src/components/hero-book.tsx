"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { X } from "@phosphor-icons/react";
import { book, business } from "@/content/book";
import { chapterOne } from "@/content/chapter-one";
import { BookCover } from "./book-cover";
import { useCart } from "./cart";
import { DrawLine } from "./motion";

// The hero book. It tilts toward the pointer, and a click swings the cover open on its spine
// to the first page of chapter one.

// The first page of chapter one, revealed under the cover.
function FirstPage({ onClose }: { onClose: () => void }) {
  const { add } = useCart();
  const opening = chapterOne.blocks.find((b) => b.type === "p");
  const text = opening && "text" in opening ? opening.text.split(". ").slice(0, 3).join(". ") + "." : "";
  return (
    <div className="@container absolute inset-0 bg-[#fbfaf6] text-[#2a2c30] shadow-[inset_10px_0_18px_-12px_rgb(42_44_48/0.35)]">
    <div className="flex h-full flex-col p-[8cqw]">
      <div className="flex items-start justify-between">
        <p className="font-mono text-[3cqw] uppercase tracking-[0.06em] text-[#6c7077]">Chapter 1</p>
        <button
          type="button"
          onClick={onClose}
          className="-mr-[3cqw] -mt-[3cqw] grid size-[9cqw] place-items-center hover:bg-[#ece8de]"
          aria-label="Close the book"
        >
          <X className="size-[4.5cqw]" />
        </button>
      </div>
      <p className="mt-[3cqw] text-[8.2cqw] font-semibold leading-[1.02] tracking-[-0.02em]">{chapterOne.title}</p>
      <p className="mt-[5cqw] font-serif text-[4.3cqw] leading-[1.6] first-letter:float-left first-letter:mr-[1.2cqw] first-letter:font-sans first-letter:text-[12cqw] first-letter:font-semibold first-letter:leading-[0.82]">
        {text}
      </p>
      <div className="mt-auto grid gap-[2.4cqw]">
        <Link
          href="/#sample"
          onClick={onClose}
          className="flex h-[11cqw] items-center justify-center bg-[#3b3f45] text-[4cqw] font-semibold text-[#f6f5f1] hover:bg-[#2a2c30]"
        >
          Read chapter one
        </Link>
        <button
          type="button"
          onClick={() => add()}
          className="flex h-[11cqw] items-center justify-center border border-[#2a2c30] text-[4cqw] font-semibold hover:bg-[#2a2c30] hover:text-[#f6f5f1]"
        >
          Buy the ebook ₹{book.pricePaise / 100}
        </button>
        <p className="text-center font-mono text-[2.6cqw] text-[#6c7077]">{business.brand}</p>
      </div>
    </div>
    </div>
  );
}

// Inside of the front cover: endpaper with the site grid and an ownership line.
function Endpaper() {
  return (
    <div
      className="@container absolute inset-0 text-[#2a2c30]"
      style={{
        backgroundColor: "#e9e5db",
        backgroundImage:
          "linear-gradient(rgba(42,44,48,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(42,44,48,0.08) 1px, transparent 1px)",
        backgroundSize: "6cqw 6cqw",
      }}
    >
      <div className="flex h-full flex-col justify-end p-[9cqw]">
        <p className="font-mono text-[3cqw] text-[#5b5f66]">This copy belongs to</p>
        <div className="mt-[8cqw] border-b border-[#2a2c30]/50" />
        <p className="mt-[8cqw] font-mono text-[2.6cqw] text-[#5b5f66]">Click to close</p>
      </div>
    </div>
  );
}

export function HeroBook() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const openness = useMotionValue(0);
  const [open, setOpen] = useState(false);

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
  const shiftX = useTransform(openness, [0, 1], ["0%", "18%"]);

  useEffect(() => {
    const c = animate(openness, open ? 1 : 0, reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 16 });
    return () => c.stop();
  }, [open, openness, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
        <div style={{ perspective: 1600 }}>
          <motion.div
            className="relative [transform-style:preserve-3d]"
            style={{ rotateY, rotateX, x: shiftX }}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="book-spine" aria-hidden />
            <span className="book-pages" aria-hidden />

            {/* First page, under the cover */}
            <div className="relative aspect-[2/3] shadow-[18px_30px_50px_-24px_rgb(42_44_48/0.5)]" inert={!open}>
              <FirstPage onClose={() => setOpen(false)} />
            </div>

            {/* Cover leaf hinged on the spine */}
            <motion.div
              role="button"
              tabIndex={0}
              aria-expanded={open}
              aria-label={open ? "Close the book" : `Open ${book.title}`}
              onClick={() => setOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen((v) => !v);
                }
              }}
              className="absolute inset-0 origin-left cursor-pointer [transform-style:preserve-3d] focus-visible:outline-offset-8"
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
                <Endpaper />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-2 left-0 right-14">
          <DrawLine axis="x" delay={0.6} />
          <p className="annot mt-2 text-center">{book.chaptersCount} chapters</p>
        </div>
        <div className="absolute bottom-14 right-8 top-0 flex items-center">
          <DrawLine axis="y" className="h-full" delay={0.75} />
          <p className="annot absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap [writing-mode:vertical-rl]">{book.pages} pages</p>
        </div>
      </div>

      <p className="annot mt-1 pr-14">{open ? "Esc or click the cover to close" : "Click the book to open it"}</p>
    </div>
  );
}
